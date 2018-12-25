import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart3 : IQuestion[] = [{
    id: 'p3_1_032',
    type: QuestionType.part3,
    question: 'What are the speakers discussing?',
    answer: [
        'A motorcycler', 
        'A mobile phone', 
        'A laptop computer', 
        'An exercise machine'],
    correctAnswer: 1,
    audioAsset: require('./../assets/audio/test1/p3_1_032-034.mp3'),
    difficultLevel: 3,
    comeWith: ['p3_1_032', 'p3_1_033', 'p3_1_034']
},{
    id: 'p3_1_033',
    type: QuestionType.part3,
    question: 'What does the man ask about?',
    answer: [
        'The prices', 
        'The battery life', 
        'The warranty', 
        'The color options'],
    correctAnswer: 3,
    audioAsset: require('./../assets/audio/test1/p3_1_032-034.mp3'),
    difficultLevel: 3,
    comeWith: ['p3_1_032', 'p3_1_033', 'p3_1_034']
},{
    id: 'p3_1_034',
    type: QuestionType.part3,
    question: 'What will the woman most likely do next?',
    answer: [
        'Request some feedback', 
        'Contact a technician', 
        'Complete a transaction', 
        'Create an online profile'],
    correctAnswer: 2,
    audioAsset: require('./../assets/audio/test1/p3_1_032-034.mp3'),
    difficultLevel: 3,
    comeWith: ['p3_1_032', 'p3_1_033', 'p3_1_034']
}];

export default QuestionDataPart3;
