import React from 'react';

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.showResponse = this.showResponse.bind(this);
        this.nextQuestion = this.props.nextQuestion.bind(this);
    }
    
    showResponse() {
        this.props.nextQuestion();
    }

    render() {
        let { style, response, correctWrong, no, total } = this.props;
        
        return (
            <div className="response" style={style}>
                <h3 className={ correctWrong }>{ correctWrong }</h3>
                <div className="">
                    <p>{response}</p>
                    <button className="btn-block btn-white" onClick={this.showResponse}>{ no === total ? 'Results' : 'Next' }<i className="icon-arrow-right"></i></button>
                </div>
            </div>
        );
    }
}

export default Response