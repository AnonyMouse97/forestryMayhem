import React, { useState } from 'react'
import Modal from 'react-modal'
import axios from 'axios'
import History from './History'
import Leaderboard from './Leaderboard'
import Rules from './Rules'

Modal.setAppElement('#root')

const Topbar = () => {
    const [isHistory, setHistory] = useState(false)
    const [historyInfos, setHistoryInfos] = useState("")
    const [isLeaderboard, setLeaderboard] = useState(false)
    const [isRules, setRules] = useState(false)

    const toggleModal = async (e) => {
        switch (e.target.id) {
            case "history":
                setHistory(true)
                await getHistoryInfos()
                break
            case "leaderboard":
                setLeaderboard(true)
                break
            case "rules":
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

    const getHistoryInfos = async () => {
        await axios({
            method: "get",
            url: `${process.env.API_URL}api/history/`,
            withCredentials: true
        })
            .then((res) => {
                setHistoryInfos(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <button id="history" onClick={toggleModal}>HISTORY</button>
            <button id="leaderboard" onClick={toggleModal}>LEADERBOARD</button>
            <button id="rules" onClick={toggleModal}>RULES</button>
            <Modal
                isOpen={isHistory}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>CLOSE</button>
                <History data={historyInfos} />
            </Modal>

            <Modal
                isOpen={isLeaderboard}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>CLOSE</button>
                <Leaderboard />
            </Modal>

            <Modal
                isOpen={isRules}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>CLOSE</button>
                <Rules />
            </Modal>

        </div>
    )
}

export default Topbar
