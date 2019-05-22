import React from 'react';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Share extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };
    }

    timer() {
        this.timeout = setTimeout(function(){
            this.setState({
                copied: false
            });
       }.bind(this),4500);
    }

    render(){
        let { shareMessage, url } = this.props;

        return (
            <ul className="quiz-share">
                <li>
                    <TwitterShareButton children={<TwitterIcon size={32} round={true} /> } url={url} title={shareMessage} />
                </li>
                <li>
                    <FacebookShareButton children={<FacebookIcon size={32} round={true} />} url={url} quote={shareMessage} />
                </li>
                <li className="copy-link">
                    <CopyToClipboard text={url} onCopy={() => this.setState({copied: true})}>
                        <button className="copy-clipboard"><i className="icon-share"></i>SHARE</button>
                    </CopyToClipboard>
                    {this.state.copied ? <span>Link copied.</span> : null}
                </li>
            </ul>

        )
    }
}

export default Share