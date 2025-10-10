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
import { Download, RotateCcw, Lightbulb } from 'lucide-react';
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
        modulus: modulus / 1e9, // Convert to GPa
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
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Longitudinal Modulus of Elasticity</span>
          <TheoryDialog mode="longitudinal" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency (Hz)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="e.g., 8000"
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
                  <FormLabel>Length (m)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.001" 
                      placeholder="e.g., 0.4"
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
                  <FormLabel>Density (kg/m³)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="1" 
                      placeholder="e.g., 2400"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 flex-wrap">
              <Button type="submit" className="flex-1">
                Calculate
              </Button>
              <Button type="button" variant="outline" onClick={loadExample}>
                <Lightbulb className="h-4 w-4 mr-2" />
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
            color="#2563eb"
          />
        </div>

        {result && (
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
