import React from 'react';
import { Container, Icon, View, Text, Content} from 'native-base';
import {StyleSheet, TouchableOpacity, Alert, Platform} from 'react-native';
import { AnswerState } from './AnswerButton';
import QuizStore from '../../src/store/quizStore';
import QuizScreenHeader from './QuizScreenHeader';
import { widthPercentageToDP, heightPercentageToDP } from '../../src/helper/ratioHelper';
import QuizScreenTimer from './QuizScreenTimer';
import sharedQuizService from '../../src/services/QuizService';
import QuestionComponent from './QuestionComponent';


export interface QuizScreenContainerProps{ 
    quizStore: QuizStore,
    onQuizOver?: (quizStore: QuizStore) => void
}

interface States{
    answerState: AnswerState[],
    isWaiting: boolean,
    isAnimation: boolean,
    isLoading: boolean,
    isNextQuestion: boolean
    isOver: boolean,
    flashCorrect: boolean,
    flashIncorrect: boolean
}

export default class QuizScreenContainer extends React.Component<QuizScreenContainerProps, States>{
    constructor(props: QuizScreenContainerProps){
        super(props);
        this.state = {
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isLoading: true,
            isNextQuestion: true,
            isOver: false,
            flashCorrect: false,
            flashIncorrect: false
        };
    }

    async componentDidMount(){
        await this.props.quizStore.init();
        this.setState({
            isLoading: false,
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isOver: false});
    }

    flipAnimation = () => {
        this.setState({isAnimation: !this.state.isAnimation});
        
    }

    componentWillUnmount(){
        this.setState({
            isLoading: false,
            answerState: [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal],
            isWaiting: false,
            isAnimation: false,
            isOver: false});
    }


    nextQuestion = async () => {
        this.flipAnimation();
        const {quizStore} = this.props;
        // Wait a bit for disapperance animation
        await this.setState({
            isWaiting: false,
            isNextQuestion: true
        });
        await quizStore.nextQuestion();
        await this.setState({
            answerState: quizStore.getCurrentAnswerState()
        })
    }

    prevQuestion = async () => {
        this.flipAnimation();
        const {quizStore} = this.props;
        //Wait a bit for disapperance animation
        await this.setState({
            isWaiting: false,
            isNextQuestion: false
        });
        await quizStore.prevQuestion();
        await this.setState({
            answerState: quizStore.getCurrentAnswerState()
        })
    }

    chooseAnswer = (idAnswer: number) => {
        //Avoid click on mutlyply answer
        if(this.state.isWaiting || this.props.quizStore.isCurrentQuestionAnswered()){
            return;
        }
        this.setState({isWaiting: true});
        this.props.quizStore.answerQuestion(idAnswer);
        this.setState({
            answerState: this.props.quizStore.getCurrentAnswerState()
        })
        if(this.props.quizStore.isOver()){
            setTimeout(() => {this.quizOver();}, 500);
        } else {
            setTimeout(() => {this.nextQuestion();}, 500);
        }
        
    }

    finishQuiz = () => {
        Alert.alert(
            'Are you sure to finish ?',
            'You can not go back',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Finish', onPress: () => this.quizOver()},
            ],
            { cancelable: true }
          )
    }

    saveQuizResult = () => {
        const {quizStore} = this.props;
        // MyProfile.updateTestData(
        //     sharedQuizService.getMode(),
        //     quizStore.getTotalQuestionNumber(),
        //     quizStore.state.currentQuestion,
        //     quizStore.state.uncorrectedAnswer,
        //     Math.ceil(quizStore.state.doingTimer / 60000));
    }

    quizOver = () => {
        this.saveQuizResult();
        // const {quizStore, navigation} = this.props;
        // const onQuizOver: (quizStore : QuizStore) => void = navigation.getParam('rightButtonClick', this.props.onQuizOver);
        // if(onQuizOver){
        //     onQuizOver(quizStore);
        //     return;
        // }
        // const tryAgainButton = async function (): Promise<void> {
        //     await sharedQuizService.initLastTest();
        //     navigation.navigate('Questions');
        // }
        // const homeFunc = async function(): Promise<void> {
        //     navigation.navigate('Home');
        // }
        // navigation.navigate('Results', {totalAnswer: quizStore.getTotalQuestionNumber(),
        //     correctedAnswer: quizStore.state.correctedAnswer,
        //     uncorrectedAnswer: quizStore.state.uncorrectedAnswer,
        //     leftButtonText: "LET DO AGAIN",
        //     leftButtonClick: tryAgainButton,
        //     rightButtonText: "Go Home",
        //     rightButtonClick: homeFunc})
    }

    renderAudio () {
        const question = this.props.quizStore.getCurrentQuestionInfo();
        if(question.audioAsset){
            return (
                undefined
            );
        }
        return undefined;
    }

    renderQuestion () {
        const {quizStore} = this.props;
        const question = quizStore.getCurrentQuestionInfo();
        return (
            <QuestionComponent
                    question={question} 
                         answerState={this.state.answerState} 
                         onChooseAnswer={(index) => this.chooseAnswer(index)}/>
        );
    }

    renderAnswerQuestion () {
        return (
            <View style={{flex: 1}}>
                {this.renderQuestion()}
            </View>
        );
    }

    render() {
        if (this.state.isLoading || this.state.isOver){
            return <Text>Loading</Text>;
        };

        const {quizStore} = this.props;
        const question = quizStore.getCurrentQuestionInfo();
        return (
            <Container>
                <View style={styles.container}>
                    <QuizScreenHeader
                            title={question.type}
                            correctAnswer={quizStore.state.correctedAnswer}
                            uncorrectedAnswer={quizStore.state.uncorrectedAnswer}
                            onFinishButton={this.finishQuiz}
                            flashCorrect={this.state.flashCorrect}
                            flashIncorrect={this.state.flashIncorrect}
                    />
                    <Content scrollEnabled={false}>
                        <QuizScreenTimer interval={500} 
                        totalTime={5 * 60 * 1000} 
                        onTick = {(timer) => {quizStore.setTimer(timer)}}
                        onOver = {() => {this.quizOver()}}/>
                        <View style={styles.navigationView}>
                            <TouchableOpacity onPress={() => {this.prevQuestion();}}>
                                {/* <Icon name='arrow-back' style={{color: '#019AE8'}} android="md-arrow-back" ios="ios-arrow-back" />  */}
                            </TouchableOpacity>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity>
                                    <Text style={{fontSize: 18,color: '#019AE8'}}>{quizStore.getCurrentQuestionNumber() + 1}</Text>
                                </TouchableOpacity>
                                <Text style={{fontSize: 18}}>/{quizStore.getTotalQuestionNumber()}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {this.nextQuestion();}} >
                                {/* <Icon name='arrow-forward' style={{color: '#019AE8'}} android="md-arrow-forward" ios="ios-arrow-forward" />  */}
                            </TouchableOpacity>
                        </View>
                            {this.renderAnswerQuestion()}
                    </Content>
                    {this.renderAudio()}   
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
    timer: {
        marginTop: heightPercentageToDP(0),
    },
    navigationView: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginLeft: widthPercentageToDP(8),
        marginRight: widthPercentageToDP(8),
        marginTop: heightPercentageToDP(1)
    }
});