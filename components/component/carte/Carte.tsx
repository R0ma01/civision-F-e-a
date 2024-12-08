'use client';

import Mapbox from '@/components/component/carte/Mapbox';
import useGlobalDataStore from '@/stores/global-data-store';
import useGlobalFilterStore from '@/stores/global-filter-store';
import useMapStore from '@/stores/global-map-store';
import { useEffect, useRef, useState } from 'react';
import Chloropleth from './Chloropleth';
import ClusterCloud from './ClusterCloud';
import { MapType } from '@/components/enums/map-type-enum';
import { Fournisseur } from '@/components/interface/fournisseur';
import ColorLegend from './Color-Legend';
import { choroplethColors, clusterColors } from '@/constants/color-palet';
import { UserType } from '@/components/enums/user-type-enum';
import RegionGrid from '@/components/component/carte/GridRegions';
import { getAuthSession } from '@/services/credentials-login';
import {
    AlbumDataFields,
    FournisseurDataFields,
    IndexeDataFieldsB,
    RepertoireDataFields,
} from '@/components/enums/data-types-enum';

import { MapRegions } from '@/components/enums/map-regions';
import MrcGrid from './GridMrcs';
import MuniGrid from './GridMuni';
import { SecteursGeographiques } from '@/components/enums/fournisseur-filter-enum';

