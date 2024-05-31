import React from 'react'
import { Link } from 'react-router-dom'
import TitleRotator from './TitleRotator'

const Landing = () => {
    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='logo'>TawaSol</h1>
                    <TitleRotator />
                    <div className='buttons'>
                        <Link to="/register" className='btn btn-primary display-block'>Sing Up</Link>
                        <Link to="/login"  className='btn btn-light display-block'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing