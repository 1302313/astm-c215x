import type { SpecimenGeometry } from '@/types/astm-c215';

/**
 * Calculate Longitudinal Modulus of Elasticity (E_d)
 * ASTM C215-14 Formula: E_d = 4 × L² × n² × ρ
 * 
 * @param length - Length of specimen (m)
 * @param frequency - Fundamental longitudinal frequency (Hz)
 * @param density - Density of specimen (kg/m³)
 * @returns Longitudinal modulus in Pa
 */
export function calculateLongitudinalModulus(
  length: number,
  frequency: number,
  density: number
): number {
  return 4 * Math.pow(length, 2) * Math.pow(frequency, 2) * density;
}

/**
 * Calculate correction factor T' for transverse modulus
 * Based on ASTM C215-14 Table 1
 * Simplified implementation - uses polynomial approximation
 */
function getCorrectionFactor(length: number, width: number, depth: number): number {
  const ratio = depth / length;
  // Simplified correction factor calculation
  // Full implementation would use lookup table from ASTM C215-14
  return 1 + 6.585 * Math.pow(ratio, 2);
}

/**
 * Calculate Transverse Modulus of Elasticity (E_d)
 * ASTM C215-14 Formulas:
 * - Beam: E_d = C × m × n² / (b × t³)
 * - Cylinder: E_d = 1.6067 × (L³/D⁴) × m × n²
 * 
 * @param geometry - Specimen geometry parameters
 * @param frequency - Fundamental transverse frequency (Hz)
 * @returns Transverse modulus in Pa
 */
export function calculateTransverseModulus(
  geometry: SpecimenGeometry,
  frequency: number
): number {
  const { length, mass, width, depth, diameter, type } = geometry;
  
  if (type === 'beam' && width && depth) {
    const T = getCorrectionFactor(length, width, depth);
    const C = 0.9464 * Math.pow(length / width, 2) * T;
    return (C * mass * Math.pow(frequency, 2)) / (width * Math.pow(depth, 3));
  } else if (type === 'cylinder' && diameter) {
    const C = 1.6067 * Math.pow(length, 3) / Math.pow(diameter, 4);
    return C * mass * Math.pow(frequency, 2);
  }
  
  throw new Error('Invalid geometry for transverse calculation');
}

/**
 * Calculate shape factor β for torsional modulus
 * Based on ASTM C215-14
 */
function getShapeFactorBeta(width: number, depth: number): number {
  // Shape factor for rectangular cross-section
  // J = β × b × t³
  const ratio = depth / width;
  // Simplified - full implementation uses table lookup
  return width * Math.pow(depth, 3) * (1/3 - 0.21 * ratio * (1 - Math.pow(ratio, 4) / 12));
}

/**
 * Calculate Torsional Modulus of Rigidity (G)
 * ASTM C215-14 Formulas:
 * - Cylinder: G = 4 × L × m × n² / (π × R⁴)
 * - Beam: G = (4 × L × m × n²) / β
 * 
 * @param geometry - Specimen geometry parameters
 * @param frequency - Fundamental torsional frequency (Hz)
 * @returns Torsional modulus in Pa
 */
export function calculateTorsionalModulus(
  geometry: SpecimenGeometry,
  frequency: number
): number {
  const { length, mass, diameter, width, depth, type, density } = geometry;
  
  if (type === 'cylinder' && diameter) {
    const radius = diameter / 2;
    return (4 * length * mass * Math.pow(frequency, 2)) / 
           (Math.PI * Math.pow(radius, 4));
  } else if (type === 'beam' && width && depth && density) {
    const beta = getShapeFactorBeta(width, depth);
    return (4 * length * mass * Math.pow(frequency, 2)) / beta;
  }
  
  throw new Error('Invalid geometry for torsional calculation');
}

/**
 * Calculate Poisson's Ratio
 * Formula: μ = (E / 2G) - 1
 * 
 * @param E - Longitudinal modulus (Pa)
 * @param G - Torsional modulus (Pa)
 * @returns Poisson's ratio (dimensionless)
 */
export function calculatePoissonsRatio(E: number, G: number): number {
  return (E / (2 * G)) - 1;
}

/**
 * Get example specimen values for testing
 */
export function getExampleValues() {
  return {
    beam: {
      geometry: 'beam' as const,
      length: 0.4,
      mass: 2.5,
      density: 2400,
      width: 0.1,
      depth: 0.1,
      f_longitudinal: 8000,
      f_transverse: 5000,
      f_torsional: 7000,
    },
    cylinder: {
      geometry: 'cylinder' as const,
      length: 0.3,
      mass: 4.5,
      density: 2400,
      diameter: 0.15,
      f_longitudinal: 7500,
      f_transverse: 4800,
      f_torsional: 6500,
    }
  };
}
