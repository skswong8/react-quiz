import React from "react";
import { render } from "react-dom";
import data from "../data/data";
import QuestionCount from './QuestionCount';
import Answers from './Answers';
import Response from "./Response";
import Skip from "./Skip";
import Share from "./Share";
import './scss/quiz.scss';

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "DO YOU KNOW MULTIPLE SCLEROSIS?",
            question: "How #MSaware are you? Could you recognise the symptoms?  Take our short quiz to find out.",
            no: -1,
            total: data.length,
            questionAnswered: false, 
            score: 0,
            displayAnswerList: 'block',
            classNames: ['', '', ''],
            answers: [ data[0].answers[0], data[0].answers[1], data[0].answers[2] ],
            displayAnswer: 'none',
            correctWrong: 'Wrong',
            quizFinished: false,
            shareMessage: 'How much do you know about #MS? Take the quiz to find out how #MSaware you are. #WorldMSDay #MyInvisibleMS',
            url: 'https://msaware.roche.ie'
        }
        this.nextQuestion = this.nextQuestion.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleCorrectWrong = this.handleCorrectWrong.bind(this);
        this.handleIncreaseScore = this.handleIncreaseScore.bind(this);
    }

    pushData(no) {
        this.setState({
            no: this.state.no + 1
        });
        if (no !== -1) {
            this.setState({
                title: "DO YOU KNOW MS?",
                question: data[no].question,
                response: data[no].response,
                answers: [ data[no].answers[0], data[no].answers[1], data[no].answers[2] ],
                correct: data[no].correct
            });
        }
    }

    componentDidMount() {
        let { no } = this.state;
        this.pushData(no);
    }

    nextQuestion() {
        let { no, total, score } = this.state;

        this.setState({
            displayAnswer: 'none',
            displayAnswerList: 'block',
        });

        if(no === total){
            this.setState({
                displayAnswer: 'none',
                displayAnswerList: 'none',
                quizFinished: true,
                shareMessage: 'I just scored '+ (score) +' out of '+ (total) +' on the #MSaware quiz. See how much you know about Multiple Sclerosis for #worldMSday #MyInvisibleMS'
            });
        } else {
            this.pushData(no);
            this.setState({
                questionAnswered: false
            });
        }
    }

    handleIncreaseScore() {
        this.setState({
            score: this.state.score + 1
        });
    }

    handleAnswer() {
        this.setState({
            questionAnswered: true
        });
        this.handleResponse();
    }

    handleResponse() {
        if (this.state.questionAnswered == false) {
            this.setState({
                displayAnswer: 'block',
                displayAnswerList: 'none'
            });
        } else {
            this.setState({
                displayAnswer: 'none',
                displayAnswerList: 'block'
            });
        }
    }

    handleCorrectWrong(answerCallback) {
        this.setState({
            correctWrong: answerCallback
        });
    }

    render() {
        let { no, total, title, question, response, correctWrong, displayAnswerList, answers, correct, quizFinished, displayAnswer, score, questionAnswered, shareMessage, url } = this.state;

        return (
            <div className="quiz">

                <div className="quiz-title">
                    <h2>HOW WELL
                        <br></br>
                        <span className=
                            { no == 0
                                ?
                                'yellow'
                                :
                                'white'
                            }
                        >{ title }</span>
                    </h2>
                </div>

                <section className="quiz-container">

                    <QuestionCount
                        no={no}
                        total={total}
                        quizFinished={quizFinished}
                    />

                    { quizFinished == true 
                        ?
                        null
                        :
                        <p className="question">{ question }</p>
                    }

                    { no == 0
                        ?
                        null
                        :
                        <Answers
                            style={{display: displayAnswerList}}
                            answers={answers}
                            correct={correct}
                            handleAnswer={this.handleAnswer}
                            increaseScore={this.handleIncreaseScore}
                            handleCorrectWrong={this.handleCorrectWrong}
                        />
                    }

                    <Response
                        style={{display: displayAnswer}}
                        no={no}
                        total={total}
                        response={response}
                        correctWrong={correctWrong}
                        displayAnswer={displayAnswer}
                        displayAnswerList={displayAnswerList}
                        nextQuestion={this.nextQuestion }
                        handleCorrectWrong={this.handleCorrectWrong}
                        quizFinished={quizFinished}
                    />

                    { no == 0
                        ?
                        <button
                            className="btn-block btn-white start-quiz"
                            onClick={ this.nextQuestion }
                        >Start Quiz<i className="icon-arrow-right"></i>
                        </button>
                        :
                        null
                    }

                    { no == 0 || questionAnswered == true || quizFinished == true
                        ?
                        null
                        :
                        <Skip
                            handleAnswer={this.handleAnswer}
                            handleCorrectWrong={this.handleCorrectWrong}
                        />
                    }

                    { quizFinished == true
                        ?
                        <div className="response quiz-finished">
                            <h3>Thank you for taking part in our quiz.</h3>
                            <h4>You scored</h4>
                            <h4><strong>{score}</strong> out of <strong>{total} :)</strong></h4>
                            <p>Help raise awareness and share your results.
                                <br></br>
                                <strong>#MSaware</strong>
                            </p>
                            <Share
                                score={score}
                                total={total}
                                shareMessage={shareMessage}
                                url={url}
                            />
                        </div>
                        :
                        null
                    }
                    
                    { no == 0
                        ?
                        <Share
                            score={score}
                            total={total}
                            shareMessage={shareMessage}
                            url={url}
                        />
                        :
                        null
                    }

                </section>
            </div>
        )
    }
}

render(React.createElement(App), document.getElementById('root'))