export default function Carte() {
    // global variables

    const [user, setUser] = useState(UserType.VISITOR);

    useEffect(() => {
        async function fectchSession() {
            const session: any = await getAuthSession();

            if (session && session.user && session.user.email) {
                if (session.user.admin) {
                    setUser(UserType.ADMIN);
                } else {
                    setUser(UserType.USER);
                }
            }
        }
        fectchSession();
    }, []);
    const mapRef = useRef(null);
    const map = useMapStore((state) => state.map);
    const mapType = useMapStore((state) => state.mapType);
    const mapGrid = useMapStore((state) => state.mapGrid);

    const { matchStage, setFilter } = useGlobalFilterStore((state: any) => ({
        matchStage: state.matchStage,
        resetFilters: state.resetFilters,
        setFilter: state.setFilter,
    }));

    const {
        studyData,
        repertoireData,
        fournisseurData,
        indexeAData,
        indexeBData,
        fetchStudyData,
        fetchRepertoireData,
        fetchFournisseurData,
        fetchIndexeAData,
        fetchIndexeBData,
        studyDataFetched,
        loading,
        fournisseurDataFetched,
        repertoireDataFetched,
        indexeADataFetched,
        indexeBDataFetched,
        filterRepertoireData,
        filterFournisseurData,
        filterIndexeBData,
        filterIndexeAData,
        filterStudyData,
    } = useGlobalDataStore((state: any) => ({
        studyData: state.studyData,
        repertoireData: state.repertoireData,
        fournisseurData: state.fournisseurData,
        indexeAData: state.indexeAData,
        indexeBData: state.indexeBData,
        fetchStudyData: state.fetchStudyData,
        fetchRepertoireData: state.fetchRepertoireData,
        fetchFournisseurData: state.fetchFournisseurData,
        fetchIndexeAData: state.fetchIndexeAData,
        fetchIndexeBData: state.fetchIndexeBData,
        studyDataFetched: state.studyDataFetched,
        fournisseurDataFetched: state.fournisseurDataFetched,
        repertoireDataFetched: state.repertoireDataFetched,
        indexeADataFetched: state.indexeADataFetched,
        indexeBDataFetched: state.indexeBDataFetched,
        loading: state.loading,
        filterRepertoireData: state.filterRepertoireData,
        filterStudyData: state.filterStudyData,
        filterIndexeAData: state.filterIndexeAData,
        filterIndexeBData: state.filterIndexeBData,
        filterFournisseurData: state.filterFournisseurData,
    }));

    useEffect(() => {
        // update map reference
        mapRef.current = map;
    }, [map]);

    useEffect(() => {
        async function studyFetch() {
            await fetchStudyData(matchStage);
        }
        async function repertoireFetch() {
            await fetchRepertoireData(matchStage);
        }

        async function fournisseurFetch() {
            await fetchFournisseurData(matchStage);
        }

        async function indexeAFetch() {
            await fetchIndexeAData(matchStage);
        }

        async function indexeBFetch() {
            await fetchIndexeBData(matchStage);
        }

        if (
            !studyDataFetched &&
            mapType === MapType.PAGE_INFORMATION_ALBUM &&
            !loading
        ) {
            studyFetch();
        }

        if (
            !repertoireDataFetched &&
            mapType === MapType.REPERTOIRE &&
            !loading
        ) {
            repertoireFetch();
        }

        if (
            !fournisseurDataFetched &&
            mapType === MapType.FOURNISSEURS &&
            !loading
        ) {
            fournisseurFetch();
        }

        if (
            !indexeADataFetched &&
            mapType === MapType.PAGE_INFORMATION_INDEX_VOLETA &&
            !loading
        ) {
            indexeAFetch();
        }

        if (
            !indexeBDataFetched &&
            mapType === MapType.PAGE_INFORMATION_INDEX_VOLETB &&
            !loading
        ) {
            indexeBFetch();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        studyDataFetched,
        loading,
        fournisseurDataFetched,
        repertoireDataFetched,
        indexeADataFetched,
        indexeBDataFetched,
        mapType,
        matchStage,
    ]);

    function filter(region: any, field: any, mapTypeInside: MapType) {
        console.log(region);
        const filterKeys = MapRegions.get(mapTypeInside); // Get the map corresponding to the mapType
        if (!filterKeys) return;

        let filterRegion = undefined;

        // Convert the Map to an array and iterate over the entries
        Array.from(filterKeys.entries()).forEach(([key, value]) => {
            // Check if the current value matches the region
            if (value === region) {
                filterRegion = key;
            }
        });

        // If filterRegion was set, use it; otherwise, use the original region
        if (filterRegion !== undefined) {
            setFilter(field, filterRegion);
        } else {
            setFilter(field, region);
        }

        // Handle the filtering logic based on the mapTypeInside
        switch (mapTypeInside) {
            case MapType.REPERTOIRE:
                filterRepertoireData();
                break;
            case MapType.PAGE_INFORMATION_ALBUM:
                filterStudyData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETA:
                filterIndexeAData();
                break;
            case MapType.PAGE_INFORMATION_INDEX_VOLETB:
                filterIndexeBData();
                break;
            case MapType.FOURNISSEURS:
                filterFournisseurData();
                break;
            default:
                break;
        }
    }

    return (
        <div className={`relative h-full w-full z-40`}>
            <Mapbox />
            {mapType == MapType.PAGE_INFORMATION_ALBUM && (
                <>
                    <Chloropleth
                        map={map}
                        mapType={MapType.PAGE_INFORMATION_ALBUM}
                        regionField={AlbumDataFields.COORDONNES_REGION}
                        data={studyData}
                        dataField="count"
                        filterFunction={(region: any) => {
                            filter(
                                region,
                                AlbumDataFields.COORDONNES_REGION,
                                mapType,
                            );
                        }}
                    ></Chloropleth>

                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {loading && (
                <div className="absolute top-0 left-[18%] w-full h-full flex justify-center items-center">
                    <div className="loader-circle"></div>
                </div>
            )}
            {mapType == MapType.REPERTOIRE && (
                <>
                    <ClusterCloud
                        data={repertoireData}
                        map={map}
                    ></ClusterCloud>

                    <ColorLegend
                        gradientValues={clusterColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>

                    <RegionGrid
                        map={map}
                        mapGrid={mapGrid}
                        filterFunction={(mrc_id: number) => {
                            console.log(mrc_id);
                            if (mrc_id !== 0) {
                                setFilter(
                                    RepertoireDataFields.REG_IDU,
                                    mrc_id.toString(),
                                );
                            }

                            filterRepertoireData();
                        }}
                    ></RegionGrid>

                    <MrcGrid
                        map={map}
                        mapGrid={mapGrid}
                        filterFunction={(mrc_id: number) => {
                            console.log(mrc_id);

                            if (mrc_id !== 0) {
                                setFilter(RepertoireDataFields.MRC_IDU, mrc_id);
                            }

                            filterRepertoireData();
                        }}
                    ></MrcGrid>

                    <MuniGrid
                        map={map}
                        mapGrid={mapGrid}
                        filterFunction={(mrc_id: number) => {
                            console.log(mrc_id);

                            if (mrc_id !== 0) {
                                setFilter(
                                    RepertoireDataFields.MUNIC_IDU,
                                    mrc_id,
                                );
                            }

                            filterRepertoireData();
                        }}
                    ></MuniGrid>
                </>
            )}
            {mapType == MapType.FOURNISSEURS && (
                <>
                    <Chloropleth
                        map={map}
                        mapType={MapType.FOURNISSEURS}
                        regionField={
                            FournisseurDataFields.SECTEURS_GEOGRAPHIQUES
                        }
                        data={convertFournisseurData(
                            fournisseurData,
                            matchStage,
                            user === UserType.ADMIN,
                        )}
                        dataField="count"
                        filterFunction={(region: any) => {
                            filter(
                                region,
                                FournisseurDataFields.SECTEURS_GEOGRAPHIQUES,
                                mapType,
                            );
                        }}
                    ></Chloropleth>

                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {mapType == MapType.PAGE_INFORMATION_INDEX_VOLETA && (
                <>
                    <Chloropleth
                        map={map}
                        data={indexeAData}
                        mapType={MapType.PAGE_INFORMATION_INDEX_VOLETA}
                        regionField={IndexeDataFieldsB.Q0QC}
                        dataField="count"
                        filterFunction={(region: any) => {
                            filter(region, IndexeDataFieldsB.Q0QC, mapType);
                        }}
                    ></Chloropleth>

                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
            {mapType == MapType.PAGE_INFORMATION_INDEX_VOLETB && (
                <>
                    <Chloropleth
                        map={map}
                        data={indexeBData}
                        mapType={MapType.PAGE_INFORMATION_INDEX_VOLETB}
                        regionField={IndexeDataFieldsB.Q0QC}
                        dataField="count"
                        filterFunction={(region: any) => {
                            filter(region, IndexeDataFieldsB.Q0QC, mapType);
                        }}
                    ></Chloropleth>

                    <ColorLegend
                        gradientValues={choroplethColors}
                        className="absolute bottom-0 right-1 z-50"
                        mapType={mapType}
                    ></ColorLegend>
                </>
            )}
        </div>
    );
}

// function convertFournisseurData(
//     fournisseurs: Fournisseur[],
//     matchStage: Record<any, any>,
//     admin: boolean,
// ) {
//     const regions: string[] = matchStage['secteurs_geographique']?.$in || [];

//     const mapRegions = MapRegions.get(MapType.FOURNISSEURS);

//     const sectorCount: Record<string, { region: string; count: number }> = {};
//     Array.from(
//         mapRegions?.entries() || [], // Use entries() from the map
//     ).map(([key, regionName]) => {
//         sectorCount[regionName] = {
//             region: regionName,
//             count: 0, // Ensure key is treated as a string
//         };
//     });

//     fournisseurs.map((fournisseur) => {
//         if (fournisseur.visible || admin) {
//             fournisseur.secteurs_geographique.forEach((secteur) => {
//                 const mapSecteur = mapRegions?.get(secteur);

//                 if (mapSecteur) {
//                     if (regions.length === 0 || regions.includes(mapSecteur)) {
//                         const previousSect = sectorCount[mapSecteur];
//                         sectorCount[mapSecteur] = {
//                             region: previousSect.region,
//                             count: previousSect.count + 1,
//                         };
//                     }
//                 }
//             });
//         }
//     });

//     const result = Object.values(sectorCount).map((entry) => {
//         return entry;
//     });

//     return result;
//     // Convert the secteurCount object into an array of { secteur_geographique, count }
// }

function convertFournisseurData(
    fournisseurs: Fournisseur[],
    matchStage: Record<any, any>,
    admin: boolean,
) {
    const regions: string[] = matchStage['secteurs_geographique']?.$in || [];

    console.log(regions);

    const mapRegions = MapRegions.get(MapType.FOURNISSEURS);

    const sectorCount: Record<string, { region: string; count: number }> = {};
    Array.from(
        mapRegions?.entries() || [], // Use entries() from the map
    ).map(([key, regionName]) => {
        sectorCount[regionName] = {
            region: regionName,
            count: 0, // Ensure key is treated as a string
        };
    });

    fournisseurs.map((fournisseur) => {
        if (fournisseur.visible || admin) {
            if (
                fournisseur.secteurs_geographique.includes(
                    SecteursGeographiques.TOUS_QUEBEC,
                )
            ) {
                Object.keys(sectorCount).forEach((key) => {
                    if (
                        regions.includes(
                            mapRegions
                                ?.entries()
                                .find((entry) => entry[1] === key)[0],
                        ) ||
                        regions.length === 0
                    ) {
                        sectorCount[key].count += 1;
                    }
                });
            } else {
                fournisseur.secteurs_geographique.forEach((secteur) => {
                    const mapSecteur = mapRegions?.get(secteur);

                    if (mapSecteur) {
                        if (
                            regions.length === 0 ||
                            regions.includes(mapSecteur)
                        ) {
                            const previousSect = sectorCount[mapSecteur];
                            sectorCount[mapSecteur] = {
                                region: previousSect.region,
                                count: previousSect.count + 1,
                            };
                        }
                    }
                });
            }
        }
    });

    const result = Object.values(sectorCount).map((entry) => {
        return entry;
    });

    return result;
}
