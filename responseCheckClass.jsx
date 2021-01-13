import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state : '',
        message : 'You need to click for starting a game.',
        result : [],
    };

    onClickScreen = () => {

    };

    render() {
        return (
            <>
                <div id="screen" className={this.state.state} onClick={this.onClickScreen}>
                    {this.state.message}
                </div>
                <div>average of response time: {this.state.result.reduce((a,c) => a +c) / this.state.result.length}ms</div>
            </>
        );
    }
}

export default ResponseCheck;