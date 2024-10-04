import { useEffect, useState, useMemo } from 'react';
import quebec_regions from '@/geojson/quebec_regions.json';
import { choroplethColors } from '@/constants/color-palet';
import { AlbumDataFields } from '@/components/enums/data-types-enum';
import { GraphTextService } from '@/services/translations';
import useGlobalFilterStore from '@/stores/global-filter-store';
import { MapRegions } from '@/components/enums/map-regions';
import { MapType } from '@/components/enums/map-type-enum';

interface ChloroplethProps {
    data: any[]; // GeoJSON data for regions
    regionField: string;
    dataField: string; // Field in the GeoJSON properties to base the color on
    map: any;
    mapType: MapType;
    filterFunction: (region: any) => void;
}

const Chloropleth: React.FC<ChloroplethProps> = ({
    data,
    dataField,
    regionField,
    map,
    mapType,
    filterFunction,
}) => {
    const [hoveredRegionIds, setHoveredRegionIds] = useState<string[]>([]); // Store region IDs in state
    const matchStage = useGlobalFilterStore((state) => state.matchStage);

    // Memoized function to create region features based on data
    const regionFeatures = useMemo(() => {
        const newRegionCounts: Record<string, number> = newRegionCount();

        data.forEach((item: any) => {
            newRegionCounts[item.region] = item.count;
        });

        return createRegionFeatures(newRegionCounts, quebec_regions);
    }, [data]);

    // Update hoveredRegionIds based on matchStage
    useEffect(() => {
        if (!map) return;

        const mapEntries = Array.from(MapRegions.get(mapType)?.entries() || []);

        const newFilters: string[] = [];
        const mrc_match = matchStage[AlbumDataFields.COORDONNES_REGION];
        if (mrc_match?.$in) {
            mrc_match.$in.map((region: string) => {
                if (mapEntries) {
                    const foundRegion = mapEntries.find(
                        (reg) => reg[0] === region,
                    );

                    if (foundRegion) {
                        newFilters.push(foundRegion[1].toString()); // Safely push the first element
                    }
                }
            });
        }

        setHoveredRegionIds(newFilters); // Update the state instead of ref

        // Update hover layer to highlight selected regions
        if (map.getLayer('chloropleth-hover-layer')) {
            map.setPaintProperty('chloropleth-hover-layer', 'line-color', [
                'case',
                ['in', ['get', 'region'], ['literal', newFilters]],
                '#FFCC00', // Highlight color for selected regions
                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
            ]);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchStage, map]);

    // Handle map loading and setting up layers
    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            const source = map.getSource('chloropleth-source');
            if (source) {
                (source as any).setData(regionFeatures);
            } else {
                map.addSource('chloropleth-source', {
                    type: 'geojson',
                    data: regionFeatures,
                });

                map.addLayer({
                    id: 'chloropleth-layer',
                    type: 'fill',
                    source: 'chloropleth-source',
                    paint: {
                        'fill-color': [
                            'interpolate',
                            ['linear'],
                            ['get', dataField],
                            ...choroplethColors,
                        ],
                        'fill-opacity': 0.45,
                    },
                });

                map.addLayer({
                    id: 'chloropleth-outline-layer',
                    type: 'line',
                    source: 'chloropleth-source',
                    paint: {
                        'line-color': '#000',
                        'line-width': 0.5,
                    },
                });

                map.addLayer({
                    id: 'chloropleth-hover-layer',
                    type: 'line',
                    source: 'chloropleth-source',
                    paint: {
                        'line-color': [
                            'case',
                            [
                                'in',
                                ['get', 'region'],
                                ['literal', hoveredRegionIds],
                            ],
                            '#FFCC00',
                            'rgba(0, 0, 0, 0)',
                        ],
                        'line-width': 2,
                    },
                });

                // Add click event listener for chloropleth-layer
                map.on('click', 'chloropleth-layer', (e: any) => {
                    if (e.features.length > 0) {
                        const clickedRegionId = e.features[0].properties.region;

                        setHoveredRegionIds((prevIds) =>
                            prevIds.includes(clickedRegionId)
                                ? prevIds.filter((id) => id !== clickedRegionId)
                                : [...prevIds, clickedRegionId],
                        );

                        filterFunction(clickedRegionId ?? null);
                    }
                });
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            if (map) {
                map.off('load', handleMapLoad);
            }
        };
    }, [map, regionFeatures, dataField, hoveredRegionIds, filterFunction]);

    return null;
};

export default Chloropleth;

function createRegionFeatures(
    regionCounts: Record<string, number>,
    regionsGeoJSON: any,
) {
    return {
        type: 'FeatureCollection',
        features: regionsGeoJSON.features.map((region: any) => ({
            type: 'Feature',
            geometry: region.geometry,
            properties: {
                region: region.properties.res_nm_reg,
                count: regionCounts[region.properties.res_nm_reg] || 0,
            },
        })),
    };
}

function newRegionCount() {
    const regions = GraphTextService.getKeys(AlbumDataFields.COORDONNES_REGION);

    const newRegionCounts: Record<string, number> = {};
    regions?.forEach((region) => (newRegionCounts[region] = 0));

    return newRegionCounts;
}
