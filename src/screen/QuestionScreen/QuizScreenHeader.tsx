import * as React from 'react';
import {Header, Left, Body, Right, Button, Icon, Title, Text} from 'native-base';
import { Platform } from "react-native";
import { widthPercentageToDP } from '../../helper/ratioHelper';

export interface Props{
    title: String,
    correctAnswer: number,
    uncorrectedAnswer : number,
    onFinishButton : () => void,
    flashCorrect: boolean,
    flashIncorrect: boolean
}

export default class QuizScreenHeader extends React.Component<Props>{

    getIconColorSmile() : string {
        const {flashCorrect} = this.props;

        if(Platform.OS === 'ios'){
            if(flashCorrect){
                return '#46C00D';
            }
            else
                return 'black';
        } else {
            if(flashCorrect){
                return '#46C00D';
            }
            else
                return 'white';
        }
    }

    getIconColorUnsmile() : string {
        const {flashIncorrect} = this.props;

        if(Platform.OS === 'ios'){
            if(flashIncorrect){
                return '#EF2121';
            }
            else
                return 'black';
        } else {
            if(flashIncorrect){
                return '#EF2121';
            }
            else
                return 'white';
        }
    }

    render() {
        const {correctAnswer, uncorrectedAnswer, title, onFinishButton} = this.props;

        return (
            <Header androidStatusBarColor="#0076BF" style={{backgroundColor: Platform.OS ==='android' ? '#019AE8' : '#FFFFFF'}}>

                {Platform.OS === 'ios'  
                ? 
                <Button transparent onPress={()=> {onFinishButton()}}>
                    <Text>Finish</Text>
                </Button>
                    :
                <Button transparent onPress={()=> {onFinishButton()}}>
                    <Text>Button</Text>
                    {/* <Icon name = 'nothing' android='md-done-all' ios='md-done-all'/> */}
                </Button>
                }

                <Text>{title}</Text>

                <Button transparent>
                    <Text style={{paddingRight: 10, alignContent: 'center'}}>{correctAnswer}</Text>
                    {/* <Icon name='smileo' color={this.getIconColorSmile()} /> */}
                </Button>
                <Button transparent>
                    <Text style={{paddingRight: 10, alignContent: 'center'}}>{uncorrectedAnswer}</Text>
                    {/* <Icon name='frowno' color={this.getIconColorUnsmile()} /> */}
                </Button>
        </Header>
        );
    }
}