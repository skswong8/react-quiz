import React from 'react';

class QuestionCount extends React.Component {
    render() {
        let { no, total, quizFinished } = this.props;
        let content;
        if (no == 0) {
            content = '';
        } else if (no == total && quizFinished == true) {
            content = <h3 className="heading-underline">Results</h3>
        } else {
            content = <h3 className="heading-underline">QUESTION <strong>{no}</strong> OF <strong>{total}</strong></h3>
        }
        return (
            content
        );
    }
}

export default QuestionCount