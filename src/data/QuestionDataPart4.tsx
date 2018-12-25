import IQuestion, { QuestionType } from "../entity/Question";

const QuestionDataPart4 : IQuestion[] = [{
    id: 'p4_1_071',
    type: QuestionType.part4,
    question: 'Where does the speaker work?',
    answer: [
        'At an electronics store', 
        'At a plumbing company', 
        'At a car repair shop', 
        'At a cleaning service'],
    correctAnswer: 2,
    audioAsset: require('./../assets/audio/test1/p4_1_071-073.mp3'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
},{
    id: 'p4_1_072',
    type: QuestionType.part4,
    question: 'What does the speaker say he has done?',
    answer: [
        'Scheduled an appointment', 
        'Completed a repair', 
        'Adjusted an invoice', 
        'Ordered a part'],
    correctAnswer: 3,
    audioAsset: require('./../assets/audio/test1/p4_1_071-073.mp3'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
},{
    id: 'p4_1_073',
    type: QuestionType.part4,
    question: 'What does the speaker offer?',
    answer: [
        'Use of a vehicle', 
        'An extended warranty', 
        'A free inspection', 
        'Expedited delivery'],
    correctAnswer: 0,
    audioAsset: require('./../assets/audio/test1/p4_1_071-073.mp3'),
    comeWith: ['p4_1_071', 'p4_1_072', 'p4_1_073'],
    difficultLevel: 3
}];

export default QuestionDataPart4;
