import React from 'react';

class Skip extends React.Component {
    constructor(props) {
        super(props);
        this.skipQuestion = this.skipQuestion.bind(this);
    }
    
    skipQuestion() {
        let correctWrong = 'Wrong';
        this.props.handleCorrectWrong(correctWrong);
        this.props.handleAnswer();    
    }

    render() {
        return (
            <button id="skip-btn" onClick={this.skipQuestion}>Skip</button>
        );
    }
}

export default Skip