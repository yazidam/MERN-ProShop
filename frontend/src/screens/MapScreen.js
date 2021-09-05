import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import mapboxgl, { setRTLTextPlugin } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import "../styles/map.css";
import { listPins } from "../actions/pinActions";
import { format } from "timeago.js";
const MapScreen = () => {
  const userLogin = useSelector((state) => state.userLogin); // njibo fih men store
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const pinList = useSelector((state) => state.pinList);
  const { pins, loading, error } = pinList;
  const [currentPlaceId, setCurrentPlaceId] = useState(false);
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

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPins());
    }
  }, [dispatch, userInfo]);

  console.log("pinn", pins);
  const handelMarkerClick = (id) => {
    setCurrentPlaceId(id);
  };
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      {" "}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {pins?.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-20}
              offsetTop={-10}
            >
              <Room
                style={{ fontSize: viewport.zoom * 7, color: "slateblue" }}
                onClick={() => handelMarkerClick(p._id)}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                latitude={p.lat}
                longitude={p.long}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(false)}
                anchor="left"
              >
                <div
                  style={{
                    width: "250px",
                    height: "250px",
                  }}
                >
                  <label className="labell">Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label className="labell">Review</label>
                  <p className="desc">{p.desc}</p>
                  <label className="labell">Rating</label>
                  <div className="stars">
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                    <Star className="star" />
                  </div>

                  <label className="labell">Information</label>
                  <br />
                  <span className="username">
                    Created by <b>{userInfo.name}</b>
                  </span>
                  <br />

                  <span className="date">{format(p.createdAt)}</span>
                </div>
              </Popup>
            )}
          </>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default MapScreen;
