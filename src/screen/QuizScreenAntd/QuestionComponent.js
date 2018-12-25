import * as React from 'react';
import {Button} from 'antd';
import { widthPercentageToDP, heightPercentageToDP } from '../../helper/ratioHelper';
import { StyleSheet, Platform } from 'react-native';
import { View } from 'native-base';

export default class QuestionComponent extends React.Component{
    constructor(prop){
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
