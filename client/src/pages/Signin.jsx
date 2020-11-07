import React, { useState, useEffect } from 'react'
import { Header } from '../components/header/Header';
import { Link } from 'react-router-dom';
import { Footer } from '../components/footer/Footer';
import { EMAIL_REG_EXP } from '../config';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../action/action';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Button from 'react-bootstrap/esm/Button';

export const Signin = () => {
    const history = useHistory();
    const { loginInfo } = useSelector(state => state.loginStore);
    const dispatch = useDispatch();
    console.log(history);
    const [loginStat, setLoginStat] = useState({
        email: '',
        status: 0,
        msg: 'msg'
    });
    const [userInput, setUserInput] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const isInvalid = userInput.password === '' || userInput.email === '';

    const handleSignIn = async () => {

        const { email } = userInput;
        console.log(EMAIL_REG_EXP);
        if (!email.match(EMAIL_REG_EXP)) {
            setError('The email address is badly formatted.');
        } else {
            setError('');
            dispatch(fetchLogin(userInput));
            setLoggedIn(true);

        }
    }
    useEffect(() => {
        if (loggedIn && loginInfo.status === 200) {
            console.log(loginInfo)
            localStorage.setItem('userInfo', JSON.stringify({
                providerId: '',
                result: loginInfo.result,
                msg: loginInfo.msg,
                email: loginInfo.email,
                status: loginInfo.status,
                profileImg: Math.floor(Math.random() * 5) + 1,
                profile: null,
                firstName: loginInfo.firstName,
            }));
            const { status, email, msg } = loginInfo;
            console.log(history);
            history.push('/browse');
            setLoginStat({
                email: email,
                status: status,
                msg: msg
            });
        }
    }, [loggedIn, loginInfo])

    const handleChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value,
        })
    }
    useEffect(() => {
        // 만약 state 가 200 이 아닐때 에러메세지를 set한다. 200이면 성공한거니까 띄워주지 않고 나중에 페이지를 이동하거나 할것이다.
        loginInfo.state !== 200 && setError(loginInfo.msg);
    }, [loginInfo]);




    // firebase 사용해서 google, facebook, github login 구현

    const logInClick = (e) => {
        const clicked = e.target.getAttribute('name');
        if (clicked === 'google') {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log(result);
                loginAuth(result);
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'facebook') {
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log(result);
                loginAuth(result);
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'github') {
            const provider = new firebase.auth.GithubAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                console.log(result);
                loginAuth(result);
                console.log('sjadsfa')
            }).catch(function (error) {
                console.log(error);
            });
        } else if (clicked === 'twitter') {
            const provider = new firebase.auth.TwitterAuthProvider();
            console.log(provider);
            firebase.auth().signInWithPopup(provider).then(function (result) {

                loginAuth(result);
            }).catch(function (error) {
                console.log('error', error);
            });
        }


    }

    const loginAuth = (result) => {
        console.log('result.credential.providerId', result.credential.providerId)
        switch (result.credential.providerId) {
            case "google.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: result.additionalUserInfo.profile,

                }));
                setLoggedIn(true);
                history.push('/browse');
                break;
            case "facebook.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: null,

                }));
                setLoggedIn(true);
                history.push('/browse');
                break;
            case "github.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: null,
                }));
                setLoggedIn(true);
                history.push('/browse');
                break;
            case "twitter.com":
                localStorage.setItem('userInfo', JSON.stringify({
                    email: result.email,
                    providerId: result.credential.providerId,
                    profile: result.additionalUserInfo.profile,

                }));
                setLoggedIn(true);
                history.push('/browse');
                break;
            default:
                break;
        }
    }


    const userInfo = localStorage.getItem('userInfo');

    return (
        <>
            {
                userInfo === null ?
                    <div className="signin">
                        {console.log('userinfo', userInfo)}
                        <Header>
                            <div className="form">
                                <h1 className="form__title">Sign In</h1>
                                {error && <div className="form__error">{error}</div>}
                                <div className="form__base">
                                    <input className="form__input"
                                        placeholder="Email Address"
                                        onChange={handleChange}
                                        name="email" />
                                    <input className="form__input"
                                        type="password"
                                        autoComplete="off"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        name="password"
                                        onKeyPress={event => event.key === 'Enter' ? handleSignIn() : null} />
                                    <button onClick={handleSignIn} className="form__submit" disabled={isInvalid} type="submit">
                                        Sign In
                            </button>
                                </div>

                                <div className="form__text">
                                    New to Hong's Movie? <Link className="form__link" to="/signup">Sign up now.</Link>
                                </div>
                                <div className="form__smallText">
                                    This page is protected by Canada to ensure you're not a bot. Learn more.
                    </div>
                                <div className="otherways_login">
                                    <h4>You can access with</h4>
                                    <Button className="google__button" variant="outline-light" name="google" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-google"></i>Google Login</Button>
                                    <Button className="google__button" variant="outline-primary" name="facebook" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-facebook-square"></i>FaceBook Login</Button>
                                    <Button className="google__button" variant="outline-warning" name="github" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-github"></i>GitHub Login</Button>
                                    <Button className="google__button" variant="outline-info" name="twitter" title="signin button" onClick={(e) => logInClick(e)}><i className="fab fa-twitter"></i>Twitter Login</Button>
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
