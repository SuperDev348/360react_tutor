import React, { useState } from "react";
// import { ItemTypes } from "./ItemTypes";
import { useDrag } from "react-dnd";
import Picker from "emoji-picker-react";

const style = {
  border: "1px dashed white",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  float: "left",
  color: "#fff",
};
export const Draggable = ({ image, onStop, setDragging, objectType }) => {
  let [chosenEmoji, setChosenEmoji] = useState([]);

  const item = {
    image: objectType === "image" ? image : chosenEmoji,
    type: "box",
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const [{ opacity }, drag] = useDrag({
    item,

    isDragging(monitor) {
      setDragging(true);
    },
    end(item, monitor) {
      setDragging(false);
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        let alertMessage = "";
        const isDropAllowed =
          dropResult.allowedDropEffect === dropResult.dropEffect;
        if (isDropAllowed) {
          const isCopyAction = dropResult.dropEffect === "copy";
          const actionName = isCopyAction ? "copied" : "moved";
          //   alertMessage = `You ${actionName} ${item.name} into ${dropResult.name}!`;
        } else {
          //   alertMessage = `You cannot ${dropResult.dropEffect} an item into the ${dropResult.name}`;
        }
        // alert(alertMessage);
        onStop(objectType === "image" ? image : chosenEmoji, objectType);
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });
  return objectType === "image" ? (
    <img src={image} ref={drag} style={{ opacity }} />
  ) : (
    <Picker ref={drag} />
  );
};
