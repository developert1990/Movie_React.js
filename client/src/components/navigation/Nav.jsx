import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const Nav = () => {
    return (
        <div className="nav">
            <Link to="/">
                <img className="nav__logo" src="/images/mylogo.png" alt="logo" />
            </Link>
            <Link className="link" to="/signin" ><Button className="nav__button" variant="outline-danger" title="signin button">Sign In</Button></Link>
        </div>
    )
}
