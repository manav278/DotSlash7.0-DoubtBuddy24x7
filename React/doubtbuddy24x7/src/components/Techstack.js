import React, { useState } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import RangeSliders from './RangeSliders';

export default function Techstack() {
    const [techStack, setTechSTack] = useState('');
    const [loading, setLoading] = useState(false);
    const [setshowFeedbackForm, setSetshowFeedbackForm] = useState(false);
    const user = localStorage.getItem("user");
    const [buddy, setbuddy] = useState({});
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // reponse->Selected User
            setLoading(true);
            console.log(techStack);
            const response = await axios.get(`http://localhost:3003/user/match/${techStack}`);
            if (response) {
                setLoading(false);
                setbuddy(response)
                console.log(buddy);
                // localStorage.setItem("currentbuddy",buddy);
                
                // navigate("/start-meeting")
            }
            console.log(response.data);
            navigate("/start-meeting", {"state": response.data})
            setSetshowFeedbackForm(true);
            console.log(techStack);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <NavbarComp />
            <div className='my-5 d-flex flex-column justify-content-center align-items-center'>
                {loading ?
                    <div class="d-flex align-items-center justify-content-center vh-100">
                        <div className='h4 text-primary mx-3'>
                            Finding the best buddy for you !..
                        </div>
                        <div class="spinner-border text-primary" role="status">
                        </div>
                    </div>

                    :
                    
                <form onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-auto">
                            <label for="exampleFormControlInput1" class="form-label h3">Tech Stack</label>
                        </div>
                    </div>
                    <div class="row g-3 align-items-center">
                        <div class="col-auto">
                            <input value={techStack} onChange={(e) => setTechSTack(e.target.value)} type="text" class="form-control form-control-lg" placeholder="Ex. Flutter, React, etc.." />
                        </div>
                        <div class="col-auto">
                            <button type="submit" class="btn btn-primary p-2 px-5">Ask</button>
                        </div>
                    </div>
                </div>
                <br />
            </form>
                }
                
      <div className='d-flex text-center justify-content-center'>
      <Link className="" to="/rangesliders">Submit Review Based upon your doubt solving experience</Link>
      </div>
            </div>
            
        </>
    )
}
