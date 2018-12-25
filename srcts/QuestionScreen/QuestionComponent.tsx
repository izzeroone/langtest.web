import * as React from 'react';
import {View, Text, Card} from 'native-base';
import {StyleSheet, ViewStyle, Image, ImageStyle, Platform, Animated} from "react-native";
import IQuestion, { QuestionType } from '../../entity/Question';
import AnswerButton, { AnswerState } from './AnswerButton';
import { widthPercentageToDP, heightPercentageToDP } from '../../src/helper/ratioHelper';

export interface QuestionComponentProps{
    question: IQuestion,
    answerState: AnswerState[],
    onChooseAnswer: (index: number) => void,
}

export default class QuestionComponent extends React.Component<QuestionComponentProps>{
    constructor(prop: QuestionComponentProps){
        super(prop);

        this.state = {
            isImageZoom: false,
            imageHeight: new Animated.Value(heightPercentageToDP(25))
        }
    }
    
    
   

    renderAnswerButton(index: number, value: string, half: boolean) {
        const {onChooseAnswer, answerState, question} = this.props;

        return (
            <View key={index} 
                style={styles.answerButton as ViewStyle}>
                <AnswerButton answerState={answerState[index]} 
                    onPress = {() => onChooseAnswer(index)}
                    text={value}/>
            </View>)
    }

    shouldRenderTwoRow(): boolean {
        let should: boolean = true;
        if(this.props.question.type === QuestionType.part2 || this.props.question.type === QuestionType.part5 ){
            return false;
        }
        this.props.question.answer.forEach((a) => {
            if(a.length > 10){
                should = false;
            }
        })

        return should;
    }

    renderQuestion(){
        const {question} = this.props; 
        switch(question.type){
            case QuestionType.part3: case QuestionType.part4: case QuestionType.part2:
            return(
                <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                    {question.id.slice(question.id.length - 3,question.id.length)}. {question.question}
                </Text>
            );
            case QuestionType.part6: 
                return(
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        Fill in the {question.id.slice(question.id.length - 3,question.id.length)} blank
                    </Text>
                );
            default:
                    return(
                    <Text adjustsFontSizeToFit minimumFontScale={.5} style={styles.questionText}>	
                        {question.question}
                    </Text>
                    )
        }
    }
    renderAnswer(){
        const {question} = this.props; 
        switch(question.type){
            case QuestionType.part1:
            return(
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(0, question.answer[0], true)}
                        {this.renderAnswerButton(1, question.answer[1], true)}
                    </View>
                    <View style={styles.answerContainerTwoRow}>
                        {this.renderAnswerButton(2, question.answer[2], true)}
                        {this.renderAnswerButton(3, question.answer[3], true)}
                    </View>
                </View>
            );
            case QuestionType.part2:
            return(
                <View style={styles.answerContainer}>
                    {this.renderAnswerButton(0, question.answer[0], false)}
                    {this.renderAnswerButton(1, question.answer[1], false)}
                    {this.renderAnswerButton(2, question.answer[2], false)}
                </View>);
            default:
                if(this.shouldRenderTwoRow()){
                    return(
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
                            <View style={styles.answerContainerTwoRow}>
                                {this.renderAnswerButton(0, question.answer[0], true)}
                                {this.renderAnswerButton(1, question.answer[1], true)}
                            </View>
                            <View style={styles.answerContainerTwoRow}>
                                {this.renderAnswerButton(2, question.answer[2], true)}
                                {this.renderAnswerButton(3, question.answer[3], true)}
                            </View>
                        </View>
                    );
                } else {
                    return(
                        <View style={styles.answerContainer}>
                            {this.renderAnswerButton(0, question.answer[0], false)}
                            {this.renderAnswerButton(1, question.answer[1], false)}
                            {this.renderAnswerButton(2, question.answer[2], false)}
                            {this.renderAnswerButton(3, question.answer[3], false)}
                        </View>);
                }
        }
    }
    render() {
        const {question} = this.props;  
        return (
            <View style={[styles.container]}>
                {question.imageAsset && 
                <Card style={{margin: 0}}>
                {/* TODO: Render zoom icon for the first time */}

                            <Animated.Image style={{width: widthPercentageToDP(95)}}
                                    source={question.imageAsset}
                                    resizeMode='contain'/>

                </Card>
                }
                <Text adjustsFontSizeToFit minimumFontScale={.3} style={styles.questionText}>	
                        {this.renderQuestion()}
                </Text>
                {this.renderAnswer()}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    imageView: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        flex: 1,
        marginTop: heightPercentageToDP(2),
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    questionText: {
        color: '#4F4F4F',
        fontSize: Platform.OS == 'ios' ? 16 : 16,
        marginLeft: widthPercentageToDP(10),
        marginRight: widthPercentageToDP(10),
        justifyContent: 'center',
        alignItems: 'stretch',
        textAlign: 'left',
        textAlignVertical: 'center',
        maxWidth: widthPercentageToDP(80),
        maxHeight: heightPercentageToDP(15),
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(2),
    },
    answerContainer: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerContainerTwoRow: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
    },
    answerButton: {
        flex: 2,
        marginBottom: heightPercentageToDP(1),
        width: widthPercentageToDP(84),
        maxWidth: widthPercentageToDP(84),
        height: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        maxHeight: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        shadowRadius: 0
    },
    answerButtonHalf: {
        flex: 1,
        marginBottom: heightPercentageToDP(1),
        width: widthPercentageToDP(46),
        height: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        maxHeight: Platform.OS == 'ios' ? heightPercentageToDP(9.3) : heightPercentageToDP(9.3), 
        shadowRadius: 0
    }
});