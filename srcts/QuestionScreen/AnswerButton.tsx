import React from 'react';
import {StyleSheet, Animated, ViewStyle, TouchableOpacity} from 'react-native';
import { Button, Text, View} from 'native-base';
import { widthPercentageToDP } from '../../src/helper/ratioHelper';


export enum AnswerState{'normal', 'selected', 'corrected', 'uncorrected'}

export interface Props {
    onPress: () => void,
    answerState: AnswerState, 
    text: string
}

export default class AnswerButton extends React.Component<Props>{
    shouldComponentUpdate(nextProps : Props, nextState : {}) : boolean{
        if(this.props.answerState !== nextProps.answerState){
            return true;
        }
        
        return false;
    }
    render(){
        let result = null;

        result = (<TouchableOpacity style={stylesNormal.answerButton as ViewStyle} onPress={this.props.onPress}>
            <View style={stylesNormal.answerCircle}></View>
            <Text uppercase={false} allowFontScaling={true} style={stylesNormal.answerText}>{this.props.text}</Text>
        </TouchableOpacity>);

        if(this.props.answerState === AnswerState.corrected){
            result = (
                <TouchableOpacity  style={stylesCorrect.answerButton as ViewStyle} onPress={this.props.onPress}>
                    <View style={stylesCorrect.answerCircle}>
                        {/* <Icon name="md-checkmark" color="white" /> */}
                    </View>
                    <Text uppercase={false} allowFontScaling={true} style={stylesCorrect.answerText}>{this.props.text}</Text>
                </TouchableOpacity>);
        }

        if(this.props.answerState === AnswerState.uncorrected){
            result =  (            
                <TouchableOpacity style={stylesIncorrect.answerButton as ViewStyle}  onPress={this.props.onPress}>
                    <View style={stylesIncorrect.answerCircle}>
                        {/* <Icon name="remove" color="white" />   */}
                    </View>
                    <Text uppercase={false} allowFontScaling={true} style={stylesIncorrect.answerText}>{this.props.text}</Text>
                </TouchableOpacity>);
        }

        return (
            <Animated.View style={stylesNormal.answerButton} >
                {result}
            </Animated.View>
        );
    }
}

const stylesNormal = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#B3B3B3',
        backgroundColor: '#FFFFFF',
        shadowRadius: 0
    },
    answerText: {
        color: '#4F4F4F',
        fontSize: 14,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    answerCircle: {
        height: '60%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        backgroundColor: '#C4C4C4'
    }
});


const stylesCorrect = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 0,
        backgroundColor: '#46C00D',
        shadowRadius: 0
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 14,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    answerCircle: {
        height: '60%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46C00D'
    },
    checkIcon: {
        color: '#FFFFFF'
    }
});

const stylesIncorrect = StyleSheet.create({
    answerButton: {
        flex: 1,
        borderRadius: 30,
        borderWidth: 0,
        backgroundColor: '#EF2121',
        shadowRadius: 0
    },
    answerText: {
        color: '#FFFFFF',
        fontSize: 14,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    answerCircle: {
        height: '60%',
        borderRadius: 25,
        aspectRatio: 1,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EF2121'
    },
    checkIcon: {
        color: '#FFFFFF'
    }
});
