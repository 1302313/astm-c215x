import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ModulusResult, CombinedChartData } from '@/types/astm-c215';

interface CombinedChartProps {
  results: ModulusResult[];
}

export function CombinedChart({ results }: CombinedChartProps) {
  if (results.length === 0) {
    return (
      <Card className="mt-4">
        <CardContent className="p-8 text-center text-muted-foreground">
          No data to display. Perform calculations to see the chart.
        </CardContent>
      </Card>
    );
  }

  // Transform results into chart data format
  const chartData: CombinedChartData[] = results.map(result => ({
    frequency: result.frequency,
    [result.mode]: result.modulus,
  }));

  // Determine which datasets to show
  const hasLongitudinal = results.some(r => r.mode === 'longitudinal');
  const hasTransverse = results.some(r => r.mode === 'transverse');
  const hasTorsional = results.some(r => r.mode === 'torsional');

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-base">Combined Moduli vs Frequency</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="frequency" 
              label={{ value: 'Frequency (Hz)', position: 'insideBottom', offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: 'Modulus (GPa)', angle: -90, position: 'insideLeft' }}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '6px'
              }}
            />
            <Legend />
            {hasLongitudinal && (
              <Line 
                type="monotone" 
                dataKey="longitudinal" 
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Longitudinal (Eₗ)"
              />
            )}
            {hasTransverse && (
              <Line 
                type="monotone" 
                dataKey="transverse" 
                stroke="#7c3aed"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Transverse (Eₜ)"
              />
            )}
            {hasTorsional && (
              <Line 
                type="monotone" 
                dataKey="torsional" 
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Torsional (G)"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
