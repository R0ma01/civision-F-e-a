import quebec_regions from '@/geojson/quebec_regions.json';
import { logoPalette } from '@/constants/color-palet';
import { MapType } from '@/components/enums/map-type-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import { CompanyInfo } from '@/components/interface/company';
import mapboxgl from 'mapbox-gl';
import { AuthMechanism } from 'mongodb';
import { RepertoireData } from '@/components/interface/repertoire-data';
import { mapColors } from '@/constants/color-palet';

function aggregateFournisseursByRegion(fournisseurs: Fournisseur[]) {
    const regionCounts: any = {};

    fournisseurs.forEach((fournisseur) => {
        fournisseur.secteurs_geographique.forEach((region: any) => {
            if (regionCounts[region]) {
                regionCounts[region] += 1;
            } else {
                regionCounts[region] = 1;
            }
        });
    });

    return regionCounts;
}

function createRegionFeatures(regionCounts: any, regionsGeoJSON: any) {
    const features: any = [];

    regionsGeoJSON.features.forEach((region: any) => {
        const regionName = region.properties.res_nm_reg;

        const count = regionCounts[regionName] || 0;

        if (count > 0) {
            features.push({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: region.geometry.center || [
                        -76.06832627558094, 48.0,
                    ],
                },
                properties: {
                    region: regionName,
                    count: count,
                },
            });
        }
    });

    return {
        type: 'FeatureCollection',
        features: features,
    };
}

