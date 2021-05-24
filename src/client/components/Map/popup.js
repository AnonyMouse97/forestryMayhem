import React, { useState } from 'react'
import { Popup } from 'react-leaflet'
import axios from 'axios'

const CustomPopup = ({ id }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [species, setSpecies] = useState("")
    const [name, setName] = useState("")
    const [wikiLink, setWikiLink] = useState("")
    const [currentOwner, setCurrentOwner] = useState("")
    const [value, setValue] = useState("")
    const [isLocked, setIsLocked] = useState(false)
    const [lockValue, setLockValue] = useState("")
    const [pastOwners, setPastOwners] = useState("")
    const [comments, setComments] = useState("")

    const fetchOwner = (ownerId) => {
        axios.get(`${process.env.API_URL}api/user/${ownerId}`)
            .then(res => {
                setCurrentOwner(res.data[0].userName)
                setIsLoaded(true)
            }).catch(err => {
                console.log(err)
            })

    }

    const handleOpen = () => {
        axios.get(`${process.env.API_URL}api/tree/${id}`)
            .then(res => {

                setSpecies(res.data.treeSpecies)
                setName(res.data.treeName)
                setWikiLink(res.data.wikilink)
                setValue(res.data.value)
                setIsLocked(res.data.locked)
                setLockValue(res.data.lockPrice)
                setPastOwners(res.data.pastOwners)
                setComments(res.data.comments)

                if (res.data.currentOwner == "") {
                    setIsLoaded(true)
                } else {
                    fetchOwner(res.data.currentOwner)
                }
            }).catch(err => {
                console.log(err)
            })
    }

    const handleClose = () => {
        setIsLoaded(false)
    }

    return (
        <Popup onOpen={handleOpen} onClose={handleClose}>
            {!isLoaded ?
                <div className="Popup-loading">
                    <p>loading...</p>
                </div>
                : (
                    <div className="Popup">
                        <h2>{species == null ? "Species undetermined" : species}</h2>
                        <div className="Popup-tree-infos">
                            <a href={wikiLink} target="_blank" rel="noreferrer noopener">Wanna know more about this tree ?</a>
                            <h4>Name: {name}</h4>
                            <p>{currentOwner != "" ? `Owner: ${currentOwner}` : "This tree has no owner!"}</p>
                            <button>{currentOwner != "" ? `Steal this tree to ${currentOwner} for ${value} £ogs` : `Buy this tree for ${value} £ogs`}</button>
                        </div>
                    </div>)}
        </Popup>
    )
}

export default CustomPopup
