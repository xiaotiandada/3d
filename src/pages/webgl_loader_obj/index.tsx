import { Loader, OrbitControls, Stats } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useLoader } from '@react-three/fiber'
import { FC, useCallback, useEffect } from 'react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

import Helper from '../../components/Helper'
// https://threejs.org/examples/#webgl_animation_keyframes

let mouseX = 0
let mouseY = 0

function Scene() {
  const obj = useLoader(OBJLoader, '/models/obj/male02/male02.obj')
  const texture = useLoader(TextureLoader, '/textures/uv_grid_opengl.jpg')
  const { camera, scene, size } = useThree()

  obj.position.y = -95

  obj.traverse((child: any) => {
    if (child.isMesh) {
      child.material.map = texture
    }
  })

  const onDocumentMouseMove = useCallback(
    (event: MouseEvent) => {
      mouseX = (event.clientX - size.width / 2) / 2
      mouseY = (event.clientY - size.height / 2) / 2
    },
    [size]
  )

  useFrame(() => {
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05

    camera.lookAt(scene.position)
  })

  useEffect(() => {
    document.addEventListener('mousemove', onDocumentMouseMove)

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove)
    }
  }, [onDocumentMouseMove])

  return <primitive object={obj} />
}

const Comic: FC = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 250],
          fov: 45,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 2000,
        }}
      >
        <color attach="background" args={[0x000000]} />
        <ambientLight intensity={0.4} color={'0xcccccc'} />
        <pointLight intensity={0.8} color={'0xffffff'} />
        <Scene />
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
