import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

interface TheoryDialogProps {
  mode: 'longitudinal' | 'transverse' | 'torsional';
}

interface TheoryContent {
  title: string;
  formula: string;
  description: string;
  variables: string[];
}

function getTheoryContent(mode: 'longitudinal' | 'transverse' | 'torsional'): TheoryContent {
  const theories = {
    longitudinal: {
      title: 'Longitudinal Modulus Theory',
      formula: 'E_d = 4 × L² × n² × ρ',
      description: 'The longitudinal modulus measures the material\'s stiffness under axial vibration. It\'s derived assuming the specimen is vibrating in its fundamental longitudinal mode.',
      variables: [
        'E_d: Longitudinal Dynamic Modulus of Elasticity (Pa)',
        'L: Specimen length (m)',
        'n: Longitudinal resonant frequency (Hz)',
        'ρ: Density (kg/m³)',
      ],
    },
    transverse: {
      title: 'Transverse Modulus Theory',
      formula: 'Beam: E_d = C × m × n² / (b × t³) | Cylinder: E_d = 1.6067 × (L³/D⁴) × m × n²',
      description: 'The transverse modulus is derived from flexural vibration. A correction factor T\' is applied based on specimen geometry to account for shear deformation and rotary inertia effects.',
      variables: [
        'E_d: Transverse Dynamic Modulus of Elasticity (Pa)',
        'C: Geometric constant with T\' correction factor',
        'm: Mass of specimen (kg)',
        'n: Transverse resonant frequency (Hz)',
        'b: Width (m), t: Depth (m) for beam',
        'D: Diameter (m), L: Length (m) for cylinder',
      ],
    },
    torsional: {
      title: 'Torsional Modulus Theory',
      formula: 'Cylinder: G = 4 × L × m × n² / (π × R⁴) | Beam: G = (4 × L × m × n²) / β',
      description: 'The torsional modulus reflects shear stiffness. For beams, the shape factor β accounts for the polar moment of inertia of the rectangular cross-section.',
      variables: [
        'G: Torsional Modulus of Rigidity (Pa)',
        'L: Length (m)',
        'm: Mass (kg)',
        'n: Torsional resonant frequency (Hz)',
        'R: Radius (m) for cylinder',
        'β: Shape factor = b × t³ × (1/3 - 0.21 × t/b) for beam',
      ],
    },
  };

  return theories[mode];
}

export function TheoryDialog({ mode }: TheoryDialogProps) {
  const theory = getTheoryContent(mode);
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Info className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{theory.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm">Formula (ASTM C215-14):</h4>
            <code className="bg-muted p-3 rounded block text-sm font-mono break-all">
              {theory.formula}
            </code>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Description:</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{theory.description}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Variables:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {theory.variables.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
