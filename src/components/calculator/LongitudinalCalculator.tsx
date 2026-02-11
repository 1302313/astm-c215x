import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TheoryDialog } from '@/components/ui/TheoryDialog';
import { ResultsDisplay } from './ResultsDisplay';
import { ModulusChart } from '@/components/charts/ModulusChart';
import { calculateLongitudinalModulus, getExampleValues } from '@/utils/astm-calculations';
import { exportReport } from '@/utils/pdf-export';
import { longitudinalSchema } from '@/schemas/astm-schemas';
import type { ModulusResult, ChartDataPoint } from '@/types/astm-c215';
import { Download, RotateCcw, Lightbulb, Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type LongitudinalFormData = z.infer<typeof longitudinalSchema>;

export function LongitudinalCalculator() {
  const [result, setResult] = useState<ModulusResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const { toast } = useToast();
  
  const form = useForm<LongitudinalFormData>({
    resolver: zodResolver(longitudinalSchema),
    defaultValues: {
      frequency: 0,
      length: 0,
      density: 0,
    }
  });

  const onSubmit = (data: LongitudinalFormData) => {
    try {
      const modulus = calculateLongitudinalModulus(data.length, data.frequency, data.density);
      const resultData: ModulusResult = {
        mode: 'longitudinal',
        frequency: data.frequency,
        modulus: modulus / 1e9,
        unit: 'GPa',
      };
      
      setResult(resultData);
      setChartData([...chartData, { 
        frequency: data.frequency, 
        modulus: modulus / 1e9 
      }]);

      toast({
        title: 'Calculation Complete',
        description: `Longitudinal modulus: ${(modulus / 1e9).toFixed(3)} GPa`,
      });
    } catch (error) {
      toast({
        title: 'Calculation Error',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleReset = () => {
    setResult(null);
    setChartData([]);
    form.reset();
    toast({
      title: 'Reset Complete',
      description: 'All data has been cleared',
    });
  };

  const handleExport = async () => {
    if (!result) return;
    
    try {
      await exportReport('longitudinal-chart', result, {
        type: 'beam',
        length: form.getValues('length'),
        mass: 0,
        density: form.getValues('density'),
      });
      
      toast({
        title: 'Export Successful',
        description: 'Report has been downloaded as PDF',
      });
    } catch (error) {
      toast({
        title: 'Export Error',
        description: 'Failed to generate PDF report',
        variant: 'destructive',
      });
    }
  };

  const loadExample = () => {
    const example = getExampleValues().beam;
    form.setValue('frequency', example.f_longitudinal);
    form.setValue('length', example.length);
    form.setValue('density', example.density);
    
    toast({
      title: 'Example Loaded',
      description: 'Example values have been filled in',
    });
  };

  return (
    <Card className="glass-card glow-ring">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-lg">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg hero-gradient flex items-center justify-center">
              <Calculator className="h-4 w-4 text-white" />
            </div>
            <span>Longitudinal Modulus of Elasticity</span>
          </div>
          <TheoryDialog mode="longitudinal" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Frequency (Hz)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        placeholder="e.g., 8000"
                        className="font-mono input-focus"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Length (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.001" 
                        placeholder="e.g., 0.4"
                        className="font-mono input-focus"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="density"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Density (kg/m³)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="1" 
                        placeholder="e.g., 2400"
                        className="font-mono input-focus"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2 flex-wrap pt-2">
              <Button type="submit" className="flex-1 h-11 hero-gradient border-0 font-semibold text-white shadow-md hover:opacity-90 transition-opacity">
                Calculate
              </Button>
              <Button type="button" variant="outline" onClick={loadExample} className="h-11 gap-2">
                <Lightbulb className="h-4 w-4" />
                Example
              </Button>
            </div>
          </form>
        </Form>
        
        {result && <ResultsDisplay result={result} />}
        
        <div id="longitudinal-chart">
          <ModulusChart 
            data={chartData} 
            label="Eₗ (GPa)"
            color="hsl(var(--chart-longitudinal))"
          />
        </div>

        {result && (
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleExport} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
