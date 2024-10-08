"use client";

import React, { useRef } from "react";
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

const ThreeModel = () => {
  const { scene, materials } = useGLTF("/computer_monitor_low-poly/scene.gltf");
  const groupRef = useRef<THREE.Group>(null!);

  // Ładowanie nowej tekstury na ekran
  const newScreenTexture = useTexture("/project3.png");
  // Przypisz teksturę do materiału ekranu (Material.005 w tym wypadku)
  if (materials["Material.001"]) {
    materials["Material.001"].emissiveMap = newScreenTexture; // Opcjonalnie dla efektu emisji
    materials["Material.001"].needsUpdate = true; // Aby tekstura została odświeżona
  }

  // Animacja obracania (opcjonalna)

  return (
    <Stage
      intensity={1} // Jasność światła
      environment="city" // Wbudowana scena z otoczeniem (miasto)
      adjustCamera={true} // Automatyczne dostosowanie kamery
      preset="portrait" // Styl oświetlenia (inny to np. 'portrait' lub 'studio')
    >
      <Float>
        {/* Model 3D */}
        <group
          ref={groupRef}
          position={[0, 0, 0]}
          rotation={[0, 5, 0]}
          scale={3}
        >
          <primitive object={scene} />
        </group>
      </Float>

      {/* Cienie pod modelem */}
      <ContactShadows
        position={[0.1, -0.5, 0]} // Lokalizacja cienia pod modelem
        opacity={0.6} // Przezroczystość cieni
        scale={10} // Skala cienia
        blur={2.5} // Rozmycie cienia
        far={4.5} // Jak daleko sięga cień
      />

      {/* Scena HDR dla realistycznych odbić */}
      <Environment preset="sunset" />
    </Stage>
  );
};

export default ThreeModel;
