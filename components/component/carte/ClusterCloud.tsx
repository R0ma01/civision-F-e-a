import { useEffect, useState } from 'react';
import { clusterColors } from '@/constants/color-palet';
import { MapClusterPointData } from '@/components/interface/point-data';
import { GraphDataHttpRequestService } from '@/services/data-http-request-service';
import mapboxgl from 'mapbox-gl';

interface ClusterCloudProps {
    data: any[]; // GeoJSON data for regions
    map: any;
}

const ClusterCloud: React.FC<ClusterCloudProps> = ({ data, map }) => {
    const [clusterGeoJson, setClusterGeoJson] = useState<any>(null);

    useEffect(() => {
        if (!map || !data.length) return;
        function handleMapLoad() {
            const convertedData = convertClusterData(data);
            console.log(convertedData.features.length);
            setClusterGeoJson(convertedData);

            if (!map) return;
            if (!clusterGeoJson) return;

            if (
                typeof map.getSource === 'function' &&
                map.getSource('cluster-source')
            ) {
                if (map.getLayer('clusters')) {
                    map.removeLayer('clusters');
                }
                if (map.getLayer('cluster-count')) {
                    map.removeLayer('cluster-count');
                }
                if (map.getLayer('unclustered-point')) {
                    map.removeLayer('unclustered-point');
                }
                map.removeSource('cluster-source');
            }

            // Add source for clusters
            map.addSource('cluster-source', {
                type: 'geojson',
                data: clusterGeoJson,
                cluster: true,
                clusterMaxZoom: 14,
                clusterRadius: 100,
            });

            // Add cluster circles
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'cluster-source',
                filter: ['has', 'point_count'],
                paint: {
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        ...clusterColors,
                    ],
                    'circle-stroke-width': 0.5,
                    'circle-stroke-color': '#000',
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        10,
                        15,
                        30,
                        50,
                        20,
                        100,
                        25,
                        500,
                        30,
                        1000,
                        35,
                        3000,
                        40,
                    ],
                },
            });

            // Add cluster count labels
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'cluster-source',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': [
                        'DIN Offc Pro Medium',
                        'Arial Unicode MS Bold',
                    ],
                    'text-size': 12,
                },
                paint: {
                    'text-color': [
                        'case',
                        ['>', ['get', 'point_count'], 500],
                        '#ffffff', // Use white text color for larger clusters
                        '#000000', // Use black text color for smaller clusters
                    ],
                },
            });

            // Add unclustered points
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'cluster-source',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#fff',
                    'circle-radius': 4,
                    'circle-stroke-width': 0.5,
                    'circle-stroke-color': '#000',
                },
            });

            // Popup for unclustered points
            map.on('click', 'unclustered-point', async (e: any) => {
                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties;

                const point =
                    await GraphDataHttpRequestService.getEntrepriseInformation(
                        properties.id,
                    );

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(
                        `
                        <strong>${point.nom}</strong><br>
                        Secteur d'activité: ${point.secteur_activite}<br>
                        Taille Entreprise: ${point.taille_entreprise}<br>
                        Adresse: ${point.adresse}<br>
                    `,
                    )
                    .addTo(map);
            });

            // Zoom into clusters on click
            map.on('click', 'clusters', (e: any) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters'],
                });
                const clusterId = features[0].properties.cluster_id;
                (
                    map.getSource('cluster-source') as any
                ).getClusterExpansionZoom(clusterId, (err: any, zoom: any) => {
                    if (err) return;

                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom,
                    });
                });
            });

            // Change cursor when hovering over clusters
            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        }

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            if (map && handleMapLoad) {
                map.off('load', handleMapLoad);
            }
        };
    }, [data, map, clusterGeoJson]);

    return null;
};

export default ClusterCloud;

function convertClusterData(compagnies: MapClusterPointData[]) {
    const features = compagnies
        .map((compagnie: MapClusterPointData) => {
            if (compagnie.coords && compagnie.nom) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: compagnie.coords,
                    },
                    properties: {
                        weight: 0.5,
                        id: compagnie._id,
                    },
                };
            }
            return null;
        })
        .filter((feature) => feature !== null);

    return {
        type: 'FeatureCollection',
        features: features,
    };
}
