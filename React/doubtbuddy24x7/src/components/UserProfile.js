import React, { useEffect, useState } from 'react'

export default function UserProfile() {
    const [userinfo, setUserInfo] = useState({});
    useEffect(() => {
        async function adduser() {
            try {
                const userinfo = localStorage.getItem("userinfo");
                setUserInfo(JSON.parse(userinfo));
            } catch (e) {
                console.error(e);
            }
        }
        adduser();
    }, []);
    return (
        <div>
            {console.log(userinfo)}
            <div>
                <h2>User Information</h2>
                <ul>
                    <li>Email: {userinfo.email}</li>
                    <li>Growth Rate: {userinfo.growthrate}</li>
                    <li>Highest Rating: {userinfo.highestrating}</li>
                    <li>Online Status: {userinfo.onlinestatus ? 'Online' : 'Offline'}</li>
                    <li>Rating: {userinfo.rating}</li>
                    <li>
                        Reviews: {userinfo.reviews && userinfo.reviews.length > 0 ? userinfo.reviews.join(', ') : 'No reviews yet'}
                    </li>
                    <li>
                        Technology: {userinfo.technology && userinfo.technology.length > 0 ? userinfo.technology.join(', ') : ''}
                    </li>
                    <li>Username: {userinfo.username}</li>
                </ul>
            </div>
        </div>
    )
}
