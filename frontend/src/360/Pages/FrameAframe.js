import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";
import Spinner from "../../components/@vuexy/spinner/Loading-spinner";

export default function Frame(props) {
  const {
    image,
    animation,
    fov,
    zoom,
    nadir,
    nadirScale,
    nadirOpacity,
    isMobile,
    style,
    loading,
  } = props;

  const initialState = {
    zoom: parseFloat(props.zoom),
  };

  const [state, setState] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(loading);
  let forceLoading = props.loading;

  useEffect(() => {
    console.log("count changed", props.image);
  }, [props.image]);

  //Skipping first iteration (exactly like componentWillReceiveProps):
  const isFirstRun = React.useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    console.log("count changed", props.image);
    setImageLoading(true);
  }, [props.image]);

  useEffect(() => {
    function handleWheel(e) {
      const delta = Math.sign(e.wheelDelta);
      let newZoom = state.zoom + delta;
      if (newZoom > 5) newZoom = 5;
      if (newZoom < 1) newZoom = 1;
      setState({ zoom: newZoom });
    }
    window.addEventListener("wheel", handleWheel);

    return function cleanUpListener() {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [state]);

  return (
    <>
      <a-scene
        loading-screen="enabled:false"
        embedded
        style={{
          zIndex: "1",
          width: "100%",
          height: "100vh",
          position: "absolute",
          top: "0",
        }}
        // style={style}
        vr-mode-ui="enabled: true "
      >
        <a-assets>
          <img
            id="my-asset"
            src={image}
            onLoad={() => setImageLoading(false)}
            crossorigin="anonymous"
          />
        </a-assets>
        {imageLoading ? (
          <Spinner />
        ) : (
          <a-sky
            src={image}
            animation={animation}
            phi-length="360"
            phi-start="0"
            do-on-asset-load="#my-asset"
          ></a-sky>
        )}

        <a-camera
          id="cam"
          wasd-controls-enabled="false"
          zoom={zoom}
          fov={fov}
        ></a-camera>
      </a-scene>
    </>
  );
}
