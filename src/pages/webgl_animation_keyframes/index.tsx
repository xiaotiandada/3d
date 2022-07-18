import { Environment, Loader, OrbitControls, Stats } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { FC, Suspense } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment'

import Helper from '../../components/Helper'
import Model from './components/Model'
// https://threejs.org/examples/#webgl_animation_keyframes

const Wrapper = () => {
  const { gl } = useThree()

  const pmremGenerator = new THREE.PMREMGenerator(gl)
  const PMREMGenerator = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.04
  ).texture

  return (
    <>
      <color attach="background" args={[0xbfe3dd]} />
      <Suspense fallback={null}>
        <Model scale={[0.01, 0.01, 0.01]} position={[1, 1, 0]} />
        <Environment map={PMREMGenerator} />
      </Suspense>
    </>
  )
}

const Comic: FC = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [5, 2, 8],
          fov: 40,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 100,
        }}
      >
        <Wrapper />
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
      <Loader />
      {process.env.NODE_ENV === 'development' && <Stats className="fps" />}
    </>
  )
}

export default Comic
