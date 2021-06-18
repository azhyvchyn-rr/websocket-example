import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMessage, messagesListSelector} from 'reducers/message.reducer';

import './App.css';

function App() {
    const dispatch = useDispatch();
    const [ws, setWs] = React.useState(null);
    const [textValue, setTextValue] = React.useState('');
    const [timesValue, setTimesValue] = React.useState(1);
    const [toAllValue, setToAllValue] = React.useState(false);
    const messagesList = useSelector(messagesListSelector);

    React.useEffect(() => {
        const ws = new WebSocket(`ws:${window.location.host}/ws`);

        ws.onopen = () => {
            console.log('WebSocket connected');
            setWs(ws);
        };

        return () => ws.close();
    }, []);

    React.useEffect(() => {
        if (ws) {
            ws.onmessage = evt => {
                const {text, type} = JSON.parse(evt.data);

                dispatch(addMessage(text));
            };

            ws.onclose = () => console.log('WebSocket disconnected');

            ws.onerror = () => {

            };
        }
    }, [ws]);

    const send = () => {
        const payload = {
            text: textValue,
            times: timesValue,
            all: toAllValue
        };

        ws.send(JSON.stringify(payload));
    };

    return (
        <div className="App">
            <div className="Form">
                <label>
                    Text
                    <input value={textValue} onChange={(event) => setTextValue(event.target.value)} />
                </label>
                <label>
                    Times
                    <input
                        type="number"
                        value={timesValue}
                        onChange={(event) => setTimesValue(event.target.value)}
                        min={1}
                    />
                </label>
                <label>
                    To All
                    <input type="checkbox" checked={toAllValue}
                           onChange={(event) => setToAllValue(event.target.checked)} />
                </label>
                <label>
                    <button onClick={send}>
                        Send
                    </button>
                </label>
            </div>
            <div>
                {messagesList.map((text, index) => (
                    <p key={index}>
                        {text}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default App;
