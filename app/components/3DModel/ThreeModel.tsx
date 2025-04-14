"use client";

import React, { forwardRef } from "react";
import {
  Detailed,
  Environment,
  Float,
  PerformanceMonitor,
  Stage,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/app/data/data";
import AnimatedLink from "@/app/components/common/AnimatedLink";

useGLTF.preload("/computer_monitor_low-poly/scene-transformed.glb");

type ThreeModelProps = {
  currentProject: number;
};

const ThreeModel = forwardRef<THREE.Group, ThreeModelProps>(
  (props: ThreeModelProps, ref) => {
    const { currentProject } = props;
    const { scene, materials } = useGLTF(
      "/computer_monitor_low-poly/scene-transformed.glb",
    );

    // Ładowanie nowej tekstury na ekran
    const newScreenTexture = useTexture(
      `/projectsScreenshots/project${currentProject + 1}/image-3.png`,
    );
    // Przypisz teksturę do materiału ekranu (Material.005 w tym wypadku)
    if (materials["Material.001"]) {
      materials["Material.001"].map = newScreenTexture;
      // materials["Material.001"].emissiveMap = newScreenTexture;
      materials["Material.001"].emissive.set(0x000000); // Brak emisji
      // materials["Material.001"].needsUpdate = true; // Aby tekstura została odświeżona
    }

    // Animacja obracania (opcjonalna)

    return (
      <Stage environment={"city"} adjustCamera={false} intensity={0.5}>
        <Float floatIntensity={0.1} speed={1.1} rotationIntensity={0.5}>
          {/* Model 3D */}
          <AnimatedLink
            as="group"
            href={`/projects/${projects[currentProject].id}`}
          >
            <group
              onPointerOut={(e) => (document.body.style.cursor = "default")}
              onPointerOver={(e) => (document.body.style.cursor = "pointer")}
              ref={ref}
              rotation={[0, 5.05, 0]}
            >
              <primitive object={scene} scale={1.2} />
            </group>
          </AnimatedLink>
        </Float>
      </Stage>
    );
  },
);

export default ThreeModel;
