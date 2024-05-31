import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <nav className='navbar bg-navbar'>
        <h1>
            <Link className='logo-navbar'>
                TawaSol
            </Link>
        </h1>
        <>
            <ul>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
            </ul>
        </>
    </nav>
    
  )
}

export default Navbar