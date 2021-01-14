import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state : 'waiting',
        message : 'You need to click for starting a game.',
        result : [],
    };

    onClickScreen = () => {

    };

    renderAverage = () => {
        // 구조분해로 길이 줄이기
        const { result } =this.state;
        return (
            result.length === 0 
            ? null 
            :<div>average of response time: {result.reduce((a,c) => a +c) / result.length}ms</div>
        )
    };

    render() {
        const { state, message } = this.state;
        return (
            <>
                <div id="screen" className={state} onClick={this.onClickScreen}>
                    {message}
                </div>
                {/* false, undefined, null은 jsx에서 태그없음을 의마한다 */}
                {this.renderAverage()}                
            </>
        );
    }
}

export default ResponseCheck;