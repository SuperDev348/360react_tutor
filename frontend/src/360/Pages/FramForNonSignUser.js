import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";
import Carousel, { autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";

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
        style={{
          zIndex: "1",
          width: "100%",
          height: "200px",
          position: "absolute",
          right: "0px",
          borderRadius: "40px",
        }}
        // style={style}
        vr-mode-ui="enabled: false "
      >
        <a-sky
          src={image}
          animation={animation}
          phi-length="360"
          phi-start="0"
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
