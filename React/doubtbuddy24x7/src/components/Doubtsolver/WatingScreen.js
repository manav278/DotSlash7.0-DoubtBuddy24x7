import React, { useEffect, useState } from 'react'

export default function WatingScreen() {

    const [loading, setLoading] = useState(true);
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
            </div>

                : null}
        </>
    )
}
