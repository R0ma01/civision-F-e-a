import { create } from "zustand";
import entreprises_data from "@/geojson/entreprises-familiales-v1.6-archive.json";

const useDataStore = create((set) => ({

  tempClusterData: [],
  setTempClusterData: (data) => set((state) => ({ tempClusterData: data })),
  
  // state for the language (currently only used for authentification)
  lang: "FR",
  setLang: (lang) => set({ lang }),

  // tells you when data is fetched (in Carte component)
  dataReceived: false,
  setDataReceived: (received) => set((state) => ({ dataReceived: received })),
  
  // holds selected region on the map : (unused by Valerie)
  regionSelection: "",
  setRegionSelection: (region) => set((state) => ({ regionSelection: region })),

  // holds selected company on the map : ***** (used by Valerie)
  companySelection: null,
  setCompanySelection: (id) => set((state) => ({ companySelection: id })),

  filterSelection: "", //try not to use
  setFilterSelection: (filter) => set((state) => ({ filterSelection: filter })),

  filterValue: "", //try not to use
  setFilterValue: (value) => set((state) => ({ filterValue: value })),

  // array of selected charts to be displayed on the page : (unused by Valere)
  chartSelection: [],
  setChartSelection: (chart) => set((state) => ({ chartSelection: chart })),

  rawJson: entreprises_data,
  setRawJson: (data) => set((state) => ({ rawJson: data })),

  filters: {},
  setFilter: (key, value) => {
    set((state) => {
      return { filters: { ...state.filters, [key]: value } };
    });
  },
}));

export default useDataStore;