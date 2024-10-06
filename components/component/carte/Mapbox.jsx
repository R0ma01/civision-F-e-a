import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGlobalDataStore from '@/stores/global-data-store';
import useMapStore from '@/stores/global-map-store';
import constants from '@/constants/constants';
const MapBox = () => {
    const { mapType, setMap } = useMapStore((state) => {
        return { mapType: state.mapType, setMap: state.setMap };
    });
    const { point } = useMapStore();
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(darkModeQuery.matches);

        const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener('change', handleDarkModeChange);

        return () =>
            darkModeQuery.removeEventListener('change', handleDarkModeChange);
    }, []);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
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
                    point.geometry.coordinates[0] + constants.offset,
                    point.geometry.coordinates[1],
                ],
                zoom: 12,
                speed: 0.9,
                essential: true,
            });

            new mapboxgl.Popup()
                .setLngLat(point.geometry.coordinates)
                .setHTML(
                    `
                    ${popUpHTML(point)}
                `,
                )
                .addTo(mapRef.current);
        }
    }, [point]);

    return <div id="map" ref={mapContainerRef} style={{ height: '100%' }} />;
};

export default MapBox;

function popUpHTML(content) {
    return (
        <div className="flex flex-col">
            <p className="px-2 py-1 border border-none rounded-full bg-logo-green text-white text-center font-bold">
                ${content.properties.nom_entreprise}
            </p>
            <p className="font-bold text-logo-dark-blue">
                Secteur d&lsquo;activité:
            </p>
            <p>${content.properties.secteur_activite}</p>
            <p className="font-bold text-logo-dark-blue">
                Taille de l&lsquo;entreprise:
            </p>
            <p>${content.properties.taille_entreprise}</p>
            <p className="font-bold text-logo-dark-blue">Année de fondation:</p>
            <p>${content.properties.annee_fondation}</p>
            <p className="font-bold text-logo-dark-blue">Adresse: </p>
            <p>${content.properties.adresse}</p>
        </div>
    );
}
