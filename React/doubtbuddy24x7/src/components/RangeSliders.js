import React from 'react'
import axios from 'axios';
import { useState } from 'react'
export default function RangeSliders() {
    const [param1, setParam1] = useState(0);
    const [param2, setParam2] = useState(0);
    const [param3, setParam3] = useState(0);
    const [param4, setParam4] = useState(0);
    const [param5, setParam5] = useState(0);
    const [text, setText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // reponse->Selected User
            const response = await axios.post(`http://localhost:3003/user/rating`, { "param1": param1, "param2": param2, "param3": param3, "param4": param4, "param5": param5, "review": text });
            console.log(response);

        } catch (e) {
            console.error(e);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Satisfactory level of doubt solver : <input type="range" min="-5" max="5" value={param1} onChange={(e) => setParam1(e.target.value)} />
                <h1>{param1}</h1>
                {/* ----------------------------- */}
                Knowledge Level and Expertise : <input type="range" min="-5" max="5" value={param2} onChange={(e) => setParam2(e.target.value)} />
                <h1>{param2}</h1>
                {/* ----------------------------- */}
                Interest shown by doubt solver to solve problem : <input type="range" min="-5" max="5" value={param3} onChange={(e) => setParam3(e.target.value)} />
                <h1>{param3}</h1>
                {/* ----------------------------- */}
                Debugging Skills : <input type="range" min="-5" max="5" value={param4} onChange={(e) => setParam4(e.target.value)} />
                <h1>{param4}</h1>
                {/* ----------------------------- */}
                Communication Skills : <input type="range" min="-5" max="5" value={param5} onChange={(e) => setParam5(e.target.value)} />
                <h1>{param5}</h1>
                {/* ----------------------------- */}
                <p>Enter Your Review : </p>
                <textarea id="myTextarea" value={text} onChange={(e) => setText(e.target.value)} rows={4} cols={50} />
                <p>Your Preview for Review : {text}</p>
                <button type="submit">Submit</button>
            </form>
        </div >
    );
}







