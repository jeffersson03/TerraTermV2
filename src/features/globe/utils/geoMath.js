const DEG_TO_RAD = Math.PI / 180

// Convierte latitud/longitud (grados) a coordenadas [x, y, z] sobre una esfera.
// Usa la misma orientación que SphereGeometry, para alinear texturas equirectangulares.
export function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * DEG_TO_RAD
  const theta = (lon + 180) * DEG_TO_RAD
  return [
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  ]
}

// Genera pares de vértices (segmentos) para paralelos y meridianos cada `stepDeg` grados.
export function buildGraticulePositions(radius, stepDeg, resolutionDeg = 2) {
  const points = []
  const pushSegment = (a, b) => points.push(...latLonToVector3(a[0], a[1], radius), ...latLonToVector3(b[0], b[1], radius))

  for (let lat = -90 + stepDeg; lat < 90; lat += stepDeg) {
    for (let lon = -180; lon < 180; lon += resolutionDeg) pushSegment([lat, lon], [lat, lon + resolutionDeg])
  }
  for (let lon = -180; lon < 180; lon += stepDeg) {
    for (let lat = -90; lat < 90; lat += resolutionDeg) pushSegment([lat, lon], [lat + resolutionDeg, lon])
  }
  return new Float32Array(points)
}
