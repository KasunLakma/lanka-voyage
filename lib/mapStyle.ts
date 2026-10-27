import type { StyleSpecification } from "maplibre-gl";

// Basic map made of OpenStreetMap picture tiles.
// Good for development and small sites. Before the big launch, switch to a map
// provider (for example MapTiler) and change ONLY this file.
export const MAP_STYLE: StyleSpecification = {
    version: 8,
    sources: {
        osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            maxzoom: 19,
            attribution:
                "© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
        },
    },
    layers: [{ id: "osm", type: "raster", source: "osm" }],
};