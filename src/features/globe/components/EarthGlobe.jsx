import { BackSide } from 'three'
import GlobeGraticule from '@/features/globe/components/GlobeGraticule'
import { GLOBE_CONFIG } from '@/features/globe/constants/globeConfig'

// Planeta base: superficie, retícula y halo atmosférico.
// Las capas de datos (LST, NDVI, etc.) se montarán como hijos de este grupo.
function EarthGlobe({ children }) {
  const { radius, segments, graticuleStepDeg, colors } = GLOBE_CONFIG

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshStandardMaterial color={colors.surface} roughness={1} metalness={0} />
      </mesh>

      <GlobeGraticule radius={radius * 1.001} stepDeg={graticuleStepDeg} color={colors.graticule} />

      <mesh scale={1.06}>
        <sphereGeometry args={[radius, segments, segments]} />
        <meshBasicMaterial color={colors.atmosphere} transparent opacity={0.08} side={BackSide} />
      </mesh>

      {children}
    </group>
  )
}

export default EarthGlobe
