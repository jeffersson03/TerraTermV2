import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import EarthGlobe from '@/features/globe/components/EarthGlobe'
import { GLOBE_CONFIG } from '@/features/globe/constants/globeConfig'

// Escena 3D: cámara, luces, fondo estelar, globo y controles orbitales.
function GlobeCanvas() {
  const { camera, controls, colors } = GLOBE_CONFIG

  return (
    <Canvas camera={camera} dpr={[1, 2]} className="h-full w-full">
      <color attach="background" args={[colors.space]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Stars radius={100} depth={50} count={4000} factor={4} fade speed={0.5} />
        <EarthGlobe />
      </Suspense>

      <OrbitControls
        enablePan={false}
        enableDamping
        autoRotate
        autoRotateSpeed={controls.autoRotateSpeed}
        minDistance={controls.minDistance}
        maxDistance={controls.maxDistance}
      />
    </Canvas>
  )
}

export default GlobeCanvas
