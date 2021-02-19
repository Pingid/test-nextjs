import { ObjectShadow, SceneWrapper, useSceneContainer } from './three/lib'
import { OrbitControls } from '@react-three/drei'
// import { useSpring } from 'react-spring/three'
import { Item } from './three/Item'
import { CMS } from '../data'
import { useRef } from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControlsImpl: OrbitControls
    }
  }
}

export const Shop = () => {
  const ref = useSceneContainer()
  const head = useRef()
  // const props = useSpring({
  //   from: { position: [0, 0, -100] as any },
  //   position: [0, 0, 0] as any,
  //   rotation: [0, 0, 0] as any,
  //   // config: { mass: 3, friction: 40, tension: 400 },
  // })
  // console.log(CMS.shop.items[0])
  return (
    <div className="flex">
      <div ref={ref} className="w-screen h-screen bg-black">
        <SceneWrapper pixelRatio={window.devicePixelRatio}>
          <group position={[0, 1, 0]}>
            {/* <a.group {...props}> */}
            <ObjectShadow>
              {/* <Person position={[0, 0, 0]} scale={[1.5, 1.5, 1.5]} head={head} /> */}

              <Item item={CMS.shop.items[0]} head={head} />
            </ObjectShadow>
            {/* </a.group> */}
          </group>
          <OrbitControls enablePan={false} />
        </SceneWrapper>
      </div>
    </div>
  )
}
