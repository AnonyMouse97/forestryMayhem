import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

const Login = () => {
    const [signUp, setSignUp] = useState(true)
    const [signIn, setSignIn] = useState(false)

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignIn(false)
            setSignUp(true)
        } else if (e.target.id === "login") {
            setSignUp(false)
            setSignIn(true)
        }
    }

    return (
        <div className="Login">
            <ul>
                <button onClick={handleModals} id="register" disabled={signUp}>Sign Up</button>
                <button onClick={handleModals} id="login" disabled={signIn}>Sign In</button>
            </ul>
            {signUp && <SignUpForm />}
            {signIn && <SignInForm />}
        </div>
    )
}

export default Login