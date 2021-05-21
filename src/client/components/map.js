import React, { useState } from 'react'
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import tree1 from '../../public/img/trees/tree001.svg'
import tree2 from '../../public/img/trees/tree002.svg'
import tree3 from '../../public/img/trees/tree003.svg'
import tree4 from '../../public/img/trees/tree004.svg'
import tree5 from '../../public/img/trees/tree005.svg'
import tree6 from '../../public/img/trees/tree006.svg'
import tree7 from '../../public/img/trees/tree007.svg'
import tree8 from '../../public/img/trees/tree008.svg'
import tree9 from '../../public/img/trees/tree009.svg'
import tree10 from '../../public/img/trees/tree010.svg'


const ViewMap = (data) => {
    const [test, setTest] = useState('')

    const handleClick = async (id) => {
        await axios.get(`${process.env.API_URL}api/tree/${id}`)
            .then((res) => {
                setTest(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const treeIcon = () => {
        const allIcons = [tree1, tree2, tree3, tree4, tree5, tree6, tree7, tree8, tree9, tree10]
        const svg = allIcons[Math.floor(Math.random() * allIcons.length)];
        const leafletIcon = L.icon({
            iconUrl: svg,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32]
        });
        return leafletIcon;
    };

    return (
        <div id="map">
            <MapContainer center={[50.632557, 5.579666]} zoom={15} minZoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {data.data.map(tree => (
                        <Marker
                            position={[tree.location.lat, tree.location.lon]}
                            key={tree._id}
                            id={tree._id}
                            icon={treeIcon()}
                            eventHandlers={{
                                click: (e) => {
                                    handleClick(e.target.options.id)
                                },
                            }}
                        >
                            <Popup>
                                {test != '' ? test : "coucou"}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div >
    )
}

export default ViewMap;
