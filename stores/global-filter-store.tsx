import { create } from 'zustand';
import { value_constants } from '@/constants/constants';

interface GlobalState {
    matchStage: Record<string, any>;
    setFilter: (filterName: any | string, filterValue: string | number) => void;

    getFilter: (filterName: any | string) => any;
    resetFilters: () => void;
}

const useGlobalFilterStore = create<GlobalState>((set, get) => ({
    matchStage: {},

    setFilter: (filterPath, newValue) => {
        const previousFilter: Record<string, any> = { ...get().matchStage };

        if (
            newValue.toString().toUpperCase() ===
                value_constants.all_values_string_filter
                    .toString()
                    .toUpperCase() ||
            newValue.toString().toUpperCase() ===
                value_constants.toutes_values_string_filter
                    .toString()
                    .toUpperCase() ||
            newValue === value_constants.all_values_number_filter ||
            newValue === value_constants.all_values_else_filter
        ) {
            if (previousFilter[filterPath]) {
                delete previousFilter[filterPath];
            }
        } else {
            const newContent = previousFilter[filterPath];
            if (newContent) {
                if (newContent.$in.includes(newValue)) {
                    previousFilter[filterPath] = {
                        $exists: true,
                        $nin: [null, NaN],
                        $in: newContent.$in.filter(
                            (item: any) => item !== newValue,
                        ),
                    };

                    if (previousFilter[filterPath].$in.length === 0) {
                        delete previousFilter[filterPath];
                    }
                } else {
                    previousFilter[filterPath] = {
                        $exists: true,
                        $nin: [null, NaN],
                        $in: [...newContent.$in, newValue],
                    };
                }
            } else {
                previousFilter[filterPath] = {
                    $exists: true,
                    $nin: [null, NaN],
                    $in: [newValue],
                };
            }
        }

        set({ matchStage: previousFilter });
    },

    getFilter(filterPath) {
        const filters = get().matchStage;
        return filters[filterPath]
            ? filters[filterPath]['$in'][0]
            : value_constants.all_values_string_filter;
    },
    resetFilters() {
        set({ matchStage: {} });
    },
}));

export default useGlobalFilterStore;
