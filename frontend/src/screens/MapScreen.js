import * as React from "react";
import { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import mapboxgl, { setRTLTextPlugin } from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import "../styles/map.css";
import { listPins, createPin } from "../actions/pinActions";
import { format } from "timeago.js";
import axios from "axios";
const MapScreen = () => {
  const userLogin = useSelector((state) => state.userLogin); // njibo fih men store
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const pinList = useSelector((state) => state.pinList);
  const { pins, loading: loadingPin, error: errorPin } = pinList;

  const pinCreate = useSelector((state) => state.pinCreate);
  const { addpin, loading, error } = pinCreate;
  const [currentPlaceId, setCurrentPlaceId] = useState(false);
  const [viewport, setViewport] = useState({
    width: "80vw",
    height: "75vh",
    latitude: 36.81258075,
    longitude: 10.098907749999999,
    zoom: 4,
  });
  const [newPlace, setNewPlace] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [pinsp, setPinsp] = useState("");
  const [rating, setRating] = useState(0);

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

  // console.log("pinn", pins);
  const handelMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setViewport({ ...viewport, latitude: lat, longitude: long });
  };
  const handelAddPoint = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({ long, lat });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("e", e);
    dispatch(
      createPin(
        // { username: userInfo.name },
        title,
        desc,
        rating,
        { lat: newPlace.lat },
        { long: newPlace.long }
      )
    );
    setNewPlace("");
    dispatch(listPins());
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      {" "}
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDblClick={handelAddPoint}
        transitionDuration="200"
      >
        {pins?.map((p) => (
          <>
            <Marker
              latitude={p.lat}
              longitude={p.long}
              offsetLeft={-viewport.zoom * 3.5}
              offsetTop={-viewport.zoom * 7}
            >
              <Room
                style={{
                  fontSize: viewport.zoom * 7,
                  color: "slateblue",
                  cursor: "pointer",
                }}
                onClick={() => handelMarkerClick(p._id, p.lat, p.long)}
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
                    {Array(p.rating).fill(<Star className="star" />)}
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
        {newPlace && (
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(false)}
            anchor="left"
          >
            <div>
              <form className="formm" onSubmit={handelSubmit}>
                <label className="labell">Title</label>
                <input
                  className="inputt"
                  placeholder="Enter a title"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label className="labell">Review</label>
                <textarea
                  placeholder="Say us something about this place"
                  onChange={(e) => setDesc(e.target.value)}
                />
                <label className="labell">Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapScreen;
