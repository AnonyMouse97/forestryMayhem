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
                iconSize: [48, 48],
                iconAnchor: [24, 48],
                popupAnchor: [0, -48]
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