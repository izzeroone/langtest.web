import QuestionDataPart1 from '../data/QuestionDataPart1';
import QuestionDataPart2 from '../data/QuestionDataPart2';
import QuestionDataPart3 from '../data/QuestionDataPart3';
import QuestionDataPart4 from '../data/QuestionDataPart4';
import QuestionDataPart5 from '../data/QuestionDataPart5';
import QuestionDataPart6 from '../data/QuestionDataPart6';


//For this app, we assume that 

class QuizService{
    _questionList = QuestionDataPart1.concat(QuestionDataPart2).concat(QuestionDataPart3).concat(QuestionDataPart4).concat(QuestionDataPart5).concat(QuestionDataPart6);

    getQuestion() {
        return this._questionList;
    }
}

const sharedQuizService = new QuizService();
export default sharedQuizService;