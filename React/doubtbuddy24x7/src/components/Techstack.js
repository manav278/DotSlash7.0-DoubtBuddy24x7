import React, { useState } from 'react';
import axios from 'axios';

export default function Techstack() {
    const [techStack, setTechSTack] = useState('');
    // Function to handle DoubtAsker click
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter TechStack Here : <input type="text" value={techStack} onChange={(e) => setTechSTack(e.target.value)}/>
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
