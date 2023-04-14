import { Scroll, ScrollControls, Stats, useScroll } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { FC, Suspense, useRef } from 'react'

import Helper from '../../components/Helper'

function Foo(props: any) {
  const ref = useRef()
  const data = useScroll()
  console.log('data', data)
  useFrame(() => {
    // data.offset = current scroll position, between 0 and 1, dampened
    // data.delta = current delta, between 0 and 1, dampened

    // Will be 0 when the scrollbar is at the starting position,
    // then increase to 1 until 1 / 3 of the scroll distance is reached
    const a = data.range(0, 1 / 3)
    // Will start increasing when 1 / 3 of the scroll distance is reached,
    // and reach 1 when it reaches 2 / 3rds.
    const b = data.range(1 / 3, 1 / 3)
    // Same as above but with a margin of 0.1 on both ends
    const c = data.range(1 / 3, 1 / 3, 0.1)
    // Will move between 0-1-0 for the selected range
    const d = data.curve(1 / 3, 1 / 3)
    // Same as above, but with a margin of 0.1 on both ends
    // const d = data.curve(1 / 3, 1 / 3, 0.1)
    // Returns true if the offset is in range and false if it isn't
    const e = data.visible(2 / 3, 1 / 3)
    // The visible function can also receive a margin
    const f = data.visible(2 / 3, 1 / 3, 0.1)
  })
  return <mesh ref={ref} {...props} />
}

function ScrollControlsExample() {
  const { viewport, size } = useThree()
  return (
    <ScrollControls
      pages={3} // Each page takes 100% of the height of the canvas
      distance={1} // A factor that increases scroll bar travel (default: 1)
      damping={4} // Friction, higher is faster (default: 4)
      horizontal={false} // Can also scroll horizontally (default: false)
      infinite={false} // Can also scroll infinitely (default: false)
    >
      <Scroll
        html
        // style={{
        //   width: '100%',
        // }}
      >
        <h1
          style={{
            position: 'absolute',
            top: `${size.height * 0.1}px`,
            right: `${size.width * 0.2}px`,
            color: '#EC2D2D',
          }}
        >
          85 Scroll down! 86{' '}
        </h1>
      </Scroll>
    </ScrollControls>
  )
}

const Comic: FC = () => {
  return (
    <>
      <Canvas
        orthographic
        camera={{ zoom: 80 }}
        gl={{ alpha: false, antialias: false, stencil: false, depth: false }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <ScrollControlsExample />
        </Suspense>
        {process.env.NODE_ENV === 'development' && (
          <group>
            <Helper />
          </group>
        )}
      </Canvas>
      {process.env.NODE_ENV === 'development' && <Stats className="fps" />}
    </>
  )
}

export default Comic
