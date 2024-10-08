"use client";

import React, { forwardRef } from "react";
import {
  Detailed,
  Environment,
  Float,
  Stage,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/computer_monitor_low-poly/scene.gltf");

type ThreeModelProps = {
  currentProject: number;
};

const ThreeModel = forwardRef<THREE.Group, ThreeModelProps>(
  (props: ThreeModelProps, ref) => {
    const { currentProject } = props;
    const { scene, materials } = useGLTF(
      "/computer_monitor_low-poly/scene.gltf",
    );

    // Ładowanie nowej tekstury na ekran
    const newScreenTexture = useTexture(`/project-${currentProject}.png`);
    // Przypisz teksturę do materiału ekranu (Material.005 w tym wypadku)
    if (materials["Material.001"]) {
      materials["Material.001"].map = newScreenTexture;
      materials["Material.001"].emissiveMap = newScreenTexture; // Opcjonalnie dla efektu emisji
      materials["Material.001"].emissive.set(0x000000); // Brak emisji
      materials["Material.001"].needsUpdate = true; // Aby tekstura została odświeżona
    }

    // Animacja obracania (opcjonalna)

    return (
      <Stage
        adjustCamera={false}
        intensity={0.5}
        shadows="contact"
        environment="city"
      >
        <Float floatIntensity={0.1} speed={1} rotationIntensity={1}>
          {/* Model 3D */}
          <Detailed>
            <group ref={ref} position={[0, 0, 0]} rotation={[0, 5, 0]}>
              <primitive object={scene} scale={1.5} />
            </group>
          </Detailed>
        </Float>

        {/* Scena HDR dla realistycznych odbić */}
        <Environment preset="lobby" />
      </Stage>
    );
  },
);

export default ThreeModel;
