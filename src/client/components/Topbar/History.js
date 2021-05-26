import React from 'react'

const History = ({ data }) => {
    console.log(data)
    return (
        <div>
            {data.map((test) => {
                <p>{test.action}</p>
            })}
        </div>
    )
}

export default History
