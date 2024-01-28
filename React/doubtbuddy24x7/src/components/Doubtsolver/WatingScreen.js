import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
export default function WatingScreen() {
    const [loading, setLoading] = useState(true);
    const user = localStorage.getItem("user");
    const navigate = useNavigate();
    useEffect(() => {
        async function changeStatus() {
            try {
                const url = `http://localhost:3003/user/status/true`;
                let result = await fetch(url);
                result = await result.json()
                //
                if (result) {
                    console.log(result);
                }
            } catch (e) {
                console.error(e);
            }
        }
        changeStatus();

        let result = "wait";
        console.log(user);
        async function checkformeetlink() {
            try {
                const url = `http://localhost:3003/user/videoCall/error-solver`;
                    result = await fetch(url, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                          "email":user
                      })
                      });
                    result = await result.json()
                    console.log(result);
                    if (result!="wait") {
                        clearInterval(myInterval);
                        window.location.assign(result)
                    }
            } catch (e) {
                console.error(e);
            }
        }
        const myInterval = setInterval(checkformeetlink, 1000);
    }, []);
    return (
        <>
            {loading ? 
            <div class="d-flex align-items-center justify-content-center vh-100">
                <div className='h4 text-primary mx-3'>
                    Waiting for a compatible student to ask a doubt.. 
                </div>
                <div class="spinner-border text-primary" role="status">    
                </div>
            </div> : null}
        </>
    )
}
