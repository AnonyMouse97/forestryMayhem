import React from "react"
import { useSelector } from "react-redux"

const ProfileBar = () => {
    const userData = useSelector((state) => state.userReducer)
    const img = `./public/img/profilePics/default/${userData[0].profilePic}`

    return (
        <div>
            <img className="ProfileBar-pic" src={img}></img>
            <h1>Username: {userData[0].userName}</h1>
            <p>Number of trees: {userData[0].trees.length}</p>
            <p>Number of logs: {userData[0].logs}</p>
        </div>
    )
}

export default ProfileBar
