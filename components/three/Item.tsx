// import { useLoader } from 'react-three-fiber'
import * as React from 'react'
import * as THREE from 'three'

// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { useGLTF } from '@react-three/drei'

import { CMS } from '../../data'

type GLTFResult = GLTF & {
  nodes: {
    Scene: { children: [THREE.Mesh] }
    Talisman: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export const Item = ({
  item,
  head,
  ...props
}: JSX.IntrinsicElements['group'] & {
  item: CMS.Shop['items'][number]
  head: React.MutableRefObject<THREE.Bone | undefined>
}) => {
  const group = React.useRef<JSX.IntrinsicElements['group']>(null)
  const modal = (useGLTF('media/headclasp-2d.gltf') as any) as GLTFResult

  React.useEffect(() => {
    if (!group.current || !head.current) return
    head.current?.add(group.current as any)
  }, [])

  return <primitive object={modal.scene} />
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      visible={item.visible}
      scale={[item.scale.x, item.scale.y, item.scale.z]}
      position={[item.position.x, item.position.y, item.position.z]}
      rotation={[item.rotation.x, item.rotation.y, item.rotation.z].map(THREE.MathUtils.degToRad) as any}
    >
      <mesh
        castShadow
        material={modal.materials.Material}
        geometry={modal.nodes.Talisman.geometry}
        rotation={[Math.PI / 2, 0, -2.36]}
        scale={[10, 10, 10]}
      />
    </group>
  )
}
