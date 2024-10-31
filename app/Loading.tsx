// app/loading.tsx
"use client";

import { Loader } from "@react-three/drei";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-500">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-lg font-medium">Loading your experience...</p>
      </div>
    </div>
  );
}
