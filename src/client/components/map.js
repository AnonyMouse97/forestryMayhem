import axios from "axios";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

const ViewMap = (data) => {
    return (
        <div id="map">
            <MapContainer center={[50.632557, 5.579666]} zoom={15} minZoom={14} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup>
                    {data.data.map(tree => (
                        <Marker position={[tree.location.lat, tree.location.lon]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </div >
    )
}

export default ViewMap;
