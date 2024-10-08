"use client";

import React, { forwardRef } from "react";
import {
  ContactShadows,
  Environment,
  Float,
  Stage,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/computer_monitor_low-poly/scene.gltf");

type ThreeModelProps = {};

const ThreeModel = forwardRef<THREE.Group, ThreeModelProps>(
  (props: ThreeModelProps, ref) => {
    const { scene, materials } = useGLTF(
      "/computer_monitor_low-poly/scene.gltf",
    );

    // Ładowanie nowej tekstury na ekran
    const newScreenTexture = useTexture("/project5.png");
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
          <group ref={ref} rotation={[0, 5, 0]}>
            <primitive object={scene} scale={1.7} />
          </group>
        </Float>

        {/* Scena HDR dla realistycznych odbić */}
        <Environment preset="lobby" />
      </Stage>
    );
  },
);

export default ThreeModel;
