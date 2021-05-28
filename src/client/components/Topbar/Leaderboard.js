import React, { useState } from 'react'
import axios from 'axios'
import { set } from 'mongoose'

const Leaderboard = (props) => {
    console.log(props.default)

    const [isLogs, setIsLogs] = useState(true)
    const [logs, setLogs] = useState("")
    const [isTrees, setIsTrees] = useState(false)
    const [trees, setTrees] = useState("")
    const [isSpecies, setIsSpecies] = useState(false)
    const [species, setSpecies] = useState("")

    const toggleHistory = async (e) => {
        switch (e.target.id) {
            case "logs":
                setIsLogs(true)
                setIsTrees(false)
                setIsSpecies(false)
                await getLogs()
                break
            case "trees":
                setIsLogs(false)
                setIsTrees(true)
                setIsSpecies(false)
                break
            case "species":
                setIsLogs(false)
                setIsTrees(false)
                setIsSpecies(true)
                break
            default: return
        }
    }

    const getLogs = async () => {

        await axios({
            method: "get",
            url: `${process.env.API_URL}api/leaderboard/logs`,
            withCredentials: true
        })
            .then((res) => {
                setLogs(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <button id="close" onClick={props.closeModal}>CLOSE</button>

            <h2>Leaderboard</h2>
            <button id="logs" onClick={toggleHistory}>LOGS</button>
            <button id="trees" onClick={toggleHistory}>TREES</button>
            <button id="species" onClick={toggleHistory}>SPECIES</button>

            {isLogs &&
                <div>
                    foo
                </div>}
            {isTrees && <div>bar</div>}
            {isSpecies && <div>baz</div>}

        </div>
    )
}

export default Leaderboard
