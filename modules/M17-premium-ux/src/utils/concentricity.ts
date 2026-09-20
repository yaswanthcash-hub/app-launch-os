/**
 * Corner Concentricity Utilities
 * Implements the Golden Concentricity Formula: R_inner = max(0, R_outer - Padding)
 */

/**
 * Calculates the exact inner border radius for a nested child element.
 * Ensures the gap in the corner remains geometrically concentric and uniform.
 *
 * @param outerRadius Outer container border radius in points/pixels.
 * @param padding Padding between outer and inner borders in points/pixels.
 * @returns Geometrically concentric inner radius.
 */
export function getConcentricRadius(outerRadius: number, padding: number): number {
  return Math.max(0, outerRadius - padding);
}

/**
 * Standard hardware screen corner radii (approximate points).
 * Used to harmonize floating bottom sheets and navigation bars with hardware bezels.
 */
export const HARDWARE_BEZEL_RADII = {
  iPhoneStandard: 48,
  iPhonePro: 55,
  androidCurved: 40,
  defaultScreen: 50,
} as const;
