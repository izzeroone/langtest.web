import * as React from 'react';
import {Button} from 'antd';
import IQuestion, { QuestionType } from '../../entity/Question';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import { AnswerState } from '../../entity/AnswerState';
import { StyleSheet, Platform } from 'react-native';
import { View } from 'native-base';

export interface QuestionComponentProps{
    question: IQuestion,
    answerState?: AnswerState[],
    onChooseAnswer?: (index: number) => void,
}

export default class QuestionComponent extends React.Component<QuestionComponentProps>{
    constructor(prop: QuestionComponentProps){
        super(prop);
    }
    
    render() {
        const {question} = this.props;  
        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                    <p>{question.question}</p>
                    <Button type="ghost" title={question.answer[0]}></Button>
                    <Button type="ghost" title={question.answer[1]}></Button>
                    <Button type="ghost" title={question.answer[2]}></Button>
                    <Button type="ghost" title={question.answer[3]}></Button>
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