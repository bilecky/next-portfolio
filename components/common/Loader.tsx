"use client";
import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

type LoaderProps = {
  onFinish: () => void;
};
export default function Loader({ onFinish }: LoaderProps) {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100) {
      // Można dać lekkie opóźnienie
      const timeout = setTimeout(() => {
        onFinish();
      }, 300);

      return () => clearTimeout(timeout);
    }
  }, [progress, onFinish]);
  return (
    <div className="pointer-events-none fixed inset-0 z-[10] flex items-end justify-end bg-transparent">
      <span
        id="app-loader"
        className="app-loader text-loaderColor font-mainHeaderFont text-dynamic-loader-textSize font-thin leading-none tracking-wider opacity-0"
      >
        {Math.floor(progress)}%
      </span>
    </div>
  );
}
