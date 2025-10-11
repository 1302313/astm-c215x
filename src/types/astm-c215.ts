export type SpecimenType = 'beam' | 'cylinder';
export type ModulusMode = 'longitudinal' | 'transverse' | 'torsional';

export interface SpecimenGeometry {
  type: SpecimenType;
  length: number;
  mass: number;
  density: number;
  width?: number;
  depth?: number;
  diameter?: number;
}

export interface ModulusResult {
  mode: ModulusMode;
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
