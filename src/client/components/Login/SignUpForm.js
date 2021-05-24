import React, { useState } from 'react'
import axios from 'axios'
import SignIn from './SignInForm'

const SignUp = () => {
    const [formSubmit, setFormSubmit] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [color, setColor] = useState('')
    const [profilePic, setProfilePic] = useState('')

    const handleRegister = async (e) => {

        e.preventDefault()

        const userNameError = document.querySelector('.userName-error')
        const passwordError = document.querySelector('.password-error')
        const emailError = document.querySelector('.email-error')
        const colorError = document.querySelector('.color-error')
        const profilePicError = document.querySelector('.profilePic-error')

        await axios({
            method: "post",
            url: `${process.env.API_URL}api/user/register`,
            data: {
                userName,
                email,
                password,
                color,
                profilePic
            }
        }).then((res) => {
            console.log(res)
            if (res.data.errors) {
                userNameError.innerHTML = res.data.errors.userName
                passwordError.innerHTML = res.data.errors.password
                emailError.innerHTML = res.data.errors.email
                // colorError.innerHTML = res.data.errors
                // profilePicError.innerHTML = res.data.errors
            } else {
                setFormSubmit(true)
            }
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
            {formSubmit ? (
                <>
                    <SignIn />
                    <h4>Profile created! Please sign up</h4>
                </>
            ) : (
                <form action="" onSubmit={handleRegister} id="sign-up-form">
                    <label htmlFor="userName">Username</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <div className="userName-error"></div>

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="password-error"></div>

                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="email-error"></div>

                    <div className="color-inputs">
                        <label htmlFor="#fc5c65">#fc5c65</label>
                        <input
                            type="radio"
                            id="#fc5c65"
                            name="color"
                            value="#fc5c65"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#fd9644">#fd9644</label>
                        <input
                            type="radio"
                            id="#fd9644"
                            name="color"
                            value="#fd9644"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#fed330">#fed330</label>
                        <input
                            type="radio"
                            id="#fed330"
                            name="color"
                            value="#fed330"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#26de81">#26de81</label>
                        <input
                            type="radio"
                            id="#26de81"
                            name="color"
                            value="#26de81"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#2bcbba">#2bcbba</label>
                        <input
                            type="radio"
                            id="#2bcbba"
                            name="color"
                            value="#2bcbba"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#45aaf2">#45aaf2</label>
                        <input
                            type="radio"
                            id="#45aaf2"
                            name="color"
                            value="#45aaf2"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#4b7bec">#4b7bec</label>
                        <input
                            type="radio"
                            id="#4b7bec"
                            name="color"
                            value="#4b7bec"
                            onChange={(e) => setColor(e.target.value)} />
                        <label htmlFor="#a55eea">#a55eea</label>
                        <input
                            type="radio"
                            id="#a55eea"
                            name="color"
                            value="#a55eea"
                            onChange={(e) => setColor(e.target.value)} />
                    </div>
                    <div className="color-error"></div>

                    <div className="profilePic-inputs">
                        <label htmlFor="pic1">Pic 1</label>
                        <input
                            type="radio"
                            id="pic1"
                            name="profilePic"
                            value="pic1"
                            onChange={(e) => setProfilePic(e.target.value)} />
                        <label htmlFor="pic2">Pic 2</label>
                        <input
                            type="radio"
                            id="pic2"
                            name="profilePic"
                            value="pic2"
                            onChange={(e) => setProfilePic(e.target.value)} />
                        <label htmlFor="pic3">Pic 3</label>
                        <input
                            type="radio"
                            id="pic3"
                            name="profilePic"
                            value="pic3"
                            onChange={(e) => setProfilePic(e.target.value)} />
                    </div>
                    <div className="profilePic-error"></div>

                    <input type="submit" value="register" />
                </form>
            )}
        </>
    )
}

export default SignUp