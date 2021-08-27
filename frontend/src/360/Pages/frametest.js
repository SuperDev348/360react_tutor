// import React, { useState, useEffect } from "react";
// import "aframe";
// import "aframe-event-set-component";
// import Spinner from "../../components/@vuexy/spinner/Loading-spinner";

// export default function Frame(props) {
//   const {
//     image,
//     animation,
//     fov,
//     zoom,
//     nadir,
//     nadirScale,
//     nadirOpacity,
//     isMobile,
//     style,
//     loading,
//   } = props;

//   const initialState = {
//     zoom: parseFloat(props.zoom),
//   };

//   const [state, setState] = useState(initialState);
//   const [imageLoading, setImageLoading] = useState(loading);
//   let forceLoading = props.loading;

//   useEffect(() => {
//     console.log("count changed", props.image);
//   }, [props.image]);

//   //Skipping first iteration (exactly like componentWillReceiveProps):
//   const isFirstRun = React.useRef(true);
//   useEffect(() => {
//     if (isFirstRun.current) {
//       isFirstRun.current = false;
//       return;
//     }
//     console.log("count changed", props.image);
//     setImageLoading(true);
//   }, [props.image]);

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

//   return (
//     <>
//       <a-scene
//         loading-screen="enabled:false"
//         embedded
//         style={{
//           zIndex: "1",
//           width: "100%",
//           height: "100vh",
//           position: "absolute",
//           top: "0",
//         }}
//         // style={style}
//         vr-mode-ui="enabled: true "
//       >
//         <a-sky
//           src={image}
//           animation={animation}
//           phi-length="360"
//           phi-start="0"
//           do-on-asset-load="#my-asset"
//         ></a-sky>

//         <a-camera
//           id="cam"
//           wasd-controls-enabled="false"
//           zoom={zoom}
//           fov={fov}
//         ></a-camera>
//       </a-scene>
//     </>
//   );
// }
// aframe wit zoom wheel

import React, { useState, useEffect } from "react";
import "aframe";
import "aframe-event-set-component";

export default function Frame(props) {
  const {
    image,
    animation,
    fov,
    nadir,
    nadirScale,
    nadirOpacity,
    isMobile,
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
          width: "100vw",
          height: "100vh",
          position: "absolute",
        }}
        vr-mode-ui="enabled: true "
        isMobile={isMobile}
      >
        <a-sky
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

// Aframe

// import React, { useState, useEffect } from "react";
// import "aframe";
// import "aframe-event-set-component";

// export default function Frame(props) {
//   const {
//     image,
//     animation,
//     fov,
//     zoom,
//     nadir,
//     nadirScale,
//     nadirOpacity,
//     isMobile,
//     style,
//     loading,
//     fullscreeno,
//     isPlaying,
//   } = props;

//   return (
//     <>
//       <a-scene
//         loading-screen="enabled:false"
//         // embedded
//         style={{
//           zIndex: "1",
//           width: "100%",
//           height: "100vh",
//           position: "absolute",
//           top: "0",
//         }}
//         // style={style}
//         // vr-mode-ui="enabled: true "
//       >
//         {" "}
//         <a-sky
//           src={image}
//           animation={animation}
//           phi-length="360"
//           phi-start="0"
//           do-on-asset-load="#my-asset"
//         ></a-sky>
//         <a-camera id="cam" wasd-controls-enabled="false" zoom={zoom} fov={fov}>
//           {" "}
//         </a-camera>
//       </a-scene>
//     </>
//   );
// }

//  pannellum not react

// import React from "react";
// import { Pannellum, PannellumVideo } from "pannellum-react";
// export default function Frame(props) {
//   const { image, rotation } = props;

//   return (
//     <div>
//       <Pannellum
//         width="100vw"
//         height="100vh"
//         image={image}
//         pitch={10}
//         yaw={180}
//         hfov={110}
//         showFullscreenCtrl={true}
//         autoLoad={true}
//         autoRotate={rotation}
//         // autoRotateInactivityDelay={0}
//         // autoRotateStopDelay={1000}
//         showZoomCtrl={false}
//         draggable={true}
//         friction={(0.0, 1.0)}
//         onLoad={() => {
//           console.log("panorama loaded");
//         }}
//       ></Pannellum>
//     </div>
//   );
// }

// pannellum react

// import React from "react";
// import ReactPannellum, { getConfig } from "react-pannellum";
// export default function Frame(props) {
//   const { image } = props;
//   const config = {
//     // autoRotate: -2,
//     // pitch: 10,
//     // yaw: 180,
//     // hfov: 110,
//     showFullscreenCtrl: false,
//     autoLoad: true,

//     autoRotateInactivityDelay: 100,
//     autoRotateStopDelay: 1000,
//     showZoomCtrl: false,
//     showFullscreenCtrl: true,
//     // draggable: true,
//     //   //   // friction=(0.0, 1.0),
//   };
//   return (
//     <div>
//       <ReactPannellum
//         style={{ width: "100%", height: "100vh" }}
//         id="1"
//         sceneId="firstScene"
//         imageSource={image}
//         config={config}
//         // config={
//         //   // pitch = 10,
//         //   // yaw = 180),
//         //   //   (hfov = 110),
//         //   //   (showFullscreenCtrl = false),
//         //   //   (autoLoad = true),
//         //   //   (autoRotate = 1),
//         //   //   (autoRotateInactivityDelay = 100),
//         //   //   // autoRotateStopDelay={1000}
//         //   //   (showZoomCtrl = false),
//         //   //   (draggable = true))
//         //   //   // friction=(0.0, 1.0),
//         // }
//       ></ReactPannellum>
//     </div>
//   );
// }

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
//       autorotateSpeed: "1rpm",
//       autorotateDelay: 1000,
//       moveSpeed: 1,
//       defaultZoomLvl: 0.1,
//       // fisheye: 3,
//       maxFov: 90,
//       defaultLong: 0,
//       loadingImg: imgo,
//       loadingTxt: "Walki in",
//       mousewheel: true,
//       captureCursor: false,
//       mousewheelSpeed: 2,
//       moveInertia: true,
//       keyboard: true,
//     });
//   }, [image]); // will only be called when the src prop gets updated

//   return <div ref={sphereElementRef} />;
// }
