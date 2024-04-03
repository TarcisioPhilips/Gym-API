export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Calculates the distance between two coordinates on Earth using the Haversine formula.
 * @param from The starting coordinate.
 * @param to The ending coordinate.
 * @returns The distance between the two coordinates in kilometers.
 */
export function getDistanceBetweenCoordinates(from: Coordinate, to: Coordinate): number {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  const earthRadiusKm = 6371; 
  const dLat = degreesToRadians(to.latitude - from.latitude);
  const dLon = degreesToRadians(to.longitude - from.longitude);

  const fromLatInRadians = degreesToRadians(from.latitude);
  const toLatInRadians = degreesToRadians(to.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(fromLatInRadians) * Math.cos(toLatInRadians);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

/**
 * Converts degrees to radians.
 * @param degrees The angle in degrees.
 * @returns The angle in radians.
 */
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
