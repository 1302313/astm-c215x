import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ModulusResult } from '@/types/astm-c215';

interface ResultsDisplayProps {
  result: ModulusResult;
  poissonsRatio?: number;
}

export function ResultsDisplay({ result, poissonsRatio }: ResultsDisplayProps) {
  const modeName = result.mode.charAt(0).toUpperCase() + result.mode.slice(1);
  const symbol = {
    longitudinal: 'Eₗ',
    transverse: 'Eₜ',
    torsional: 'G'
  }[result.mode];

  return (
    <Card className="mt-4 bg-muted/50 border-primary/20">
      <CardContent className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <span className="text-base font-semibold">
              {modeName} Modulus ({symbol}):
            </span>
            <Badge variant="secondary" className="text-lg px-4 py-1.5 font-mono">
              {result.modulus.toFixed(3)} {result.unit}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Resonant Frequency: <span className="font-medium">{result.frequency} Hz</span>
          </div>
          
          {poissonsRatio !== undefined && (
            <div className="text-sm pt-2 border-t border-border">
              <span className="font-medium">Poisson's Ratio (μ):</span>{' '}
              <span className="font-mono">{poissonsRatio.toFixed(4)}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
