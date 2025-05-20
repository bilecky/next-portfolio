import clsx from "clsx";
import React from "react";

type Props = { text: string; className?: string };

function Splitter(props: Props) {
  const { text, className } = props;

  if (!text) {
    return null;
  }

  const words = text.split(" ");

  return (
    <>
      {words.map((word, index) => (
        <span key={index} className={clsx("split-word inline-flex", className)}>
          {Array.from(word).map((character, charIndex) => (
            <span key={charIndex} className="split-char inline-block">
              {character}
            </span>
          ))}
          {index < words.length - 1 && (
            <span className="split-char inline-block">{"\u00A0"}</span>
          )}
        </span>
      ))}
    </>
  );
}

export default Splitter;
