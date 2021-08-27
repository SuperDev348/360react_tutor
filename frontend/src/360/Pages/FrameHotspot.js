import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";
import Spinner from "../../components/@vuexy/spinner/Fallback-spinner";
export default function Frame(props) {
  const {
    image,
    animation,
    fov,
    nadir,
    nadirScale,
    nadirOpacity,
    isMobile,
    loading,
    style,
  } = props;

  const initialState = {
    zoom: parseFloat(props.zoom),
  };

  const [state, setState] = useState(initialState);
  const [imageLoading, setImageLoading] = useState(loading);
  const [show, setShow] = useState(false);
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

  //   useEffect(() => {
  //     function handleWheel(e) {
  //       const delta = Math.sign(e.wheelDelta);
  //       let newZoom = state.zoom + delta;
  //       if (newZoom > 5) newZoom = 5;
  //       if (newZoom < 1) newZoom = 1;
  //       setState({ zoom: newZoom });
  //     }

  //     window.addEventListener("wheel", handleWheel);

  //     return function cleanUpListener() {
  //       window.removeEventListener("wheel", handleWheel);
  //     };
  //   }, [state]);

  return (
    <>
      <a-scene
        loading-screen="enabled:false"
        embedded
        style={{
          zIndex: "1",
          // width: props.width,
          // height: props.height,
          width: "72%",
          height: "80%",
          position: "absolute",
          top: "0",
        }}
        vr-mode-ui="enabled: false "
        // isMobile={isMobile}
      >
        {/*  */}
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
            shader="flat"
            src={image}
            animation={animation}
            animation__mouseenter="property: components.material.material.color; type: color; to: blue; startEvents: mouseenter; dur: 500"
          >
            {nadir ? (
              <a-image
                src={nadir}
                position="0 0 0 "
                rotation="90 0 0"
                scale={nadirScale}
                opacity={nadirOpacity}
              ></a-image>
            ) : (
              ""
            )}
          </a-sky>
        )}

        {/*  */}

        <a-camera
          id="cam"
          zoom={state.zoom}
          wasd-controls-enabled="false"
        ></a-camera>
        {/* test */}
        <a-entity camera look-controls wasd-controls></a-entity>
        {/* end test */}
      </a-scene>
    </>
  );
}
