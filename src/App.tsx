import React, { Component } from 'react';
import { Button } from 'antd';
  import './App.css';
import QuestionComponent from './screen/QuizScreenAntd/QuestionComponent';
import sharedQuizService from './services/QuizService';

  class App extends Component {
    render() {
      return (
        <div className="App">
            <QuestionComponent question={sharedQuizService.getQuestion()[0]}></QuestionComponent>
        </div>
      );
    }
  }

  export default App;