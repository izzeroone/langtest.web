import QuizStore from "../../src/store/quizStore";
import React from 'react';
import {Subscribe, Provider} from "unstated";
import QuizScreenContainer, {QuizScreenContainerProps} from "./QuizScreenContainer";


export default class QuizScreen extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Provider>
                <Subscribe to={[QuizStore]}>
                    {(quizStore) => (
                        <QuizScreenContainer
                            quizStore={quizStore as QuizStore}
                        />
                    )}
                </Subscribe>
            </Provider>
        );
    }
}