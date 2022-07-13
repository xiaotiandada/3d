import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { FC, Suspense } from 'react';

import Helper from '../../components/Helper';
import Model from './components/Model';
// https://threejs.org/examples/#webgl_animation_keyframes

const Comic: FC = () => {
  return (
    <Canvas
      camera={{
        position: [5, 2, 8],
        fov: 40,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 100,
      }}
    >
      <color attach="background" args={[0xbfe3dd]} />
      <Suspense fallback={null}>
        <Model scale={[0.01, 0.01, 0.01]} position={[1, 1, 0]} />
        <Environment preset="sunset" background />
      </Suspense>
      {process.env.NODE_ENV === 'development' && (
        <group>
          <Helper />
        </group>
      )}

      <OrbitControls
        target={[0, 0.5, 0]}
        enableDamping={true}
        enablePan={false}
      />
    </Canvas>
  );
};

export default Comic;