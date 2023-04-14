import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { Mesh } from 'three'

const ModelContent = () => {
  return (
    <Canvas camera={{ position: [0, -100, 80], fov: 50 }} dpr={[1, 2]}>
      <spotLight
        position={[-100, -100, -100]}
        intensity={0.2}
        angle={0.3}
        penumbra={1}
      />
      <hemisphereLight
        color="white"
        groundColor="#ff0f00"
        position={[-7, 25, 13]}
        intensity={1}
      />
      <Suspense fallback={null}>
        <SelectToZoom>
          <Model name="Curly" position={[1, -11, -20]} rotation={[2, 0, -0]} />
          <Model name="DNA" position={[20, 0, -17]} rotation={[1, 1, -2]} />
          <Model
            name="Headphones"
            position={[20, 2, 4]}
            rotation={[1, 0, -1]}
          />
          <Model
            name="Notebook"
            position={[-21, -15, -13]}
            rotation={[2, 0, 1]}
          />
          <Model
            name="Rocket003"
            position={[18, 15, -25]}
            rotation={[1, 1, 0]}
          />
          <Model
            name="Roundcube001"
            position={[-25, -4, 5]}
            rotation={[1, 0, 0]}
            scale={0.5}
          />
          <Model
            name="Table"
            position={[1, -4, -28]}
            rotation={[1, 0, -1]}
            scale={0.5}
          />
          <Model
            name="VR_Headset"
            position={[7, -15, 28]}
            rotation={[1, 0, -1]}
            scale={5}
          />
          <Model
            name="Zeppelin"
            position={[-20, 10, 10]}
            rotation={[3, -1, 3]}
            scale={0.005}
          />
        </SelectToZoom>
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enableRotate={false}
        enablePan={false}
        makeDefault
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.75}
      />
    </Canvas>
  )
}

function Model({
  name,
  ...props
}: {
  name: string
  position: [x: number, y: number, z: number]
  rotation: [x: number, y: number, z: number]
  scale?: number
}) {
  const { nodes }: any = useGLTF('/models/compressed.glb')
  return (
    <group>
      <mesh
        geometry={nodes[name].geometry}
        material={nodes[name].material}
        material-emissive="red"
        material-roughness={1}
        dispose={null}
        {...props}
      />
    </group>
  )
}

function SelectToZoom({ children }: { children: React.ReactNode }) {
  const ref = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    ref.current.rotation.y += delta / 5

    ref.current.scale.set(1.3, 1.3, 1.3)

    ref.current.position.set(30, -10, 0)
  })

  return (
    <group>
      <mesh ref={ref}>{children}</mesh>
    </group>
  )
}

const ProductPage = () => {
  return (
    <div className="w-full h-[100vh] bg-gradient-to-br from-[#ff00ff] to-[#00ffff]">
      <div className="relative flex-1 p-8 max-w-2xl text-white z-20 select-none">
        <div className="text-[100px] leading-[1] font-bold mb-4 font-[DynaPuff]">
          <div>AI</div>
          <div>Intelligent</div>
          <div>Recommendation</div>
        </div>
        <article className="text-2xl font-semibold font-[OpenSans] mt-10">
          Our AI algorithm will recommend the most suitable products for you.
          Our advanced algorithm uses machine learning to analyze your
          preferences and suggest products that match your unique style and
          needs. With over 300 options to choose from, you{"'"}re sure to find
          the perfect product for you.
        </article>
      </div>
      <div className="fixed top-0 right-0 bottom-0 left-0 z-10">
        <ModelContent />
      </div>
    </div>
  )
}

export default function Demo1() {
  return <ProductPage />
}
