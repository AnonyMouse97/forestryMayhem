import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CustomPopup from './popup'
//require("dotenv").config();
//const { MAP_URL } = process.env;

import LeafletCanvasMarker from '../../hooks/canvas.hooks';

//https://api.mapbox.com/styles/v1/anonymouse97/ckp4eqckf01ij17ldyl6kz9iq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5vbnltb3VzZTk3IiwiYSI6ImNrcDRlbjQ5YTA2MHoycHF0bDZ3OGwzd2UifQ.Kes9Z4RYBRVOboBqFs1kEw
//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
const ViewMap = ({ data }) => {


    return (
        <div id="map">
            <MapContainer center={[50.632557, 5.579666]} zoom={17} minZoom={15} scrollWheelZoom={true}>
                <TileLayer
                    attribution='Map Data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> Imagery  &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/anonymouse97/ckp4eqckf01ij17ldyl6kz9iq/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYW5vbnltb3VzZTk3IiwiYSI6ImNrcDRlbjQ5YTA2MHoycHF0bDZ3OGwzd2UifQ.Kes9Z4RYBRVOboBqFs1kEw"
                />
                <LeafletCanvasMarker trees={data} />
            </MapContainer>
        </div >
    )
}

export default ViewMap;