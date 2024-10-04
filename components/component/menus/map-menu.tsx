import React, { useState, useEffect } from 'react';
import Button from '@/components/component/buttons/button';
import {
    ZoomInSVG,
    ZoomOutSVG,
    LegendSVG,
} from '@/components/component/svg-icons/svg-icons';
import { ButtonType } from '@/components/enums/button-type-enum';
import useMapStore from '@/stores/global-map-store';
import { html_object_constants } from '@/constants/constants';
import { MapType } from '@/components/enums/map-type-enum';
import useGlobalFilterStore from '@/stores/global-filter-store';

interface MapManuProps {
    className?: string;
}
const MapMenu: React.FC<MapManuProps> = ({ className }) => {
    const { map, toggleLegend, legend, mapGrid, toggleMapGrid, mapType } =
        useMapStore((state) => ({
            map: state.map,
            legend: state.legend,
            toggleLegend: state.toggleLegend,
            mapGrid: state.mapGrid,
            toggleMapGrid: state.toggleMapGrid,
            mapType: state.mapType,
        }));

    const resetFilters = useGlobalFilterStore((state) => state.resetFilters);

    const zoomIn = () => {
        if (map) {
            map.zoomIn();
        }
    };

    const zoomOut = () => {
        if (map) {
            map.zoomOut();
        }
    };

    return (
        <>
            <div
                className={`z-20 w-fit h-fit pt-1 pb-1 pl-!/2 pr-1/2 bg-white flex flex-col items-center rounded-lg ${className}`}
            >
                <Button
                    id={html_object_constants.zoom_in_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomIn();
                    }}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 group`}
                >
                    <ZoomInSVG className="group-hover:fill-black" />
                </Button>

                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        zoomOut();
                    }}
                    scaleOnHover={false}
                    className={`p-1 hover:scale-110 group`}
                >
                    <ZoomOutSVG className="group-hover:fill-black" />
                </Button>
                <Button
                    id={html_object_constants.zoom_out_tab_id}
                    buttonType={ButtonType.ICON}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleLegend();
                    }}
                    scaleOnHover={false}
                    className={`p-1 pl-2 hover:scale-110 group ${legend ? 'bg-logo-dark-blue' : ''}`}
                >
                    <LegendSVG className="group-hover:fill-black" />
                </Button>
                {mapType === MapType.REPERTOIRE && (
                    <Button
                        id={html_object_constants.zoom_out_tab_id}
                        buttonType={ButtonType.ICON}
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMapGrid();
                            resetFilters();
                        }}
                        scaleOnHover={false}
                        className={`p-1 hover:scale-110 group ${mapGrid ? 'bg-logo-dark-blue' : ''}`}
                    >
                        <p
                            className={`text-black text-[8px] text-center ${mapGrid ? 'text-white' : ''}`}
                        >
                            {mapGrid ? 'MRC' : 'REG'}
                        </p>
                    </Button>
                )}
            </div>
        </>
    );
};

export default MapMenu;
