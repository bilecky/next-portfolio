"use client";

import React, { forwardRef, useEffect } from "react";
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
import { projects } from "../../data/data";
import AnimatedLink from "@/components/common/AnimatedLink";

useGLTF.preload("/computer_monitor_low-poly/scene-transformed.glb");

projects.forEach((_, index) => {
  useTexture.preload(`/projectsScreenshots/project${index + 1}/image-3.png`);
});

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
    useEffect(() => {
      if (materials["Material.001"] && newScreenTexture) {
        materials["Material.001"].map = newScreenTexture;
        materials["Material.001"].emissive.set(0x000000);
        materials["Material.001"].needsUpdate = true;
      }
    }, [newScreenTexture, materials]);

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
