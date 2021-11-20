import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import s from "./Header.module.css"


function Header() {
    const [isHover, setIsHover] = useState<boolean>( false )
    const toggleHover = () => setIsHover( !isHover )
    const headerClassName = `${ s.header } ${ isHover ? s.hovered : '' }`

    return (
        <div className={ headerClassName } onMouseEnter={ toggleHover } onMouseLeave={ toggleHover }>
            <NavLink to={ '/' }>Test</NavLink>
            <NavLink to={ 'change-password' }>change-password</NavLink>
            <NavLink to={ 'login' }>login</NavLink>
            <NavLink to={ 'profile' }>profile</NavLink>
            <NavLink to={ 'recover' }>recover</NavLink>
            <NavLink to={ 'registration' }>registration</NavLink>
            <NavLink to={ '404' }>Error404</NavLink>
            {/*<span className={ s.dots }>&#8285;</span>*/ }
        </div>
    )
}

export default Header
