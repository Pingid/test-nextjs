import { Canvas, ContainerProps } from 'react-three-fiber'
import { Suspense, useEffect, useRef } from 'react'
import * as THREE from 'three'

import store from './store'
import { Cloud } from '@react-three/drei'

export const SceneWrapper = (props: ContainerProps) => (
  <Canvas
    onMouseMove={(e) => {
      store.mouse.setState({ x: e.clientX, y: e.clientY })
    }}
    onTouchMove={(e) => {
      store.mouse.setState({ x: e.touches[0].clientX, y: e.touches[0].clientY })
    }}
    onTouchEnd={() => {
      const c = store.container.getState()
      store.mouse.setState({ x: c.w / 2 + c.l, y: c.h / 4 })
    }}
    onMouseLeave={() => {
      const c = store.container.getState()
      store.mouse.setState({ x: c.w / 2 + c.l, y: c.h / 2 })
    }}
    shadowMap
    camera={{ position: [0, -3, 18] }}
    {...props}
  />
)

export const useSceneContainer = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      store.container.setState({ w: rect.width, h: rect.height, l: rect.left, t: rect.top })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return ref
}

export const ObjectShadow = (props: JSX.IntrinsicElements['group']) => {
  const d = 8.25
  return (
    <group {...props}>
      <hemisphereLight groundColor={new THREE.Color(0xffffff)} intensity={0.4} position={[0, 10, 0]} />
      {/* <Sky distance={10000} inclination={0.53} rayleigh={15} turbidity={1} /> */}
      <directionalLight
        intensity={1.2}
        position={[-4, 5, 2]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
      />
      <directionalLight
        intensity={1.2}
        position={[4, 5, 2]}
        shadow-camera-left={d * -1}
        shadow-camera-bottom={d * -1}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-near={0.1}
        shadow-camera-far={1500}
        castShadow
      />
      {/* <ReflectorPlane scale={[2, 2, 2]} position={[0, 6, -5]} rotation={[0, 0, 0]} /> */}
      {/* <ReflectorPlane scale={[2, 2, 2]} position={[0, -4, 0]} rotation={[Math.PI / -2, 0, 0]} /> */}
      {/* <ReflectorPlane position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} />
      <ReflectorPlane position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <ReflectorPlane position={[5, 0, 0]} rotation={[0, Math.PI / -2, 0]} /> */}
      {/* <Plane receiveShadow rotation-x={-Math.PI / 2} position={[0, -4.999, 0]} args={[10, 10, 4, 4]}>
        <shadowMaterial attach="material" opacity={0.8} color="white" side={THREE.DoubleSide} />
      </Plane> */}
      <Suspense fallback={null}>
        <Cloud position={[0, 0, -5]} length={2} opacity={0.05} segments={100} />
        {/* <Cloud position={[-4, 2, 0]} args={[3, 2]} />
        <Cloud args={[3, 2]} />
        <Cloud position={[4, -2, 0]} args={[3, 2]} />
        <Cloud position={[4, 2, 0]} args={[3, 2]} /> */}
      </Suspense>
      <Suspense fallback={null}>{props.children}</Suspense>
      {/* <Box position={[0, -10.01, 0]} /> */}
      {/* <ShadowPlane rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -4, 0]} /> */}
    </group>
  )
}

export const ShadowPlane = ({ ...props }: JSX.IntrinsicElements['mesh']) => (
  <mesh {...props} receiveShadow>
    <planeBufferGeometry args={[200, 200, 200, 200]} />
    {/* <meshPhongMaterial shininess={1} reflectivity={1} side={THREE.DoubleSide} /> */}
    <shadowMaterial color="black" transparent opacity={0.5} side={THREE.DoubleSide} />
  </mesh>
)

export const Box = ({ ...props }: JSX.IntrinsicElements['mesh']) => (
  <mesh {...props} receiveShadow>
    <boxBufferGeometry args={[10, 10, 10, 10]} />
    <meshPhongMaterial shininess={1} reflectivity={1} side={THREE.DoubleSide} />
    {/* <shadowMaterial color="black" transparent opacity={0.5} side={THREE.DoubleSide} /> */}
  </mesh>
)

// export const ReflectorPlane = ({ ...props }: Partial<ReflectorProps>) => (
//   <Reflector
//     resolution={1024}
//     args={[10, 10]}
//     mirror={0.9}
//     blur={[0, 0]}
//     minDepthThreshold={0}
//     maxDepthThreshold={3}
//     depthScale={1}
//     {...props}
//   >
//     {(Material, props) => (
//       <Material side={THREE.DoubleSide} color={'white'} transparent opacity={0.5} metalness={0} {...props} />
//     )}
//   </Reflector>
// )
