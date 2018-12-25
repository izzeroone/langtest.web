import * as React from 'react';
import { View } from 'native-base';
import { Text } from 'react-native';




export default class QuizScreenTimer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            process: 0,
            percent: 0
        }
    }

    componentDidMount() {
        const {interval, onTick, totalTime, onOver} = this.props;
        this._clockCall = setInterval(() => {
            const process = this.state.process + interval;
            const percent = process / totalTime;
            if(onTick){
                onTick(this.state.process);
            };
            if(process > totalTime && onOver){
                onOver();
                clearInterval(this._clockCall);
            }
            this.setState({
                process: process,
                percent: percent
            });

        }, interval);
    }

    componentWillUnmount() {
        clearInterval(this._clockCall);
    }

    render(){
        return(
            <Text>Process bar</Text>
        )
    }
}