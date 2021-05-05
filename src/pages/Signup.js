import {useState} from 'react'
import axios from 'axios'

const Signup = (props) => {

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const handleSignupSubmit = async(e) => {
        e.preventDefault()
        let res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            name: name,
            email: email,
            password: password
        })
        console.log(res)
        console.log('successful registration')
        localStorage.setItem('userId', res.data.encryptedId)
        props.setUser(res.data.user)
    } 

    return (
        <div>
            <div className="signup-container">
                <h1>Sign up!</h1>
                <form onSubmit={handleSignupSubmit}>
                    <input type="text" placeholder="name" value={name} onChange={(e) => 
                    setName(e.target.value)} />
                    <input type="text" placeholder="email" value={email} onChange={(e) => 
                    setEmail(e.target.value)} />
                    <input type="text" placeholder="password" value={password} onChange={(e) => 
                    setPassword(e.target.value)} />
                    <input type="submit" value="Sign Up" />
                </form>
            </div>

        </div>
    )
}

export default Signup


