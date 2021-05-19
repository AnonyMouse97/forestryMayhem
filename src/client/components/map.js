import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ViewMap = () => (
    <div id="map">
        <MapContainer center={[50.632557, 5.579666]} zoom={15} minZoom={14} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[50.632557, 5.579666]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    </div >
);

export default ViewMap;
