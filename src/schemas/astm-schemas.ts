import { z } from 'zod';

export const transverseBeamSchema = z.object({
  mode: z.literal('beam'),
  frequency: z.number().positive('Frequency must be positive'),
  length: z.number().positive('Length must be positive'),
  mass: z.number().positive('Mass must be positive'),
  width: z.number().positive('Width must be positive'),
  depth: z.number().positive('Depth must be positive'),
});

export const transverseCylinderSchema = z.object({
  mode: z.literal('cylinder'),
  frequency: z.number().positive('Frequency must be positive'),
  length: z.number().positive('Length must be positive'),
  mass: z.number().positive('Mass must be positive'),
  diameter: z.number().positive('Diameter must be positive'),
});

export const longitudinalSchema = z.object({
  frequency: z.number().positive('Frequency must be positive'),
  length: z.number().positive('Length must be positive'),
  density: z.number().positive('Density must be positive'),
});

export const torsionalBeamSchema = z.object({
  mode: z.literal('beam'),
  frequency: z.number().positive('Frequency must be positive'),
  length: z.number().positive('Length must be positive'),
  density: z.number().positive('Density must be positive'),
  width: z.number().positive('Width must be positive'),
  depth: z.number().positive('Depth must be positive'),
});

export const torsionalCylinderSchema = z.object({
  mode: z.literal('cylinder'),
  frequency: z.number().positive('Frequency must be positive'),
  length: z.number().positive('Length must be positive'),
  density: z.number().positive('Density must be positive'),
  diameter: z.number().positive('Diameter must be positive'),
});

export const unifiedBeamSchema = z.object({
  geometry: z.literal('beam'),
  length: z.number().positive('Length must be positive'),
  mass: z.number().positive('Mass must be positive'),
  density: z.number().positive('Density must be positive'),
  width: z.number().positive('Width must be positive'),
  depth: z.number().positive('Depth must be positive'),
  f_longitudinal: z.number().min(0),
  f_transverse: z.number().min(0),
  f_torsional: z.number().min(0),
});

export const unifiedCylinderSchema = z.object({
  geometry: z.literal('cylinder'),
  length: z.number().positive('Length must be positive'),
  mass: z.number().positive('Mass must be positive'),
  density: z.number().positive('Density must be positive'),
  diameter: z.number().positive('Diameter must be positive'),
  f_longitudinal: z.number().min(0),
  f_transverse: z.number().min(0),
  f_torsional: z.number().min(0),
});