function convertData(compagnies: CompanyInfo[]) {
    const features = compagnies
        .map((compagnie: CompanyInfo) => {
            if (
                compagnie.coordonnees?.latitude &&
                compagnie.coordonnees?.longitude
            ) {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [
                            compagnie.coordonnees.longitude,
                            compagnie.coordonnees.latitude,
                        ],
                    },
                    properties: {
                        weight: 0.5,
                        nom_entreprise: compagnie.nom_entreprise,
                        secteur_activite: compagnie.secteur_activite,
                        taille_entreprise: compagnie.taille_entreprise,
                        annee_fondation: compagnie.annee_fondation,
                        // adresse: compagnie.adresse,
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

function convertRepertoireData(compagnies: RepertoireData[]) {
    const features = compagnies
        .flatMap((compagnie: RepertoireData) => {
            if (compagnie.COORD && compagnie.NOM_ASSUJ) {
                return compagnie.NOM_ASSUJ.map((nom) => {
                    return {
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: compagnie.COORD,
                        },
                        properties: {
                            weight: 0.5,
                            nom_entreprise: nom,
                            description: compagnie.DESC_ACT_ECON_ASSUJ,
                            // taille_entreprise: compagnie.taille_entreprise,
                            // annee_fondation: compagnie.annee_fondation,
                            // adresse: compagnie.adresse,
                        },
                    };
                });
            }
            return null;
        })
        .filter((feature) => feature !== null);

    return {
        type: 'FeatureCollection',
        features: features.flat(), // Flatten the array of arrays
    };
}

export function populateMapLayers(
    mapRef: any,
    mapType: any,
    filteredFournisseurData: any,
    studyFilteredData: any,
    isDarkMode: any,
    hoveredStateId: any,
    repertoireFilteredData: any,
) {
    try {
        switch (mapType) {
            case MapType.PAGE_INFORMATION_ALBUM:
                //CLUSTERS DE COMPAGNIES POUR LE RÉPERTOIRE ET LES PAGES
                // Add companies source
                mapRef.current.addSource('compagnies', {
                    type: 'geojson',
                    data: convertData(studyFilteredData),
                    cluster: true,
                    clusterMaxZoom: 10,
                    clusterRadius: 100,
                });

                // Add clusters layer
                mapRef.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'compagnies',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            mapColors.colorValue1,
                            1,
                            mapColors.colorValue5,
                            5,
                            mapColors.colorValue15,
                            15,
                            mapColors.colorValue30,
                            30,
                            mapColors.colorValue50,
                            50,
                            mapColors.colorValue100,
                            100,
                            mapColors.colorValue250,
                            250,
                            mapColors.colorValue500,
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40,
                        ],
                    },
                });

                // Add cluster count layer
                mapRef.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'compagnies',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold',
                        ],
                        'text-size': 12,
                    },
                });

                // Add unclustered points layer
                mapRef.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'compagnies',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#fff',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#000',
                    },
                });

                // Popup for unclustered points
                mapRef.current.on('click', 'unclustered-point', (e: any) => {
                    const coordinates =
                        e.features[0].geometry.coordinates.slice();
                    const properties = e.features[0].properties;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(
                            `
            <strong>${properties.nom_entreprise}</strong><br>
            Secteur d'activité: ${properties.secteur_activite}<br>
            Taille de l'entreprise: ${properties.taille_entreprise}<br>
            Année de fondation: ${properties.annee_fondation}<br>
            Adresse: ${properties.adresse}
        `,
                        )
                        .addTo(mapRef.current);
                });

                // Zoom into clusters on click
                mapRef.current.on('click', 'clusters', (e: any) => {
                    const features = mapRef.current.queryRenderedFeatures(
                        e.point,
                        {
                            layers: ['clusters'],
                        },
                    );
                    const clusterId = features[0].properties.cluster_id;
                    mapRef.current
                        .getSource('compagnies')
                        .getClusterExpansionZoom(
                            clusterId,
                            (err: any, zoom: any) => {
                                if (err) return;

                                mapRef.current.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom,
                                });
                            },
                        );
                });

                mapRef.current.on('mouseenter', 'clusters', () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });
                mapRef.current.on('mouseleave', 'clusters', () => {
                    mapRef.current.getCanvas().style.cursor = '';
                });
                break;

            case MapType.FOURNISSEURS:
                //REGIONS POUR LES FOURNISSEURS
                mapRef.current.addSource('quebec-regions', {
                    type: 'geojson',
                    data: quebec_regions,
                });

                const regionCounts = aggregateFournisseursByRegion(
                    filteredFournisseurData,
                );
                const regionFeatures = createRegionFeatures(
                    regionCounts,
                    quebec_regions,
                );

                mapRef.current.addSource('fournisseurs-regions', {
                    type: 'geojson',
                    data: regionFeatures,
                    cluster: true,
                    clusterMaxZoom: 14,
                    clusterRadius: 50,
                });

                mapRef.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'fournisseurs-regions',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            mapColors.colorValue1,
                            1,
                            mapColors.colorValue5,
                            5,
                            mapColors.colorValue15,
                            10,
                            mapColors.colorValue30,
                            30,
                            mapColors.colorValue50,
                        ],
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            20,
                            100,
                            30,
                            750,
                            40,
                        ],
                    },
                });

                mapRef.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'fournisseurs-regions',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold',
                        ],
                        'text-size': 12,
                    },
                });

                mapRef.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'fournisseurs-regions',
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#11b4da',
                        'circle-radius': 4,
                        'circle-stroke-width': 1,
                        'circle-stroke-color': '#fff',
                    },
                });

                // Add region boundaries fill layer with conditional opacity
                mapRef.current.addLayer({
                    id: 'region-boundaries',
                    type: 'fill',
                    source: 'quebec-regions',
                    paint: {
                        'fill-color': logoPalette.custom_gray,
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            0.2,
                            0.05,
                        ],
                    },
                });

                // Add region boundaries outline layer
                mapRef.current.addLayer({
                    id: 'region-boundaries-outline',
                    type: 'line',
                    source: 'quebec-regions',
                    paint: {
                        'line-color': `${isDarkMode ? logoPalette.logo_light_blue : logoPalette.logo_dark_blue}`,
                        'line-width': 0.5,
                    },
                });

                // Add event listeners for hover effect
                mapRef.current.on('mouseenter', 'region-boundaries', () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });

                mapRef.current.on('mouseleave', 'region-boundaries', () => {
                    mapRef.current.getCanvas().style.cursor = '';
                    if (hoveredStateId.current !== null) {
                        mapRef.current.setFeatureState(
                            {
                                source: 'quebec-regions',
                                id: hoveredStateId.current,
                            },
                            { hover: false },
                        );
                    }
                    hoveredStateId.current = null;
                });

                mapRef.current.on(
                    'mousemove',
                    'region-boundaries',
                    (e: any) => {
                        if (e.features.length > 0) {
                            if (hoveredStateId.current !== null) {
                                mapRef.current.setFeatureState(
                                    {
                                        source: 'quebec-regions',
                                        id: hoveredStateId.current,
                                    },
                                    { hover: false },
                                );
                            }
                            hoveredStateId.current = e.features[0].id;
                            mapRef.current.setFeatureState(
                                {
                                    source: 'quebec-regions',
                                    id: hoveredStateId.current,
                                },
                                { hover: true },
                            );
                        }
                    },
                );
                break;

            case MapType.REPERTOIRE:
                mapRef.current.addSource('compagnies-repertoire', {
                    type: 'geojson',
                    data: convertRepertoireData(repertoireFilteredData),
                    cluster: true,
                    clusterMaxZoom: 14, // Adjust this value to control when clusters break apart
                    clusterRadius: 100, // Adjust this value for cluster size
                });

                // Add clusters layer
                mapRef.current.addLayer({
                    id: 'clusters',
                    type: 'circle',
                    source: 'compagnies-repertoire',
                    filter: ['has', 'point_count'],
                    paint: {
                        'circle-color': [
                            'step',
                            ['get', 'point_count'],
                            mapColors.colorValue1,
                            1,
                            mapColors.colorValue5,
                            5,
                            mapColors.colorValue15,
                            15,
                            mapColors.colorValue30,
                            50,
                            mapColors.colorValue50,
                            100,
                            mapColors.colorValue100,
                            250,
                            mapColors.colorValue250,
                            500,
                            mapColors.colorValue500,
                            1000,
                            mapColors.colorValue1000,
                            1500,
                            mapColors.colorValue1500,
                            2000,
                            mapColors.colorValue2000,
                            3000,
                            mapColors.colorValue3000,
                        ],
                        'circle-stroke-width': 0.5,
                        'circle-stroke-color': '#000',
                        'circle-radius': [
                            'step',
                            ['get', 'point_count'],
                            10, // Minimum radius
                            15, // Soft increase for small clusters
                            30,
                            50, // Soft increase for medium clusters
                            20,
                            100, // Larger increase for larger clusters
                            25,
                            500, // Gradual increase for very large clusters
                            30,
                            1000,
                            35,
                            3000,
                            40, // Maximum radius
                        ],
                    },
                });

                // Add cluster count layer
                mapRef.current.addLayer({
                    id: 'cluster-count',
                    type: 'symbol',
                    source: 'compagnies-repertoire',
                    filter: ['has', 'point_count'],
                    layout: {
                        'text-field': ['get', 'point_count_abbreviated'],
                        'text-font': [
                            'DIN Offc Pro Medium',
                            'Arial Unicode MS Bold',
                        ],
                        'text-size': 12,
                    },
                    paint: {
                        'text-color': [
                            'case',
                            ['>', ['get', 'point_count'], 500], // If point_count > 3000
                            '#ffffff', // Use white text color for clusters above 3000
                            '#000000', // Use black text color for all other clusters
                        ],
                    },
                });

                // Add unclustered points layer
                mapRef.current.addLayer({
                    id: 'unclustered-point',
                    type: 'circle',
                    source: 'compagnies-repertoire', // Use the same source as clusters
                    filter: ['!', ['has', 'point_count']],
                    paint: {
                        'circle-color': '#fff',
                        'circle-radius': 4,
                        'circle-stroke-width': 0.5,
                        'circle-stroke-color': '#000',
                    },
                });

                //Popup for unclustered points
                mapRef.current.on('click', 'unclustered-point', (e: any) => {
                    const coordinates =
                        e.features[0].geometry.coordinates.slice();
                    const properties = e.features[0].properties;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(
                            `
                    <strong>${properties.nom_entreprise}</strong><br>
                    Secteur d'activité: ${properties.description}<br>
                  
                `,
                        )
                        .addTo(mapRef.current);
                });

                // Zoom into clusters on click
                mapRef.current.on('click', 'clusters', (e: any) => {
                    const features = mapRef.current.queryRenderedFeatures(
                        e.point,
                        {
                            layers: ['clusters'],
                        },
                    );
                    const clusterId = features[0].properties.cluster_id;
                    mapRef.current
                        .getSource('compagnies-repertoire')
                        .getClusterExpansionZoom(
                            clusterId,
                            (err: any, zoom: any) => {
                                if (err) return;

                                mapRef.current.easeTo({
                                    center: features[0].geometry.coordinates,
                                    zoom: zoom,
                                });
                            },
                        );
                });

                // Change cursor when hovering over clusters
                mapRef.current.on('mouseenter', 'clusters', () => {
                    mapRef.current.getCanvas().style.cursor = 'pointer';
                });
                mapRef.current.on('mouseleave', 'clusters', () => {
                    mapRef.current.getCanvas().style.cursor = '';
                });
                break;

            default:
                break;
        }
    } catch (e) {
        console.error(e);
    }
}
