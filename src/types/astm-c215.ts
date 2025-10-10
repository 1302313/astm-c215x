export interface SpecimenGeometry {
  type: 'beam' | 'cylinder';
  length: number;
  mass: number;
  density: number;
  width?: number;
  depth?: number;
  diameter?: number;
}

export interface ModulusResult {
  mode: 'longitudinal' | 'transverse' | 'torsional';
  frequency: number;
  modulus: number;
  unit: 'GPa';
}

export interface ChartDataPoint {
  frequency: number;
  modulus: number;
}

export interface CombinedChartData {
  frequency: number;
  longitudinal?: number;
  transverse?: number;
  torsional?: number;
}
