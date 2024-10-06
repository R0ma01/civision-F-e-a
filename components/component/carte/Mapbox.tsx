import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import useMapStore from '@/stores/global-map-store';
import { html_object_constants } from '@/constants/constants';

const MapBox = () => {
    const { mapType, setMap, point } = useMapStore((state) => {
        return {
            mapType: state.mapType,
            setMap: state.setMap,
            point: state.point,
        };
    });

    const mapContainerRef: any = useRef(null);
    const mapRef: any = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleDarkModeChange = (e: any) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleDarkModeChange);

        return () =>
            darkModeQuery.removeEventListener('change', handleDarkModeChange);
    }, []);

    useEffect(() => {
        mapboxgl.accessToken =
            process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';
        if (!mapRef.current) {
            mapRef.current = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: isDarkMode
                    ? 'mapbox://styles/mapbox/dark-v11'
                    : 'mapbox://styles/francisdomonte/clw9fq5b800j501nx042lhkwk/draft',
                center: [-76.06832627558094, 48.0],
                zoom: 5,
            });

            mapRef.current.on('load', () => {
                setMap(mapRef.current);
            });
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDarkMode, mapType]);

    useEffect(() => {
        if (point && mapRef.current) {
            mapRef.current.flyTo({
                center: [
                    point.geometry.coordinates[0] +
                        html_object_constants.offset,
                    point.geometry.coordinates[1],
                ],
                zoom: 12,
                speed: 0.9,
                essential: true,
            });

            new mapboxgl.Popup()
                .setLngLat(point.geometry.coordinates)
                .setHTML(popUpHTML(point))
                .addTo(mapRef.current);
        }
    }, [point]);

    return <div id="map" ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapBox;

function popUpHTML(content: any) {
    return `
        <div class="flex flex-col">
            <p class="px-2 py-1 border border-none rounded-full bg-logo-green text-white text-center font-bold">
                $${content.properties.nom}
            </p>
            <p class="font-bold text-logo-dark-blue">
                Secteur d&lsquo;activité:
            </p>
            <p>$${content.properties.secteur_activite}</p>
            <p class="font-bold text-logo-dark-blue">
                Taille de l&lsquo;entreprise:
            </p>
            <p>$${content.properties.taille_entreprise}</p>
            <p class="font-bold text-logo-dark-blue">Adresse: </p>
            <p>$${content.properties.adresse}</p>
        </div>
    `;
}
