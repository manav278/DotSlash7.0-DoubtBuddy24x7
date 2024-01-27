import React from 'react'
import axios from 'axios';
import { useState } from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { auto } from '@popperjs/core';
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
            <form onSubmit={handleSubmit} style={{ maxWidth: "800px", margin: "auto" }} className="d-flex flex-column border p-4 border-light shadow-sm rounded">
                <div className="mb-3">
                    <label htmlFor="param1" className="form-label">Satisfactory level of doubt solver:</label>
                    <div className='d-flex align-items-center'>
                        <input type="range" id="param1" className="form-range d" min="-5" max="5" value={param1} onChange={(e) => setParam1(e.target.value)} />
                        <label className="h3 mt-2 mb-4 d-inline mx-3">{param1}</label>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="param2" className="form-label">Knowledge Level and Expertise:</label>
                    <div className='d-flex align-items-center'>
                        <input type="range" id="param2" className="form-range" min="-5" max="5" value={param2} onChange={(e) => setParam2(e.target.value)} />
                        <label className="h3 mt-2 mb-4 d-inline mx-3">{param2}</label>

                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="param3" className="form-label">Interest shown by doubt solver to solve problem:</label>
                    <div className='d-flex align-items-center'>
                        <input type="range" id="param3" className="form-range" min="-5" max="5" value={param3} onChange={(e) => setParam3(e.target.value)} />
                        <label className="h3 mt-2 mb-4 d-inline mx-3">{param3}</label>

                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="param4" className="form-label">Debugging Skills:</label>
                    <div className='d-flex align-items-center'>
                        <input type="range" id="param4" className="form-range" min="-5" max="5" value={param4} onChange={(e) => setParam4(e.target.value)} />
                        <label className="h3 mt-2 mb-4 d-inline mx-3">{param4}</label>

                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="param5" className="form-label">Communication Skills:</label>
                    <div className='d-flex align-items-center'>
                        <input type="range" id="param5" className="form-range" min="-5" max="5" value={param5} onChange={(e) => setParam5(e.target.value)} />
                        <label className="h3 mt-2 mb-4 d-inline mx-3">{param5}</label>
                    </div>
                </div>

                <div className="mb-3 container-fluid" >
                    <label htmlFor="myTextarea" className="form-label">Enter Your Review:</label>
                    <textarea id="myTextarea" className="form-control" value={text} onChange={(e) => setText(e.target.value)} rows={4} cols={50} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            
        </div >
    );
}







