import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import CanvasMarkersLayer from 'react-leaflet-canvas-markers';
import CustomPopup from './popup'

import tree1 from '../../../public/img/trees/tree001.svg'
import tree2 from '../../../public/img/trees/tree002.svg'
import tree3 from '../../../public/img/trees/tree003.svg'
import tree4 from '../../../public/img/trees/tree004.svg'
import tree5 from '../../../public/img/trees/tree005.svg'
import tree6 from '../../../public/img/trees/tree006.svg'
import tree7 from '../../../public/img/trees/tree007.svg'
import tree8 from '../../../public/img/trees/tree008.svg'
import tree9 from '../../../public/img/trees/tree009.svg'
import tree10 from '../../../public/img/trees/tree010.svg'


const ViewMap = (data) => {

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
            <MapContainer center={[50.632557, 5.579666]} zoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='Map Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Imagery  &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/anonymouse97/ckp4eqckf01ij17ldyl6kz9iq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5vbnltb3VzZTk3IiwiYSI6ImNrcDRlbjQ5YTA2MHoycHF0bDZ3OGwzd2UifQ.Kes9Z4RYBRVOboBqFs1kEw"
                    minZoom={14}
                    maxZoom={21}
                    maxNativeZoom={18}
                />
                <MarkerClusterGroup>
                    {data.data.map(tree => (
                        <Marker
                            position={[tree.location.lat, tree.location.lon]}
                            key={tree._id}
                            id={tree._id}
                            icon={treeIcon()}
                        >
                            <CustomPopup id={tree._id} />
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div >
    )
}

export default ViewMap;
