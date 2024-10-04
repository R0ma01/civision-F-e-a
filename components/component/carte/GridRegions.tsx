import { useEffect, useRef, useState } from 'react';
import qc_regions from '@/geojson/quebec_regions.json';
import useGlobalFilterStore from '@/stores/global-filter-store';

interface ChloroplethProps {
    map: any;
    mapGrid: boolean;
    filterFunction: (mrc_idu: number) => void;
}

// export default RegionGrid;
const RegionGrid: React.FC<ChloroplethProps> = ({
    map,
    mapGrid,
    filterFunction,
}) => {
    const hoveredRegionIdRef = useRef<number[]>([]); // Array of highlighted region IDs
    const matchStage = useGlobalFilterStore((state) => state.matchStage);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (!map || !loaded) return;
        const newFilters: number[] = [];
        const mrc_match = matchStage['REG_IDU'];
        if (mrc_match) {
            if (mrc_match.$in) {
                mrc_match.$in.forEach((value: string) => {
                    newFilters.push(parseInt(value, 10));
                });
            }
        }

        hoveredRegionIdRef.current = newFilters;
        if (map.getLayer('region-outline')) {
            map.setPaintProperty('region-outline', 'line-color', [
                'case',
                [
                    'in',
                    ['get', 'regio_s_id'],
                    ['literal', hoveredRegionIdRef.current],
                ],
                '#FFCC00', // Highlight color for selected regions
                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
            ]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchStage, map]);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            // Check if the source already exists
            if (!mapGrid) {
                if (!map.getSource('gridRegion-source')) {
                    // Add GeoJSON source
                    map.addSource('gridRegion-source', {
                        type: 'geojson',
                        data: qc_regions,
                    });
                    map.addLayer({
                        id: 'regions-outlines',
                        type: 'line', // Use 'line' to display outlines
                        source: 'gridRegion-source',
                        paint: {
                            'line-color': '#FFF', // White outlines
                            'line-width': 0.5,
                        },
                    });
                    // Add a line layer to show MRC outlines
                    map.addLayer({
                        id: 'region-outline',
                        type: 'line',
                        source: 'gridRegion-source',
                        paint: {
                            'line-color': [
                                'case',
                                [
                                    'in',
                                    ['get', 'regio_s_id'],
                                    ['literal', hoveredRegionIdRef.current],
                                ],
                                '#FFCC00', // Highlight color for selected regions
                                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
                            ],
                            'line-width': 3, // Width of the outline
                        },
                    });

                    map.addLayer({
                        id: 'region-fill',
                        type: 'fill', // Use 'line' to display outlines
                        source: 'gridRegion-source',
                        paint: {
                            'fill-color': 'rgba(0, 0, 0, 0)', // Transparent fill
                        },
                    });

                    // Add click event listener for mrc-fill
                    map.on('click', 'region-fill', (e: any) => {
                        if (e.features.length > 0) {
                            const clickedRegionId =
                                e.features[0].properties.regio_s_id;

                            // Toggle clicked region in the hoveredRegionIdRef array
                            if (
                                hoveredRegionIdRef.current.includes(
                                    clickedRegionId,
                                )
                            ) {
                                hoveredRegionIdRef.current =
                                    hoveredRegionIdRef.current.filter(
                                        (id) => id !== clickedRegionId,
                                    );
                            } else {
                                hoveredRegionIdRef.current = [
                                    ...hoveredRegionIdRef.current,
                                    clickedRegionId,
                                ];
                            }

                            // Update the line color to reflect the selected regions

                            filterFunction(clickedRegionId ?? 0);
                        }
                    });
                } else {
                    // Update the existing source if it already exists
                    (map.getSource('gridRegion-source') as any).setData(
                        qc_regions,
                    );
                }
                setLoaded(true);
            } else {
                if (!loaded) return;
                if (map.getLayer('region-outline'))
                    map.removeLayer('region-outline');
                if (map.getLayer('region-fill')) map.removeLayer('region-fill');
                if (map.getLayer('regions-outlines'))
                    map.removeLayer('regions-outlines');
                if (map.getSource('gridRegion-source'))
                    map.removeSource('gridRegion-source');
                setLoaded(false);
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            map.off('load', handleMapLoad);
            if (loaded) {
                if (map.getLayer('region-outline'))
                    map.removeLayer('region-outline');
                if (map.getLayer('region-fill')) map.removeLayer('region-fill');
                if (map.getLayer('region-outlines'))
                    map.removeLayer('region-outlines');
                if (map.getSource('gridRegion-source'))
                    map.removeSource('gridRegion-source');
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, mapGrid]);

    return null;
};

export default RegionGrid;
