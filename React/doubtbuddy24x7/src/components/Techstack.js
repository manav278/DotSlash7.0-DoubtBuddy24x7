import React, { useState } from 'react';
import axios from 'axios';
import NavbarComp from './NavbarComp';

export default function Techstack() {
    const [techStack, setTechSTack] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // reponse->Selected User
            const response = await axios.get(`http://localhost:3003/user/match/${techStack}`);
            console.log(response);
            console.log(techStack);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <NavbarComp/>
            <div className='my-5 d-flex flex-column justify-content-center align-items-center'>
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
            </div>
        </>
    )
}
