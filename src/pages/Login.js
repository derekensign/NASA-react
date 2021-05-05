import {useState} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


const Login = (props) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const loginSubmit = async(e) => {
        e.preventDefault()
        let response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
            email: email,
            password: password
        })
        console.log(response)
        localStorage.setItem('userId', response.data.encryptedId)
        props.setUser(response.data.user)
    }

    return (
        <div>
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <input type="text" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                    <input type="submit" value="login"/>
                </form>
            </div>
        </div>
    )
}

export default Login
