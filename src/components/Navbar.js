import {useState} from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {


    const logout = () => {
        localStorage.clear()
        props.setUser(null)

    }

    return (
        <>
            <nav>
                <ul>
                    <li><Link className="nav-link" to="/">Home</Link></li>

                    {props.user ?

                    <>

                        <li><Link className="nav-link" to="/gallery">Gallery</Link></li>
                        <li><Link className="nav-link" to="/profile">Profile</Link></li>
                        <li onClick={() => logout()}><Link className="nav-link" to="/login">Logout</Link></li>
                    </>

                    :
                    <>

                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        <li><Link className="nav-link" to="/signup">Signup</Link></li>
                    </>

                    }
                </ul>


            </nav>
        
        
        </>
    )
}

export default Navbar
