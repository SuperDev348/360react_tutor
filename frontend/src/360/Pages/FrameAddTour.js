import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";

export default function Frame(props) {
  const {
    image,
    animation,
    fov,
    zoom,
    className,
    nadir,
    nadirScale,
    nadirOpacity,
    isMobile,
    style,
    view,
  } = props;

  const initialState = {
    zoom: parseFloat(props.zoom),
  };

  const [state, setState] = useState(initialState);

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
        className={className}
        style={{
          zIndex: "1",
          width: "70%",
          height: "calc(100vh - 52px)",
          position: "absolute",
          right: "0px",
          top: "52px",
        }}
        // style={style}
        vr-mode-ui="enabled: false "
      >
        <a-sky
          src={image}
          animation={animation}
          phi-length="360"
          phi-start="0"
          rotation={view}
        ></a-sky>

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
