import clsx from "clsx";
import React from "react";

type Props = { text: string; className?: string; splitType?: string };

function Splitter(props: Props) {
  const { text, className, splitType = "" } = props;

  if (!text) {
    return;
  }

  const characters = text.split(splitType);

  return (
    <>
      {characters.map((character, index) => {
        return (
          <span
            key={index}
            className={clsx("split-char inline-block", className)}
          >
            {character === " " ? "\u00A0" : character}
          </span>
        );
      })}
    </>
  );
}

export default Splitter;
