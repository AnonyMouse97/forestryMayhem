import React, { useEffect, useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { UidContext } from "./components/AppContext"
import Routes from "./components/routes"
import { getUser } from "./actions/user.actions"

const App = () => {
    const [uid, setUid] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchToken = async () => {

            await axios({
                method: "get",
                url: `${process.env.API_URL}jwtid`,
                withCredentials: true
            })
                .then((res) => {
                    setUid(res.data)
                })
                .catch((err) => console.log(err))
        }
        fetchToken()

        if (uid) {
            dispatch(getUser(uid))
        }
    }, [uid])

    return (
        <div>
            <UidContext.Provider value={uid}>
                <Routes />
            </UidContext.Provider>
        </div>
    )
}

export default App
