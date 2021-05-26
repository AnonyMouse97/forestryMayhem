import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-canvas-marker";
import CustomPopup from "../components/Map/popup";
import L from "leaflet";

import tree1 from '../../public/img/trees/tree001.svg';
import tree2 from '../../public/img/trees/tree002.svg';
import tree3 from '../../public/img/trees/tree003.svg';
import tree4 from '../../public/img/trees/tree004.svg';
import tree5 from '../../public/img/trees/tree005.svg';
import tree6 from '../../public/img/trees/tree006.svg';
import tree7 from '../../public/img/trees/tree007.svg';
import tree8 from '../../public/img/trees/tree008.svg';
import tree9 from '../../public/img/trees/tree009.svg';
import tree10 from '../../public/img/trees/tree010.svg';

export default function LeafletCanvasMarker({ trees }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;


        let ciLayer = L.canvasIconLayer({}).addTo(map);

        ciLayer.addOnClickListener(function (e, data) {
            console.log(trees.length);
        });

        /* ciLayer.addOnHoverListener(function (e, data) {
            console.log(data[0].data._leaflet_id);
        }); */

        const treeIcon = () => {
            const allIcons = [tree1, tree2, tree3, tree4, tree5, tree6, tree7, tree8, tree9, tree10]

            const svg = allIcons[Math.floor(Math.random() * allIcons.length)];

            return svg;
        };

        let markers = [];

        for (let tree of trees) {

            let id = tree._id;

            let icon = L.icon({
                iconUrl: treeIcon(),
                iconSize: [24, 24],
                iconAnchor: [12, 24],
                popupAnchor: [0, -24]
            });

            let marker = L.marker(
                [tree.location.lat, tree.location.lon],
                { icon: icon }
            ).bindPopup(id);

            markers.push(marker);
        }

        ciLayer.addLayers(markers);

    }, [map]);

    return null;
}



/* var centerOfUSALatLong = [37.09024, -95.712891];    // center of USA (lat,long)
var zoomLevelShowingUSA = 4;

var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});


var latlng = L.latLng(centerOfUSALatLong[0], centerOfUSALatLong[1]);


var southWest = L.latLng(0, -180),

    northEast = L.latLng(60.239, -43.945),  // bottom of greenland

    bounds = L.latLngBounds(southWest, northEast);

var map = L.map('map', {center: latlng,
    zoom: zoomLevelShowingUSA,
    minZoom: zoomLevelShowingUSA-1,
    maxBounds: bounds,
    layers: [tiles]
});

var markers = L.markerClusterGroup();

function populate() {
    for (var i = 0; i < 10; i++) {
        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        var lngSpan = northEast.lng - southWest.lng;
        var latSpan = northEast.lat - southWest.lat;
        var latR = southWest.lat + latSpan * Math.random();
        var lngR = southWest.lng + lngSpan * Math.random();

        var myIcon = L.divIcon({
            iconSize: new L.Point(50, 50),
            html: String(i)
        });

        var m = L.marker(L.latLng(latR,lngR), {icon: myIcon});
        markers.addLayer(m);
    }
    return false;
}

var MyLayer = L.CanvasLayer.extend({
    render: function() {
        var canvas = this.getCanvas();
        var ctx = canvas.getContext('2d');
        // render
    }
});
// create and add to the map
var layer = new MyLayer();
layer.addTo(map);

populate();
map.addLayer(markers); */