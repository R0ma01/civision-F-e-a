import { useEffect, useRef } from 'react';

import qcMrcs from '@/geojson/qc_mrcs2.json';
import useGlobalFilterStore from '@/stores/global-filter-store';

interface ChloroplethProps {
    map: any;
    mapGrid: boolean;
    filterFunction: (mrc_idu: number) => void;
}

const MrcGrid: React.FC<ChloroplethProps> = ({
    map,
    mapGrid,
    filterFunction,
}) => {
    const hoveredRegionIdRef = useRef<number[]>([]); // Array of highlighted region IDs
    const matchStage = useGlobalFilterStore((state) => state.matchStage);
    useEffect(() => {
        if (!map) return;
        const newFilters: number[] = [];
        const mrc_match = matchStage['MRC_IDU'];
        if (mrc_match) {
            if (mrc_match.$in) {
                mrc_match.$in.forEach((value: number) => {
                    newFilters.push(value);
                });
            }
        }

        hoveredRegionIdRef.current = newFilters;
        if (map.getLayer('mrc-outline'))
            map.setPaintProperty('mrc-outline', 'line-color', [
                'case',
                [
                    'in',
                    ['get', 'DRIDU'],
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
            if (mapGrid) {
                if (!map.getSource('gridMrc-source')) {
                    // Add GeoJSON source
                    map.addSource('gridMrc-source', {
                        type: 'geojson',
                        data: qcMrcs,
                    });

                    // Add a line layer to show MRC outlines
                    map.addLayer({
                        id: 'mrc-outlines',
                        type: 'line', // Use 'line' to display outlines
                        source: 'gridMrc-source',
                        paint: {
                            'line-color': '#FFF', // White outlines
                            'line-width': 0.5,
                        },
                    });

                    map.addLayer({
                        id: 'mrc-fill',
                        type: 'fill', // Use 'line' to display outlines
                        source: 'gridMrc-source',
                        paint: {
                            'fill-color': 'rgba(0, 0, 0, 0)', // Transparent fill
                        },
                    });

                    map.addLayer({
                        id: 'mrc-outline',
                        type: 'line',
                        source: 'gridMrc-source',
                        paint: {
                            'line-color': [
                                'case',
                                [
                                    'in',
                                    ['get', 'DRIDU'],
                                    ['literal', hoveredRegionIdRef.current],
                                ],
                                '#FFCC00', // Highlight color for hovered regions
                                'rgba(0, 0, 0, 0)', // Transparent when not hovered
                            ],
                            'line-width': 3, // Width of the outline
                        },
                    });

                    // Add click event listener for mrc-fill
                    map.on('click', 'mrc-fill', (e: any) => {
                        if (e.features.length > 0) {
                            const clickedRegionId =
                                e.features[0].properties.DRIDU;

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
                    (map.getSource('gridMrc-source') as any).setData(qcMrcs);
                }
            } else {
                if (map.getLayer('mrc-outline')) map.removeLayer('mrc-outline');
                if (map.getLayer('mrc-fill')) map.removeLayer('mrc-fill');
                if (map.getLayer('mrc-outlines'))
                    map.removeLayer('mrc-outlines');
                if (map.getSource('gridMrc-source'))
                    map.removeSource('gridMrc-source');
            }
        };

        if (map.isStyleLoaded()) {
            handleMapLoad();
        } else {
            map.on('load', handleMapLoad);
        }

        return () => {
            map.off('load', handleMapLoad);
            if (map.getLayer('mrc-outline')) map.removeLayer('mrc-outline');
            if (map.getLayer('mrc-fill')) map.removeLayer('mrc-fill');
            if (map.getLayer('mrc-outlines')) map.removeLayer('mrc-outlines');
            if (map.getSource('gridMrc-source'))
                map.removeSource('gridMrc-source');
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map, mapGrid]);

    return null;
};

export default MrcGrid;
