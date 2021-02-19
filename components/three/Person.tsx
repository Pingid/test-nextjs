import { useFrame, useLoader } from 'react-three-fiber'
import * as React from 'react'
import * as THREE from 'three'

import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { getMouseDegrees } from './utils'
import store from './store'
import { Center } from '@react-three/drei'

type GLTFResult = GLTF & {
  nodes: {
    person: THREE.SkinnedMesh
    clavicle_L: THREE.Bone
    clavicle_R: THREE.Bone
    neck01: THREE.Bone
    neck02: THREE.Bone
    neck03: THREE.Bone
    head: THREE.Bone
  }
  materials: {
    person: THREE.MeshStandardMaterial
  }
}
function moveJoint(mouse: { x: number; y: number; w: number; h: number }, joint: any, degreeLimit = 40) {
  const degrees = getMouseDegrees(mouse.x, mouse.y, mouse.w, mouse.h, degreeLimit)
  joint.rotation.xD = THREE.MathUtils.lerp(joint.rotation.xD || 0, degrees.y, 0.1)
  joint.rotation.yD = THREE.MathUtils.lerp(joint.rotation.yD || 0, degrees.x, 0.1)
  joint.rotation.x = THREE.MathUtils.degToRad(joint.rotation.xD)
  joint.rotation.y = THREE.MathUtils.degToRad(joint.rotation.yD)
}

export const Person = ({
  head,
  ...props
}: JSX.IntrinsicElements['group'] & {
  container?: React.RefObject<HTMLDivElement>
  head?: React.MutableRefObject<THREE.Bone | undefined>
}) => {
  const group = React.useRef<JSX.IntrinsicElements['group']>(null)
  const { nodes, materials } = useLoader(GLTFLoader, '/modals/crystal-bust.glb') as GLTFResult

  React.useEffect(() => {
    console.log(materials)
    materials.person.color = new THREE.Color('white')
  })

  useFrame(() => {
    const x = store.mouse.getState()
    const c = store.container.getState()
    const v = { x: x.x - c.l, y: x.y, w: c.w, h: c.h }
    moveJoint(v, nodes.head, 30)
    moveJoint(v, nodes.neck02, 30)
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <Center rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={nodes.clavicle_L} />
        <primitive object={nodes.clavicle_R} />
        <primitive object={nodes.neck01} />
        <skinnedMesh
          material={materials.person}
          geometry={nodes.person.geometry}
          skeleton={nodes.person.skeleton}
        ></skinnedMesh>
      </Center>
    </group>
  )
}
