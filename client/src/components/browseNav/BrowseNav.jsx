import React from 'react';
import { Link } from 'react-router-dom';

export const BrowseNav = () => {
    return (
        <div>
            <Link to="/">
                <img src="/images/mylogo.png" alt="logo" />
            </Link>
        </div>
    )
}
