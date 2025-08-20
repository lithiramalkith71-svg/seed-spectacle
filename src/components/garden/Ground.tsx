import { useMemo } from 'react';
import * as THREE from 'three';

export const Ground = () => {
  // Create a more realistic grass texture using vertex colors
  const grassGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(25, 25, 50, 50);
    const colors = new Float32Array(geometry.attributes.position.count * 3);
    
    for (let i = 0; i < colors.length; i += 3) {
      // Create natural grass color variations
      const variation = Math.random() * 0.3;
      colors[i] = 0.2 + variation * 0.3;     // Red
      colors[i + 1] = 0.4 + variation * 0.4; // Green
      colors[i + 2] = 0.1 + variation * 0.2; // Blue
    }
    
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  return (
    <group>
      {/* Main grass ground */}
      <mesh
        geometry={grassGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          vertexColors
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      
      {/* Dirt patches for variety */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[3, 0, 2]}
        receiveShadow
      >
        <circleGeometry args={[0.8, 16]} />
        <meshStandardMaterial 
          color="#8B7355"
          roughness={0.9}
        />
      </mesh>
      
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2, 0, -3]}
        receiveShadow
      >
        <circleGeometry args={[0.6, 16]} />
        <meshStandardMaterial 
          color="#A0906C"
          roughness={0.9}
        />
      </mesh>

      {/* Small rocks scattered around */}
      {Array.from({ length: 8 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        const size = 0.05 + Math.random() * 0.1;
        return (
          <mesh
            key={i}
            position={[x, size / 2, z]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[size, 6, 4]} />
            <meshStandardMaterial 
              color="#6B6B6B"
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};