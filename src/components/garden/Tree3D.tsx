import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Tree } from '@/types/garden';

interface Tree3DProps {
  tree: Tree;
  onClick?: () => void;
}

export const Tree3D = ({ tree, onClick }: Tree3DProps) => {
  const trunkRef = useRef<Mesh>(null);
  const leavesRef = useRef<Mesh>(null);

  // Gentle swaying animation
  useFrame((state) => {
    if (trunkRef.current && leavesRef.current) {
      const time = state.clock.getElapsedTime();
      const sway = Math.sin(time + tree.position[0]) * 0.02;
      trunkRef.current.rotation.z = sway;
      leavesRef.current.rotation.z = sway * 1.5;
    }
  });

  // Calculate tree size based on growth stage
  const getTreeScale = () => {
    switch (tree.growthStage) {
      case 'seedling': return 0.3;
      case 'sapling': return 0.6;
      case 'young': return 0.8;
      case 'mature': return 1.0;
      case 'ancient': return 1.3;
      default: return 1.0;
    }
  };

  // Get realistic tree colors using design system
  const getTreeColors = () => {
    const baseColors = {
      trunk: 'hsl(0, 0%, 10%)', // Black trunk
      leaves: 'hsl(120, 60%, 45%)', // Light green leaves
      leavesSecondary: 'hsl(120, 50%, 55%)', // Lighter green variant
      accent: 'hsl(0, 0%, 100%)' // White accent
    };

    switch (tree.type) {
      case 'oak':
        return { ...baseColors, leaves: 'hsl(120, 60%, 45%)', leavesSecondary: 'hsl(120, 55%, 50%)' };
      case 'pine':
        return { ...baseColors, leaves: 'hsl(120, 50%, 35%)', leavesSecondary: 'hsl(120, 45%, 40%)' };
      case 'cherry':
        return { ...baseColors, leaves: 'hsl(120, 70%, 50%)', leavesSecondary: 'hsl(120, 65%, 55%)' };
      case 'maple':
        return { ...baseColors, leaves: 'hsl(120, 55%, 40%)', leavesSecondary: 'hsl(120, 60%, 45%)' };
      default:
        return baseColors;
    }
  };

  const scale = getTreeScale();
  const colors = getTreeColors();

  return (
    <group
      position={tree.position}
      scale={[scale, scale, scale]}
      onClick={onClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Trunk with realistic proportions */}
      <mesh
        ref={trunkRef}
        position={[0, 1, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.08, 0.18, 2.2, 12]} />
        <meshStandardMaterial 
          color={colors.trunk}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Main foliage */}
      <mesh
        ref={leavesRef}
        position={[0, tree.type === 'pine' ? 3.2 : 2.8, 0]}
        castShadow
        receiveShadow
      >
        {tree.type === 'pine' ? (
          <coneGeometry args={[1.2, 2.5, 8]} />
        ) : (
          <sphereGeometry args={[1.3, 16, 12]} />
        )}
        <meshStandardMaterial 
          color={colors.leaves}
          roughness={0.7}
          metalness={0.0}
        />
      </mesh>

      {/* Secondary foliage for more realistic look */}
      {tree.type !== 'pine' && (
        <>
          <mesh
            position={[0.3, 2.4, 0.2]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.8, 12, 8]} />
            <meshStandardMaterial 
              color={colors.leavesSecondary}
              roughness={0.6}
              opacity={0.9}
              transparent
            />
          </mesh>
          <mesh
            position={[-0.2, 2.6, -0.3]}
            castShadow
            receiveShadow
          >
            <sphereGeometry args={[0.7, 12, 8]} />
            <meshStandardMaterial 
              color={colors.leavesSecondary}
              roughness={0.6}
              opacity={0.8}
              transparent
            />
          </mesh>
        </>
      )}

      {/* Pine tree additional layers */}
      {tree.type === 'pine' && (
        <>
          <mesh
            position={[0, 2.5, 0]}
            castShadow
            receiveShadow
          >
            <coneGeometry args={[1.0, 1.8, 8]} />
            <meshStandardMaterial 
              color={colors.leavesSecondary}
              roughness={0.7}
            />
          </mesh>
          <mesh
            position={[0, 1.8, 0]}
            castShadow
            receiveShadow
          >
            <coneGeometry args={[0.8, 1.4, 8]} />
            <meshStandardMaterial 
              color={colors.leaves}
              roughness={0.7}
            />
          </mesh>
        </>
      )}

      {/* Health indicator */}
      {tree.health < 50 && (
        <mesh position={[0, 3.5, 0]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color="#ff4444" />
        </mesh>
      )}
    </group>
  );
};