import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CustomPopup from './popup'

import LeafletCanvasMarker from '../../hooks/canvas.hooks';


const ViewMap = ({ data }) => {

    return (
        <div id="map">
            <MapContainer center={[50.632557, 5.579666]} zoom={17} minZoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LeafletCanvasMarker trees={data} />
            </MapContainer>
        </div >
    )
}

export default ViewMap;