import React from 'react';

class Answers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    checkAnswer(e) {

        let elem = e.currentTarget;
        let { correct, increaseScore } = this.props;
        let answer = Number(elem.dataset.id);

        if(answer === correct){
            let correctWrong = 'Correct';
            this.setState({
                score: this.state.score + 1,
            });
            increaseScore();
            this.props.handleCorrectWrong(correctWrong);
        } else {
            let correctWrong = 'Wrong';
            this.props.handleCorrectWrong(correctWrong);
        }
        
        this.props.handleAnswer();
        
    }
    
    render() {
        let { answers, style } = this.props;
        
        return (
            <div id="answers" style={style}>
                <ul>
                    <li onClick={this.checkAnswer} data-id="1"><span>A: </span>{answers[0]}</li>
                    <li onClick={this.checkAnswer} data-id="2"><span>B: </span>{answers[1]}</li>
                    <li onClick={this.checkAnswer} data-id="3"><span>C: </span>{answers[2]}</li>
                </ul>
            </div>
        );
    }
}

export default Answers