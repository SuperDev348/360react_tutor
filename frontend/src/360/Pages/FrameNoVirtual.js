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
          height: "500px",
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

// photo sphere

// import React, { useEffect } from "react";
// import { Viewer } from "photo-sphere-viewer";
// import imgo from "../Assets/corfu1.jpg";
// import MarkersPlugins from "photo-sphere-viewer/dist/plugins/markers";
// export default function Frame(props) {
//   const sphereElementRef = React.createRef();
//   const { image } = props;
//   useEffect(() => {
//     const shperePlayerInstance = new Viewer({
//       container: sphereElementRef.current,
//       panorama: image,

//       size: {
//         width: "100vw",
//         height: "100vh",
//       },

//       navbar: "autorotate zoom download caption fullscreen",
//       autorotateSpeed: "0.1rpm",
//       autorotateDelay: 1000,
//       moveSpeed: 0.1,
//       defaultZoomLvl: 0.1,
//       // fisheye: 3,
//       maxFov: 90,
//       defaultLong: 0,
//       loadingImg: imgo,
//       loadingTxt: "Walki in",
//       // mousewheel: true,
//       captureCursor: true,
//       mousewheelSpeed: 2,
//       moveInertia: true,
//       keyboard: true,
//     });
//   }, [image]); // will only be called when the src prop gets updated

//   return <div ref={sphereElementRef} />;
// }
