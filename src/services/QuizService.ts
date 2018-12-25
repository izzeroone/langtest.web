import IQuizService from './IQuizService'
import IQuestion, { QuestionType } from '../entity/Question';
import QuestionDataPart1 from '../data/QuestionDataPart1';
import QuestionDataPart2 from '../data/QuestionDataPart2';
import QuestionDataPart3 from '../data/QuestionDataPart3';
import QuestionDataPart4 from '../data/QuestionDataPart4';
import QuestionDataPart5 from '../data/QuestionDataPart5';
import QuestionDataPart6 from '../data/QuestionDataPart6';


//For this app, we assume that 

class QuizService implements IQuizService{
    _questionList : IQuestion[] = QuestionDataPart1.concat(QuestionDataPart2).concat(QuestionDataPart3).concat(QuestionDataPart4).concat(QuestionDataPart5).concat(QuestionDataPart6);

    getQuestion(): IQuestion[] {
        return this._questionList;
    }    
    reset(): void {
        this._questionList = null;
    }
    //Calculator the number of question for each type by percent
    //Because of the rounding, the total number of question may not true, so we trim down or scale random type of question
    //Then scan for the number of question of each type, the number of difficult level may increase by one two but not over

}

const sharedQuizService = new QuizService();
export default sharedQuizService;