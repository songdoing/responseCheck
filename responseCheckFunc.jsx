import React, {useState, useRef} from 'react';
//useState를 사용하면 return부분이 새로 랜더링, but useRef는 return부분이 새로 랜더링 안 됨.
// 값이 바뀌기는 하나, 화면에 영향을 주고 싶지 않을때 useRef를 사용함
// 보통 setTimeOut이나 setInterval같은애들은 useRef를 사용
const ResponseCheck = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('Click to start.');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef();
    const endTime = useRef();
    // ref의 다른기능..hooks에서는 this의속성을 갖는다

    const onClickScreen = () => {
        
        if(state === 'waiting') {
            setState('ready');
            setMessage('Click when it changes green.')
            
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('Click Now');
                
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); //2초 3초 random            
        } else if (state === 'ready') { //클릭했다면 성급하게 한거임
            clearTimeout(timeout.current); //위의setTimeout 초기화함.
            setState('waiting');
            setMessage('bruh..Do not hurry.')
            
        } else if (state === 'now') { //   반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('Click to Start.');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current];
            });
        }
    };

    const onReset = () => {
        setResult([]);
    };

    const renderAverage = () => {
        
        return (
            result.length === 0 
            ? null 
            :<>
            <div>average of response time: {result.reduce((a,c) => a +c) / result.length}ms</div>
            <button onClick={onReset}>RESET</button>
            </>
        )
    };

    return (
        <>
                <div id="screen" className={state} onClick={onClickScreen}>
                    {message}
                </div>
                
                {/* false, undefined, null은 jsx에서 태그없음을 의마한다 */}
                <div id="result">{renderAverage()}</div>                
            </>
    );
}

export default ResponseCheck;