import React from 'react';
import { useDrop } from 'react-dnd';
import { Pannellum } from 'pannellum-react';
import Frame from '../../Pages/FrameHotspot';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};
function selectBackgroundColor(isActive, canDrop) {
  if (isActive) {
    return 'darkgreen';
  } else if (canDrop) {
    return 'darkkhaki';
  } else {
    return '#222';
  }
}
export const Droppable = ({
  allowedDropEffect,
  image,
  hotspotList,
  zoom,
  fov,
  nadirImage,
  nadirScale,
  nadirOpacity,
  newHotspot,
  dragging,
}) => {
  const panImage = React.useRef(null);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: () => ({
      name: `${allowedDropEffect} Dustbin`,
      allowedDropEffect,
    }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isActive = canDrop && isOver;

  return (
    // <div ref={drop} style={{ ...style, backgroundColor }}>
    //   {`Works with ${allowedDropEffect} drop effect`}
    //   <br />
    //   <br />
    //   {isActive ? "Release to drop" : "Drag a box here"}
    // </div>
    <div ref={drop}>
      <Frame
        width="70%"
        height="80vh"
        image={image.url}
        // animation={`property: rotation; from:0 0 0; to: 0 360 0; loop: ${loop}; dur: ${rotationSpeed} delay:${delay}; dir:${direction};`}
        zoom={zoom}
        fov={fov}
        hotspotList={hotspotList}
        // nadir={nadirImage}
        // nadirScale={nadirScale}
        // nadirOpacity={nadirOpacity}
        onClick={() => console.log('elias')}
        loading={true}
        newHotspot={newHotspot}
        dragging={dragging}
      />
    </div>
  );
};
