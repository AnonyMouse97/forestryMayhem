import React, { useState } from 'react'
import axios from 'axios'

const History = (props) => {


    return (
        <div>
            <button id="close" onClick={props.closeModal}>CLOSE</button>
            <h2>History</h2>
            <ul>
                <li>coucou</li>
                {/* {data.map((element) => {
                    getUser(element.userId)
                    return <li key={element._id}>{user} {element.action == "Buy" ? "bought" : "Lock" ? "locked" : "lost"} a tree</li>
                })} */}
            </ul>
        </div>
    )
}

export default History
