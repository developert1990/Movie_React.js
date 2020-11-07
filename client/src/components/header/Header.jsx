import React from 'react'
import { Nav } from '../navigation/Nav';

export const Header = ({ children }) => {
    return (
        <div className="header">
            {/* {console.log(children)}  이렇게 콘솔 찍어보면 type 에 name 에 Feature이라고 나온다.*/}
            <Nav />
            {children}
        </div>
    )
}

