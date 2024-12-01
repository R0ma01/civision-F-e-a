import { useEffect, useRef, useState } from 'react';

import qcMunis from '@/geojson/qc_munics2.json';
import useGlobalFilterStore from '@/stores/global-filter-store';

interface ChloroplethProps {
    map: any;
    mapGrid: string;
    filterFunction: (muni_idu: number) => void;
}

const MuniGrid: React.FC<ChloroplethProps> = ({
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
        const muni_match = matchStage['MUNIC_IDU'];
        if (muni_match) {
            if (muni_match.$in) {
                muni_match.$in.forEach((value: number) => {
                    newFilters.push(value);
                });
            }
        }

        hoveredRegionIdRef.current = newFilters;
        if (map.getLayer('muni-outline'))
            map.setPaintProperty('muni-outline', 'line-color', [
                'case',
                [
                    'in',
                    ['get', 'SDRIDU'],
                    ['literal', hoveredRegionIdRef.current],
                ],
                '#FFCC00', // Highlight color for selected regions
                'rgba(0, 0, 0, 0)', // Transparent for unselected regions
            ]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchStage, map]);

    useEffect(() => {
        if (!map) return;

        const handleMapLoad = () => {
            // Check if the source already exists
            if (mapGrid === 'muni') {
                if (!map.getSource('gridMuni-source')) {
                    // Add GeoJSON source
                    map.addSource('gridMuni-source', {
                        type: 'geojson',
                        data: qcMunis,
                    });

                    // Add a line layer to show MRC outlines
                    map.addLayer({
                        id: 'muni-outlines',
                        type: 'line', // Use 'line' to display outlines
                        source: 'gridMuni-source',
                        paint: {
                            'line-color': '#FFF', // White outlines
                            'line-width': 0.5,
                        },
                    });

                    map.addLayer({
                        id: 'muni-fill',
                        type: 'fill', // Use 'line' to display outlines
                        source: 'gridMuni-source',
                        paint: {
                            'fill-color': 'rgba(0, 0, 0, 0)', // Transparent fill
                        },
                    });

                    map.addLayer({
                        id: 'muni-outline',
                        type: 'line',
                        source: 'gridMuni-source',
                        paint: {
                            'line-color': [
                                'case',
                                [
                                    'in',
                                    ['get', 'SDRIDU'],
                                    ['literal', hoveredRegionIdRef.current],
                                ],
                                '#FFCC00', // Highlight color for hovered regions
                                'rgba(0, 0, 0, 0)', // Transparent when not hovered
                            ],
                            'line-width': 3, // Width of the outline
                        },
                    });

                    // Add click event listener for muni-fill
                    map.on('click', 'muni-fill', (e: any) => {
                        if (e.features.length > 0) {
                            const clickedRegionId =
                                e.features[0].properties.SDRIDU;

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

                            filterFunction(clickedRegionId ?? 0);
                        }
                    });
                } else {
                    // Update the existing source if it already exists
                    (map.getSource('gridMuni-source') as any).setData(qcMunis);
                }
                setLoaded(true);
            } else {
                if (!loaded) return;
                if (map.getLayer('muni-outline'))
                    map.removeLayer('muni-outline');
                if (map.getLayer('muni-fill')) map.removeLayer('muni-fill');
                if (map.getLayer('muni-outlines'))
                    map.removeLayer('muni-outlines');
                if (map.getSource('gridMuni-source'))
                    map.removeSource('gridMuni-source');
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
                if (map.getLayer('muni-outline'))
                    map.removeLayer('muni-outline');
                if (map.getLayer('muni-fill')) map.removeLayer('muni-fill');
                if (map.getLayer('muni-outlines'))
                    map.removeLayer('muni-outlines');
                if (map.getSource('gridMuni-source'))
                    map.removeSource('gridMuni-source');
            }
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, mapGrid]);

    return null;
};

export default MuniGrid;
