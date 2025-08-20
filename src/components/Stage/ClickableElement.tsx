import React from "react";
import type { Enemy, Location, LocationElement, LocationElementType, NPC } from "../../types/GameTypes";

import { GiCrossedSwords, GiSwapBag } from "react-icons/gi";
import { FaPerson } from "react-icons/fa6";
import { IoExitSharp } from "react-icons/io5";


import './ClickableElement.css';

interface ClickableElementProps {
  element: LocationElement,
  onClick: (type: LocationElementType, npc?: NPC, location?: Location, enemy?: Enemy) => void
}

const ClickableElement: React.FC<ClickableElementProps> = (props) => {
  // Wybieramy ikonę w zależności od typu
  const getIcon = () => {
    switch (props.element.type) {
      case "npc":
        return <FaPerson />; // Ikona NPC
      case "enemy":
        return <GiCrossedSwords />; // Ikona wroga
      case "object":
        return "📜"; // Ikona obiektu
      case "location":
        return <IoExitSharp />
      case "item":
        return <GiSwapBag />; // Ikona przedmiotu
      default:
        return "❓";
    }
  };

  const handleOnClick = () => {
    if (props.element.npc)
      props.onClick("npc", props.element.npc);
    else if (props.element.location_element)
      props.onClick("location", undefined, props.element.location_element);
    else if (props.element.sublocation_element)
      props.onClick("subLocation", undefined, props.element.sublocation_element)
    else if (props.element.enemy)
      props.onClick("enemy", undefined, undefined, props.element.enemy);
  };

  return (
    <div
      className="clickable-element"
      style={{ left: `${props.element.position_x}%`, top: `${props.element.position_y}%` }}
      onClick={() => handleOnClick()}
    >
      {getIcon()}
    </div>
  );
};

export default ClickableElement;
   