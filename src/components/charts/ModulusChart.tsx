import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import type { ChartDataPoint } from '@/types/astm-c215';

interface ModulusChartProps {
  data: ChartDataPoint[];
  label?: string;
  title?: string;
  color?: string;
}

export function ModulusChart({ 
  data, 
  label = 'Modulus (GPa)', 
  title = 'Dynamic Modulus vs Frequency',
  color = 'hsl(var(--chart-longitudinal))'
}: ModulusChartProps) {
  if (data.length === 0) {
    return (
      <Card className="mt-4 border-dashed border-2 border-border/50 bg-transparent">
        <CardContent className="p-10 text-center">
          <BarChart3 className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No data to display. Perform calculations to see the chart.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 animate-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="frequency" 
              label={{ value: 'Frequency (Hz)', position: 'insideBottom', offset: -5 }}
              className="text-xs"
            />
            <YAxis 
              label={{ value: label, angle: -90, position: 'insideLeft' }}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '12px',
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="modulus" 
              stroke={color}
              strokeWidth={2.5}
              dot={{ r: 5, fill: color, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
              activeDot={{ r: 7 }}
              name={label}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
