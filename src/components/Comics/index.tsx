import {
  GizmoHelper,
  GizmoViewport,
  OrbitControls,
  useTexture,
} from '@react-three/drei';
import { Canvas, useThree } from '@react-three/fiber';
import { FC, useEffect } from 'react';
import * as THREE from 'three';

import background from './images/background.png';
import boomImage from './images/boom.png';
// import { TWEEN } from "three/examples/jsm/libs/tween.module.min.js";
// import Animations from '../../assets/utils/animations';
import layer_0 from './images/layer_0.png';
import layer_1 from './images/layer_1.png';
import layer_2 from './images/layer_2.png';
import layer_3 from './images/layer_3.png';
import layer_4 from './images/layer_4.png';
import layer_5 from './images/layer_5.png';
import layer_6 from './images/layer_6.png';
import layer_7 from './images/layer_7.png';

const layers = [
  layer_0,
  layer_1,
  layer_2,
  layer_3,
  layer_4,
  layer_5,
  layer_6,
  layer_7,
];
const aspect = 18;

// https://juejin.cn/post/7067344398912061454
// https://dragonir.github.io/3d/#/comic
// https://github.com/dragonir/3d/blob/master/src/containers/Comic/index.js

const Wrapper = () => {
  const { scene } = useThree();
  const textureBackground = useTexture(background);
  const textureBoom = useTexture(boomImage);

  useEffect(() => {
    scene.background = textureBackground;
  }, []);

  return (
    <group scale={[1.2, 1.2, 1.2]}>
      {layers.map((layer, index) => (
        <mesh
          key={index}
          position={[0, 0, index]}
          scale={
            index === 6
              ? [1 - index / aspect, 1 - index / aspect, 1 - index / aspect]
              : [1.5, 1.5, 1.5]
          }
        >
          <planeGeometry args={[10.41, 16]} />
          <meshPhysicalMaterial
            transparent
            side={THREE.DoubleSide}
            map={new THREE.TextureLoader().load(layer)}
          />
        </mesh>
      ))}
      <mesh position={[0, 0, -3]} scale={[0.8, 0.8, 0.8]}>
        <planeGeometry args={[36.76, 27.05]} />
        <meshPhongMaterial
          map={textureBoom}
          transparent
          opacity={0.7}
          shininess={160}
          specular={new THREE.Color(0xff6d00)}
        />
      </mesh>
    </group>
  );
};

const Comics: FC = () => {
  return (
    <Canvas
      camera={{
        position: [0, 0, 24],
        zoom: 1,
      }}
      linear
      flat
    >
      <mesh>
        <boxGeometry args={[0.001, 0.001, 0.001]} />
        <meshLambertMaterial color="red" />
      </mesh>
      <ambientLight />
      <directionalLight />
      <Wrapper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
      <OrbitControls
        enableDamping={true}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={1.2}
        maxPolarAngle={1.8}
        minAzimuthAngle={-0.6}
        maxAzimuthAngle={0.6}
      />
    </Canvas>
  );
};

export default Comics;
