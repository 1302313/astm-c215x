import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { ModulusResult } from '@/types/astm-c215';
import { TrendingUp } from 'lucide-react';

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
    <Card className="mt-4 result-badge animate-in overflow-hidden">
      <CardContent className="p-0">
        <div className="flex items-stretch">
          {/* Accent bar */}
          <div className="w-1.5 hero-gradient shrink-0" />
          
          <div className="p-5 flex-1 space-y-3">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {modeName} Modulus ({symbol})
                </span>
              </div>
              <Badge className="text-lg px-5 py-2 font-mono font-bold bg-primary text-primary-foreground border-0 shadow-md">
                {result.modulus.toFixed(3)} {result.unit}
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground font-medium">
              Resonant Frequency: <span className="font-mono text-foreground">{result.frequency} Hz</span>
            </div>
            
            {poissonsRatio !== undefined && (
              <div className="text-xs pt-3 border-t border-primary/10">
                <span className="font-semibold text-muted-foreground">Poisson's Ratio (μ):</span>{' '}
                <span className="font-mono text-foreground font-bold">{poissonsRatio.toFixed(4)}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
