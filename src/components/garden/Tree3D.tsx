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

  // Get tree colors based on type
  const getTreeColors = () => {
    switch (tree.type) {
      case 'oak':
        return { trunk: '#8B4513', leaves: '#228B22' };
      case 'pine':
        return { trunk: '#654321', leaves: '#006400' };
      case 'cherry':
        return { trunk: '#8B4513', leaves: '#FFB6C1' };
      case 'maple':
        return { trunk: '#A0522D', leaves: '#FF4500' };
      default:
        return { trunk: '#8B4513', leaves: '#228B22' };
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
      {/* Trunk */}
      <mesh
        ref={trunkRef}
        position={[0, 1, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.1, 0.15, 2, 8]} />
        <meshLambertMaterial color={colors.trunk} />
      </mesh>

      {/* Leaves/Foliage */}
      <mesh
        ref={leavesRef}
        position={[0, 2.5, 0]}
        castShadow
        receiveShadow
      >
        {tree.type === 'pine' ? (
          <coneGeometry args={[1, 2, 8]} />
        ) : (
          <sphereGeometry args={[1.2, 12, 8]} />
        )}
        <meshLambertMaterial color={colors.leaves} />
      </mesh>

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