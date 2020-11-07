import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export const Profile = () => {
    const history = useHistory();
    const [localClear, setLocalClear] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const handleLogout = () => {
        localStorage.clear();
        setLocalClear(true);
    }
    return (
        <>
            {
                !localClear ?
                    <div className="profile">
                        <img src={`${userInfo.profile !== null || userInfo.profileImg === 0 ? userInfo.profile.picture : `/images/profile/${userInfo.profileImg}.jpg`}`} alt="profile" />
                        <div className="profile__dropdown__none profile__dropdown__show">
                            <div className="profile__dropdown__info">
                                <img src={`${userInfo.profile !== null ? userInfo.profile.picture : `/images/profile/${userInfo.profileImg}.jpg`}`} alt="profile" />
                                <h6>{userInfo.profile !== null ? userInfo.profile.given_name : userInfo.firstName}</h6>
                            </div>
                            <Button onClick={handleLogout} variant="outline-light" className="profile__signout__button">Sign out</Button>
                        </div>
                    </div>
                    :
                    <>
                        {history.push('/signin')}
                    </>
            }
        </>
    )
}
