import IQuestion, { QuestionType } from "../entity/Question";

const QUESTION_PHASE: string = 'Choose the best response'
const QuestionDataPart2 : IQuestion[] = [{
    id: 'p2_1_007',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 1,
    audioAsset: require('./../assets/audio/test1/p2_1_007.mp3'),
    difficultLevel: 3
},{
    id: 'p2_1_008',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 0,
    audioAsset: require('./../assets/audio/test1/p2_1_008.mp3'),
    difficultLevel: 3
},{
    id: 'p2_1_009',
    type: QuestionType.part2,
    question: QUESTION_PHASE,
    answer: ['A', 'B', 'C'],
    correctAnswer: 0,
    audioAsset: require('./../assets/audio/test1/p2_1_009.mp3'),
    difficultLevel: 3
}];

export default QuestionDataPart2;
