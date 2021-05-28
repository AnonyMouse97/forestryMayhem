import React, { useState } from 'react'
import axios from 'axios'
import History from './History'
import Leaderboard from './Leaderboard'
import Rules from './Rules'


const Topbar = () => {
    const [isHistory, setHistory] = useState(false)
    const [leaderDefault, setLeaderDefault] = useState("")
    const [isLeaderboard, setLeaderboard] = useState(false)
    const [isRules, setRules] = useState(false)

    const toggleModal = async (e) => {
        switch (e.target.id) {
            case "history":
                setHistory(true)
                setLeaderboard(false)
                setRules(false)
                break
            case "leaderboard":
                await getDefaultLeaderboard()
                setHistory(false)
                setLeaderboard(true)
                setRules(false)
                break
            case "rules":
                setHistory(false)
                setLeaderboard(false)
                setRules(true)
                break
            default: return
        }
    }

    const closeModal = () => {
        setHistory(false)
        setLeaderboard(false)
        setRules(false)
    }

    // const getHistoryInfos = async () => {

    //     await axios({
    //         method: "get",
    //         url: `${process.env.API_URL}api/history/`,
    //         withCredentials: true
    //     })
    //         .then((res) => {
    //             setHistoryInfos(res.data)
    //         })
    //         .catch((err) => console.log(err))
    // }

    const getDefaultLeaderboard = async () => {

        await axios({
            method: "get",
            url: `${process.env.API_URL}api/leaderboard/logs`,
            withCredentials: true
        })
            .then((res) => {
                setLeaderDefault(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <button id="history" onClick={toggleModal}>HISTORY</button>
            <button id="leaderboard" onClick={toggleModal}>LEADERBOARD</button>
            <button id="rules" onClick={toggleModal}>RULES</button>

            {isHistory && <History closeModal={closeModal} />}
            {isLeaderboard && <Leaderboard closeModal={closeModal} default={leaderDefault} />}
            {isRules && <Rules closeModal={closeModal} />}
        </div>
    )
}

export default Topbar
