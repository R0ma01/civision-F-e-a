export default interface GeoJSON {
    type: string;
    features: {
        type: string;
        geometry: { type: string; coordinates: number[] };
        properties: Record<string, any>;
    }[];
}
