import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Room } from "@material-ui/icons";
import mapboxgl, { setRTLTextPlugin } from "mapbox-gl";

const MapScreen = () => {
  const [viewport, setViewport] = useState({
    width: "80vw",
    height: "75vh",
    latitude: 36.81258075,
    longitude: 10.098907749999999,
    zoom: 4,
  });
  useEffect(() => {
    if (mapboxgl.getRTLTextPluginStatus() !== "loaded") {
      mapboxgl.setRTLTextPlugin(
        "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.0/mapbox-gl-rtl-text.js"
      );
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      {" "}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Marker
          latitude={48.8582602}
          longitude={2.2944991}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{ fontSize: viewport.zoom * 7, color: "slateblue" }} />
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default MapScreen;
