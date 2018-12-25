import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart1 : IQuestion[] = [{
    id: 'p1_1_001',
    type: QuestionType.part1,
    question: 'Choose the best description',
    answer: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    imageAsset: require('./../assets/images/test1/p1_1_001.png'),
    audioAsset: require('./../assets/audio/test1/p1_1_001.mp3'),
    difficultLevel: 3
},{
    id: 'p1_1_002',
    type: QuestionType.part1,
    question: 'Choose the best description',
    answer: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    imageAsset: require('./../assets/images/test1/p1_1_002.png'),
    audioAsset: require('./../assets/audio/test1/p1_1_002.mp3'),
    difficultLevel: 3
},{
    id: 'p1_1_003',
    type: QuestionType.part1,
    question: 'Choose the best description',
    answer: ['A', 'B', 'C', 'D'],
    correctAnswer: 3,
    imageAsset: require('./../assets/images/test1/p1_1_003.png'),
    audioAsset: require('./../assets/audio/test1/p1_1_003.mp3'),
    difficultLevel: 3
}];

export default QuestionDataPart1;
