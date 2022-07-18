import {
  GizmoHelper,
  GizmoViewport,
  Loader,
  OrbitControls,
  Stats,
  useAnimations,
  useFBX,
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { FC, useEffect, useRef } from 'react'
import * as THREE from 'three'

// https://threejs.org/examples/#webgl_animation_keyframes

// TODO: 不知道类型 先手动定义
type GridType = {
  material: THREE.LineBasicMaterial
} & THREE.GridHelper

function Scene() {
  const { scene, gl } = useThree()
  const state = useThree()
  const fbx = useFBX('/models/fbx/Samba Dancing.fbx')
  const { animations }: any = fbx
  const { actions } = useAnimations(animations, fbx)
  const meshRef = useRef<THREE.Mesh>(null)

  fbx.traverse((child: any) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x = -Math.PI / 2
      meshRef.current.receiveShadow = true
    }
  }, [meshRef])

  useEffect(() => {
    gl.shadowMap.enabled = true
    scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000)
  }, [state, fbx, scene, gl])

  useEffect(() => {
    actions[animations[0]?.name]?.play()
  }, [actions, animations])

  return (
    <>
      <primitive object={fbx} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow ref={meshRef}>
        <planeGeometry args={[2000, 2000]} />
        <meshPhongMaterial color="0x999999" depthWrite={false} />
      </mesh>
    </>
  )
}

const Helper = () => {
  const gridHelperRef = useRef<GridType>(null)
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.material.opacity = 0.2
      gridHelperRef.current.material.transparent = true
    }
  }, [gridHelperRef])
  return (
    <>
      <gridHelper
        args={[2000, 20, '0x000000', '0x000000']}
        ref={gridHelperRef}
      />
      <axesHelper />
      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport />
      </GizmoHelper>
    </>
  )
}

const Webgl_loader_fbx: FC = () => {
  const dirLightRef = useRef<THREE.DirectionalLight>(null)
  useEffect(() => {
    if (dirLightRef.current) {
      dirLightRef.current.shadow.camera.top = 180
      dirLightRef.current.shadow.camera.bottom = -100
      dirLightRef.current.shadow.camera.left = -120
      dirLightRef.current.shadow.camera.right = 120
    }
  }, [dirLightRef])

  return (
    <>
      <Canvas
        camera={{
          position: [100, 200, 300],
          fov: 45,
          aspect: window.innerWidth / window.innerHeight,
          near: 1,
          far: 2000,
        }}
        linear
      >
        <color attach="background" args={[0xa0a0a0]} />
        <hemisphereLight
          color={'0xffffff'}
          groundColor={'0x444444'}
          position={[0, 200, 0]}
        />
        <directionalLight
          ref={dirLightRef}
          position={[0, 200, 100]}
          castShadow
        />
        <Scene />
        {process.env.NODE_ENV === 'development' && (
          <group>
            <Helper />
          </group>
        )}
        <OrbitControls target={[0, 100, 0]} />
      </Canvas>
      <Loader />
      {process.env.NODE_ENV === 'development' && <Stats className="fps" />}
    </>
  )
}

export default Webgl_loader_fbx
