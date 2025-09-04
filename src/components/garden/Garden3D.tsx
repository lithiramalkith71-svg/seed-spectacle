import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import { Tree3D } from './Tree3D';
import { Ground } from './Ground';
import { Tree } from '@/types/garden';

interface Garden3DProps {
  trees: Tree[];
  onTreeClick?: (tree: Tree) => void;
}

export const Garden3D = ({ trees, onTreeClick }: Garden3DProps) => {
  return (
    <div className="w-full h-[60vh] bg-gradient-sky rounded-lg overflow-hidden shadow-card">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[2048, 2048]}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          {/* Environment */}
          <Sky sunPosition={[100, 20, 100]} />
          <Environment preset="park" />
          
          {/* Ground */}
          <Ground />
          
          {/* Trees */}
          {trees.map((tree) => (
            <Tree3D
              key={tree.id}
              tree={tree}
              onClick={() => onTreeClick?.(tree)}
            />
          ))}
          
          {/* Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={20}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};