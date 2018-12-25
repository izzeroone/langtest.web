import {Container} from 'unstated';
import IQuestion from '../entity/Question';
import { AnswerState } from '../../srcts/QuestionScreen/AnswerButton';
import IQuizService from '../services/IQuizService';
import sharedQuizService from '../services/QuizService';

export default class QuizStore extends Container{
    _quizService = null;
    constructor(quizService){
        super();

        if(quizService){
            this._quizService = quizService;
        } else {
            this._quizService = sharedQuizService;
        }

        this.state = {
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer: new Map(),
            currentQuestion: 0,
            doingTimer: 0
        }

    }

    async init() {
        this.reset();
        await this.setState({
            questionList: this._quizService.getQuestion()
        });
    }

    async reset() {
        await this.setState({
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer:  new Map(),
            currentQuestion: 0,
            doingTimer: 0
        })
    }

    async nextQuestion() {
        await this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % this.state.questionList.length
        })
    } 
    
    async prevQuestion() {
        await this.setState({
            currentQuestion: (this.state.currentQuestion + this.state.questionList.length - 1) % this.state.questionList.length
        })
    }

    answerQuestion(answer) {
        if(this.isCurrentQuestionAnswered()){
            return false;
        }
        var currentQuestion = this.state.questionList[this.state.currentQuestion];
        var selectedAnswer  = this.state.selectedAnswer;
        selectedAnswer.set(currentQuestion.id, answer);

        if(answer === currentQuestion.correctAnswer){
            this.setState({correctedAnswer: this.state.correctedAnswer + 1});
            return true;
        }
        else
        {
            this.setState({uncorrectedAnswer: this.state.uncorrectedAnswer + 1});
            return false;
        }
    }

    isOver()   {
        return this.state.questionList.length === this.state.selectedAnswer.size;
    }

    getCurrentQuestionInfo()  {
        return this.state.questionList[this.state.currentQuestion];
    }

    getCurrentQuestionNumber() {
        return this.state.currentQuestion;
    }

    getTotalQuestionNumber() {
        return this.state.questionList.length;
    }

    isCurrentQuestionAnswered()  {
        return this.state.selectedAnswer.has(this.getCurrentQuestionInfo().id);
    }

    getCurrentAnswerState(){
        var answerState = [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal]
        var question = this.getCurrentQuestionInfo();
        if(this.isCurrentQuestionAnswered()){
            answerState[this.state.selectedAnswer.get(question.id)] = AnswerState.uncorrected;
            answerState[question.correctAnswer] = AnswerState.corrected;
        }

        return answerState;
    }

    setTimer(timer){
        this.setState({
            doingTimer: timer
        });
    }
}