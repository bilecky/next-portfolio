"use client";
import { Html, useProgress } from "@react-three/drei";
import { useEffect } from "react";

type LoaderProps = {
  /** Wywołaj, gdy progress osiągnie 100% */
  onFinish: () => void;
  /** Opcjonalne opóźnienie w ms po 100% (domyślnie 300 ms) */
  delayMs?: number;
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
    <div className="fixed inset-0 z-[0] flex items-end justify-end bg-transparent">
      <span className="app-loader text-dynamic-loader-textSize z-[1] font-mainHeaderFont font-thin leading-none tracking-wider text-background/70">
        {Math.floor(progress)}%
      </span>
    </div>
  );
}
