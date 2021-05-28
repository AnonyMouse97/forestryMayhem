import React from 'react'

const Rules = (props) => {
    return (
        <div>
            <button id="close" onClick={props.closeModal}>CLOSE</button>
            <h2>Rules</h2>
        </div>
    )
}

export default Rules