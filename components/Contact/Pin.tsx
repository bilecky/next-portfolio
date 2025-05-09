"use client";
import React, { useState } from "react";
import { RiMapPinUserFill } from "react-icons/ri";
import { UserPin } from "./PinningComponent";

const Pin = ({ pin }: { pin: UserPin }) => {
  const [hoveredPin, setHoveredPin] = useState<UserPin | null>(null); // Ustal typ stanu

  return (
    <div
      key={pin.id}
      onMouseEnter={() => setHoveredPin(pin)}
      onMouseLeave={() => setHoveredPin(null)}
      style={{
        position: "absolute",
        top: `${pin.position.y}%`,
        left: `${pin.position.x}%`,
        transform: "translate(-25%, -50%)",
      }}
    >
      <RiMapPinUserFill
        className="pin text-lg md:text-xl"
        style={{
          color: pin.pallette,
        }}
      />
      {hoveredPin === pin && (
        <div
          className="absolute rounded border bg-white p-1 text-xs text-black"
          style={{
            transform: "translate(-25%, -175%)",
          }}
        >
          {pin.name}{" "}
        </div>
      )}
    </div>
  );
};

export default Pin;
