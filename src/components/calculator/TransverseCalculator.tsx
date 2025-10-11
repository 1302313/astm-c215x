import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TheoryDialog } from '@/components/ui/TheoryDialog';
import { ResultsDisplay } from './ResultsDisplay';
import { ModulusChart } from '@/components/charts/ModulusChart';
import { calculateTransverseModulus, getExampleValues } from '@/utils/astm-calculations';
import { exportReport } from '@/utils/pdf-export';
import { transverseBeamSchema, transverseCylinderSchema } from '@/schemas/astm-schemas';
import type { ModulusResult, ChartDataPoint, SpecimenGeometry } from '@/types/astm-c215';
import { Download, RotateCcw, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function TransverseCalculator() {
  const [result, setResult] = useState<ModulusResult | null>(null);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [specimenType, setSpecimenType] = useState<'beam' | 'cylinder'>('beam');
  const [lastGeometry, setLastGeometry] = useState<SpecimenGeometry | null>(null);
  const { toast } = useToast();
  
  const currentSchema = specimenType === 'beam' ? transverseBeamSchema : transverseCylinderSchema;
  
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      mode: specimenType,
      frequency: 0,
      length: 0,
      mass: 0,
      width: 0,
      depth: 0,
      diameter: 0,
    }
  });

  const onSubmit = (data: any) => {
    try {
      const geometry: SpecimenGeometry = {
        type: data.mode,
        length: data.length,
        mass: data.mass,
        density: 0,
        ...(data.mode === 'beam' 
          ? { width: data.width, depth: data.depth }
          : { diameter: data.diameter })
      };

      const modulus = calculateTransverseModulus(geometry, data.frequency);
      const resultData: ModulusResult = {
        mode: 'transverse',
        frequency: data.frequency,
        modulus: modulus / 1e9,
        unit: 'GPa',
      };
      
      setResult(resultData);
      setLastGeometry(geometry);
      setChartData([...chartData, { 
        frequency: data.frequency, 
        modulus: modulus / 1e9 
      }]);

      toast({
        title: 'Calculation Complete',
        description: `Transverse modulus: ${(modulus / 1e9).toFixed(3)} GPa`,
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
    setLastGeometry(null);
    form.reset();
    toast({
      title: 'Reset Complete',
      description: 'All data has been cleared',
    });
  };

  const handleExport = async () => {
    if (!result || !lastGeometry) return;
    
    try {
      await exportReport('transverse-chart', result, lastGeometry);
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
    if (specimenType === 'beam') {
      const example = getExampleValues().beam;
      form.setValue('frequency', example.f_transverse);
      form.setValue('length', example.length);
      form.setValue('mass', example.mass);
      form.setValue('width', example.width);
      form.setValue('depth', example.depth);
    } else {
      const example = getExampleValues().cylinder;
      form.setValue('frequency', example.f_transverse);
      form.setValue('length', example.length);
      form.setValue('mass', example.mass);
      form.setValue('diameter', example.diameter);
    }
    
    toast({
      title: 'Example Loaded',
      description: 'Example values have been filled in',
    });
  };

  const handleSpecimenTypeChange = (value: string) => {
    const newType = value as 'beam' | 'cylinder';
    setSpecimenType(newType);
    form.setValue('mode', newType);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Transverse Modulus of Elasticity</span>
          <TheoryDialog mode="transverse" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specimen Type</FormLabel>
                  <Select onValueChange={handleSpecimenTypeChange} value={specimenType}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beam">Beam</SelectItem>
                      <SelectItem value="cylinder">Cylinder</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="e.g., 5000"
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
                      placeholder="e.g., 0.3"
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
              name="mass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mass (kg)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      placeholder="e.g., 4.5"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {specimenType === 'beam' ? (
              <>
                <FormField
                  control={form.control}
                  name="width"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Width (m)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.001" 
                          placeholder="e.g., 0.1"
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
                  name="depth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Depth (m)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.001" 
                          placeholder="e.g., 0.1"
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <FormField
                control={form.control}
                name="diameter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diameter (m)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.001" 
                        placeholder="e.g., 0.15"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

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
        
        <div id="transverse-chart">
          <ModulusChart 
            data={chartData} 
            label="Eₜ (GPa)"
            color="#7c3aed"
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
