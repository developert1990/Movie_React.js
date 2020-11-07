import React, { useState } from 'react'
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Link, useHistory } from 'react-router-dom';
import { USER_BASE, EMAIL_REG_EXP } from '../config/index';

export const Signup = () => {

    const history = useHistory();
    const userInfo = localStorage.getItem('userInfo');
    // const { firebase } = useContext(FirebaseContext);
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [signedup, setsignedup] = useState(false);

    const isInvalid = firstName === '' || password === '' || email === '';

    const handleSignup = async () => {
        console.log(firstName, password, email);


        if (!email.match(EMAIL_REG_EXP)) {
            setError('The email address is badly formatted.');
            setEmail('');
            setPassword('');
            setFirstName('');
        } else {
            const response = await fetch(`${USER_BASE}/signup`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ firstName, password, email }),
            });
            const data = await response.json();
            console.log(data);
            localStorage.setItem('userInfo', JSON.stringify({
                providerId: '',
                result: data.result,
                msg: data.msg,
                email: data.email,
                status: data.status,
                profileImg: Math.floor(Math.random() * 5) + 1,
                profile: null,
                firstName: data.firstName,
            }));
            setsignedup(true);
        }

    }


    return (
        <>
            {
                userInfo === null || userInfo === {} ?
                    <div className="signup">
                        <Header>
                            <div className="form">
                                <h1 className="form__title">Sign Up</h1>
                                {error && <div className="form__error">{error}</div>}

                                <div className="form__base">
                                    <input className="form__input"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={({ target }) => setFirstName(target.value)} />
                                    <input className="form__input"
                                        placeholder="Email address"
                                        value={email}
                                        onChange={({ target }) => setEmail(target.value)} />
                                    <input className="form__input"
                                        type="password"
                                        value={password}
                                        autoComplete="off"
                                        placeholder="Password"
                                        onChange={({ target }) => setPassword(target.value)} />
                                    <button className="form__submit" disabled={isInvalid} onClick={handleSignup} type="submit">
                                        Sign Up
                    </button>

                                    <div className="form__text">
                                        Already a user? <Link className="form__link" to="/signin">Sign in now.</Link>
                                    </div>

                                    <div className="form__smallText">
                                        This page is protected by Canada to ensure you're not a bot. Learn more.
                    </div>

                                </div>
                            </div>
                        </Header>
                        <Footer />
                    </div>
                    :
                    <>
                        {history.push('/browse')}
                    </>
            }
        </>
    )
}
