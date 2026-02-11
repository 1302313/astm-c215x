import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CombinedChart } from '@/components/charts/CombinedChart';
import { calculateLongitudinalModulus, calculateTransverseModulus, calculateTorsionalModulus, calculatePoissonsRatio, getExampleValues } from '@/utils/astm-calculations';
import { exportCombinedReport } from '@/utils/pdf-export';
import { unifiedBeamSchema, unifiedCylinderSchema } from '@/schemas/astm-schemas';
import type { ModulusResult, SpecimenGeometry } from '@/types/astm-c215';
import { Download, RotateCcw, Lightbulb, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UnifiedCalculator() {
  const [results, setResults] = useState<ModulusResult[]>([]);
  const [specimen, setSpecimen] = useState<SpecimenGeometry | null>(null);
  const [geometryType, setGeometryType] = useState<'beam' | 'cylinder'>('beam');
  const { toast } = useToast();
  
  const currentSchema = geometryType === 'beam' ? unifiedBeamSchema : unifiedCylinderSchema;
  
  const form = useForm({
    resolver: zodResolver(currentSchema),
    defaultValues: {
      geometry: geometryType,
      length: 0,
      mass: 0,
      density: 0,
      width: 0,
      depth: 0,
      diameter: 0,
      f_longitudinal: 0,
      f_transverse: 0,
      f_torsional: 0,
    }
  });

  const poissonsRatio = useMemo(() => {
    const E = results.find(r => r.mode === 'longitudinal')?.modulus;
    const G = results.find(r => r.mode === 'torsional')?.modulus;
    return E && G ? calculatePoissonsRatio(E * 1e9, G * 1e9) : null;
  }, [results]);

  const onSubmit = (data: any) => {
    try {
      const newResults: ModulusResult[] = [];
      
      const geometry: SpecimenGeometry = {
        type: data.geometry,
        length: data.length,
        mass: data.mass,
        density: data.density,
        ...(data.geometry === 'beam' 
          ? { width: data.width, depth: data.depth }
          : { diameter: data.diameter })
      };

      if (data.f_longitudinal > 0) {
        const E_L = calculateLongitudinalModulus(data.length, data.f_longitudinal, data.density);
        newResults.push({ mode: 'longitudinal', frequency: data.f_longitudinal, modulus: E_L / 1e9, unit: 'GPa' });
      }

      if (data.f_transverse > 0) {
        const E_T = calculateTransverseModulus(geometry, data.f_transverse);
        newResults.push({ mode: 'transverse', frequency: data.f_transverse, modulus: E_T / 1e9, unit: 'GPa' });
      }

      if (data.f_torsional > 0) {
        const G = calculateTorsionalModulus(geometry, data.f_torsional);
        newResults.push({ mode: 'torsional', frequency: data.f_torsional, modulus: G / 1e9, unit: 'GPa' });
      }

      setResults(newResults);
      setSpecimen(geometry);
      
      toast({
        title: 'Calculations Complete',
        description: `Calculated ${newResults.length} moduli`,
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
    setResults([]);
    setSpecimen(null);
    form.reset();
  };

  const handleExport = async () => {
    if (results.length === 0 || !specimen) return;
    try {
      await exportCombinedReport('combined-chart', results, specimen, poissonsRatio || undefined);
      toast({ title: 'Export Successful', description: 'Report downloaded as PDF' });
    } catch (error) {
      toast({ title: 'Export Error', description: 'Failed to generate PDF', variant: 'destructive' });
    }
  };

  const loadExample = () => {
    const example = geometryType === 'beam' ? getExampleValues().beam : getExampleValues().cylinder;
    Object.entries(example).forEach(([key, value]) => {
      form.setValue(key as any, value);
    });
    toast({ title: 'Example Loaded' });
  };

  return (
    <Card className="glass-card glow-ring">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2.5 text-lg">
          <div className="h-8 w-8 rounded-lg hero-gradient flex items-center justify-center">
            <Layers className="h-4 w-4 text-white" />
          </div>
          Unified Specimen Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="geometry" render={({ field }) => (
              <FormItem>
                <FormLabel>Specimen Type</FormLabel>
                <Select onValueChange={(v) => { setGeometryType(v as any); field.onChange(v); }} value={geometryType}>
                  <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="beam">Beam</SelectItem>
                    <SelectItem value="cylinder">Cylinder</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="length" render={({ field }) => (
                <FormItem><FormLabel>Length (m)</FormLabel><FormControl><Input type="number" step="0.001" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="mass" render={({ field }) => (
                <FormItem><FormLabel>Mass (kg)</FormLabel><FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <FormField control={form.control} name="density" render={({ field }) => (
              <FormItem><FormLabel>Density (kg/m³)</FormLabel><FormControl><Input type="number" step="1" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
            )} />

            {geometryType === 'beam' ? (
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="width" render={({ field }) => (
                  <FormItem><FormLabel>Width (m)</FormLabel><FormControl><Input type="number" step="0.001" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="depth" render={({ field }) => (
                  <FormItem><FormLabel>Depth (m)</FormLabel><FormControl><Input type="number" step="0.001" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
            ) : (
              <FormField control={form.control} name="diameter" render={({ field }) => (
                <FormItem><FormLabel>Diameter (m)</FormLabel><FormControl><Input type="number" step="0.001" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl><FormMessage /></FormItem>
              )} />
            )}

            <div className="pt-4 border-t"><h3 className="font-semibold mb-3">Resonant Frequencies</h3></div>
            <div className="grid grid-cols-3 gap-4">
              <FormField control={form.control} name="f_longitudinal" render={({ field }) => (
                <FormItem><FormLabel>Longitudinal (Hz)</FormLabel><FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="f_transverse" render={({ field }) => (
                <FormItem><FormLabel>Transverse (Hz)</FormLabel><FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="f_torsional" render={({ field }) => (
                <FormItem><FormLabel>Torsional (Hz)</FormLabel><FormControl><Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value) || 0)} /></FormControl></FormItem>
              )} />
            </div>

            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1 h-11 hero-gradient border-0 font-semibold text-white shadow-md hover:opacity-90 transition-opacity">Calculate All</Button>
              <Button type="button" variant="outline" onClick={loadExample} className="h-11"><Lightbulb className="h-4 w-4" /></Button>
            </div>
          </form>
        </Form>

        {results.length > 0 && (
          <>
            <Card className="mt-6"><CardContent className="p-4"><Table><TableHeader><TableRow><TableHead>Mode</TableHead><TableHead>Frequency (Hz)</TableHead><TableHead>Modulus (GPa)</TableHead></TableRow></TableHeader><TableBody>{results.map((r, i) => (<TableRow key={i}><TableCell className="font-medium">{r.mode.charAt(0).toUpperCase() + r.mode.slice(1)}</TableCell><TableCell>{r.frequency}</TableCell><TableCell className="font-mono">{r.modulus.toFixed(3)}</TableCell></TableRow>))}{poissonsRatio && (<TableRow><TableCell colSpan={2} className="font-semibold">Poisson's Ratio (μ)</TableCell><TableCell className="font-mono">{poissonsRatio.toFixed(4)}</TableCell></TableRow>)}</TableBody></Table></CardContent></Card>
            <div id="combined-chart"><CombinedChart results={results} /></div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleReset}><RotateCcw className="h-4 w-4 mr-2" />Reset</Button>
              <Button variant="outline" onClick={handleExport}><Download className="h-4 w-4 mr-2" />Export PDF</Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
