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
          {/* Realistic lighting setup */}
          <ambientLight intensity={0.3} color="#E6F3FF" />
          <directionalLight
            position={[15, 20, 10]}
            intensity={1.2}
            color="#FFF8DC"
            castShadow
            shadow-mapSize={[4096, 4096]}
            shadow-camera-far={50}
            shadow-camera-left={-15}
            shadow-camera-right={15}
            shadow-camera-top={15}
            shadow-camera-bottom={-15}
            shadow-bias={-0.0001}
          />
          
          {/* Fill light for natural look */}
          <directionalLight
            position={[-10, 8, -5]}
            intensity={0.3}
            color="#87CEEB"
          />
          
          {/* Subtle rim lighting */}
          <pointLight
            position={[0, 15, 0]}
            intensity={0.2}
            color="#FFE4B5"
            distance={30}
          />
          
          {/* Realistic environment */}
          <Sky 
            sunPosition={[100, 20, 100]}
            inclination={0.6}
            azimuth={0.1}
            turbidity={2}
            rayleigh={1}
            mieCoefficient={0.005}
            mieDirectionalG={0.8}
          />
          <Environment preset="forest" background={false} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#E6F3FF', 20, 100]} />
          
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