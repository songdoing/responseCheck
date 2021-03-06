import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state : 'waiting',
        message : 'Click to start.',
        result : [],
    };
    // 타임아웃 선언해주고, this.timeout에다가 setTimeout()를 대입해줌
    timeout;
    startTime;
    endTime; 

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if(state === 'waiting') {
            this.setState({
                state : 'ready',
                message : 'Click when it changes green.'
            });
            this.timeout = setTimeout(() => {
                this.setState({
                    state : 'now',
                    message : 'Click Now!'
                });
                this.startTime = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2초 3초 random            
        } else if (state === 'ready') { //클릭했다면 성급하게 한거임
            clearTimeout(this.timeout); //위의setTimeout 초기화함.
            this.setState({
                state : 'waiting',
                message : 'bruh..Do not hurry.'
            })
        } else if (state === 'now') { //   반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state : 'waiting',
                    result : [...prevState.result, this.endTime - this.startTime],
                    message : 'Click to start.'
                };                
            });
        }
    };

    onReset = () => {
        this.setState({
            result : [],
        });
    };

    renderAverage = () => {
        // 구조분해로 길이 줄이기
        const { result } =this.state;
        return (
            result.length === 0 
            ? null 
            :<>
            <div>average of response time: {parseInt(result.reduce((a,c) => a +c) / result.length)}ms</div>
            <button onClick={this.onReset}>RESET</button>
            </>
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
                <div id="result">{this.renderAverage()}</div>                
            </>
        );
    }
}

export default ResponseCheck;