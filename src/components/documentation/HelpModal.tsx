import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, BookOpen, Calculator, FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function HelpModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="gap-2">
          <HelpCircle className="h-5 w-5" />
          Help & Reference
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BookOpen className="h-5 w-5 text-primary" />
            ASTM C215 Help & Reference Guide
          </DialogTitle>
          <DialogDescription>
            Comprehensive guide to understanding and using the resonant frequency test method
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="calculations">
              <Calculator className="h-4 w-4 mr-2" />
              Calculations
            </TabsTrigger>
            <TabsTrigger value="examples">
              <BookOpen className="h-4 w-4 mr-2" />
              Examples
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(85vh-200px)] pr-4">
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4 mt-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Test Method Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  ASTM C215 establishes standardized methods for measuring the dynamic elastic properties 
                  of concrete specimens through resonance techniques. The method involves exciting a concrete 
                  specimen at varying frequencies and identifying the fundamental resonant frequencies.
                </p>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold">Significance and Use</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                  <li>Non-destructive assessment of concrete elastic properties</li>
                  <li>Quality control during production and field placement</li>
                  <li>Monitoring changes in modulus due to age, curing, or deterioration</li>
                  <li>Research on concrete mix designs and material properties</li>
                  <li>Correlation studies with static modulus of elasticity</li>
                </ul>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold">Test Setup Requirements</h3>
                <div className="bg-muted/30 p-4 rounded-md space-y-2 text-sm">
                  <p><span className="font-medium">Equipment needed:</span></p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li>Frequency generator or impact hammer</li>
                    <li>Accelerometer or microphone sensor</li>
                    <li>Frequency analyzer or spectrum analyzer</li>
                    <li>Soft support pads (foam, rubber) for specimen</li>
                  </ul>
                  <p className="mt-3"><span className="font-medium">Specimen preparation:</span></p>
                  <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                    <li>Clean and dry specimens before testing</li>
                    <li>Measure dimensions accurately (±0.5 mm)</li>
                    <li>Determine mass to nearest 0.1% of specimen weight</li>
                    <li>Test at consistent temperature (typically 23°C ± 2°C)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-3 border-t pt-4">
                <h3 className="font-semibold">Key Definitions</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium">Dynamic Modulus of Elasticity (E<sub>d</sub>)</p>
                    <p className="text-muted-foreground">
                      The modulus calculated from longitudinal or transverse resonant frequencies. 
                      Represents the specimen's resistance to deformation under dynamic loading.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Dynamic Modulus of Rigidity (G<sub>d</sub>)</p>
                    <p className="text-muted-foreground">
                      The modulus calculated from torsional resonant frequency. Represents the 
                      specimen's resistance to shear deformation.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Fundamental Frequency</p>
                    <p className="text-muted-foreground">
                      The lowest resonant frequency at which the specimen vibrates in a particular mode. 
                      Higher harmonics are integer multiples of the fundamental frequency.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Calculations Tab */}
            <TabsContent value="calculations" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Calculation Formulas</h3>
                
                {/* Longitudinal */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-primary">Longitudinal Modulus (E<sub>L</sub>)</h4>
                  <div className="bg-muted/30 p-3 rounded font-mono text-sm">
                    E<sub>L</sub> = 4 × L² × n² × ρ
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><strong>L</strong> = length of specimen (m)</li>
                      <li><strong>n</strong> = fundamental longitudinal frequency (Hz)</li>
                      <li><strong>ρ</strong> = density of specimen (kg/m³)</li>
                    </ul>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Applicable to prismatic and cylindrical specimens where length is much greater than cross-sectional dimensions.
                  </p>
                </div>

                {/* Transverse Beam */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-primary">Transverse Modulus (E<sub>T</sub>) - Beam</h4>
                  <div className="bg-muted/30 p-3 rounded font-mono text-sm">
                    E<sub>T</sub> = (n² × m × L³) / (B × b × t³) × T
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><strong>n</strong> = fundamental transverse frequency (Hz)</li>
                      <li><strong>m</strong> = mass of specimen (kg)</li>
                      <li><strong>L</strong> = length (m)</li>
                      <li><strong>b</strong> = width (m)</li>
                      <li><strong>t</strong> = thickness/depth (m)</li>
                      <li><strong>B</strong> = shape factor (≈ 1.000 for standard beams)</li>
                      <li><strong>T</strong> = correction factor (≈ 5.093 for fundamental mode)</li>
                    </ul>
                  </div>
                </div>

                {/* Transverse Cylinder */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-primary">Transverse Modulus (E<sub>T</sub>) - Cylinder</h4>
                  <div className="bg-muted/30 p-3 rounded font-mono text-sm">
                    E<sub>T</sub> = 1.6067 × (L³/d⁴) × m × n² × T
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><strong>L</strong> = length (m)</li>
                      <li><strong>d</strong> = diameter (m)</li>
                      <li><strong>m</strong> = mass (kg)</li>
                      <li><strong>n</strong> = fundamental transverse frequency (Hz)</li>
                      <li><strong>T</strong> = correction factor</li>
                    </ul>
                  </div>
                </div>

                {/* Torsional */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-primary">Torsional Modulus (G<sub>d</sub>)</h4>
                  <div className="bg-muted/30 p-3 rounded font-mono text-sm">
                    <div>Beam: G<sub>d</sub> = (4 × L × m × n²) / (b × t × R)</div>
                    <div className="mt-2">Cylinder: G<sub>d</sub> = (16 × L × m × n²) / (π × d⁴)</div>
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><strong>R</strong> = shape factor [b² + t²] / (b × t) for beams</li>
                      <li><strong>Other symbols</strong> same as defined above</li>
                    </ul>
                  </div>
                </div>

                {/* Poisson's Ratio */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-primary">Dynamic Poisson's Ratio (μ<sub>d</sub>)</h4>
                  <div className="bg-muted/30 p-3 rounded font-mono text-sm">
                    μ<sub>d</sub> = (E<sub>d</sub> / 2G<sub>d</sub>) - 1
                  </div>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p><strong>Where:</strong></p>
                    <ul className="list-disc list-inside ml-2 space-y-1">
                      <li><strong>E<sub>d</sub></strong> = dynamic modulus of elasticity (Pa)</li>
                      <li><strong>G<sub>d</sub></strong> = dynamic modulus of rigidity (Pa)</li>
                    </ul>
                    <p className="mt-2">
                      <strong>Typical range:</strong> 0.15 to 0.25 for concrete
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Examples Tab */}
            <TabsContent value="examples" className="space-y-4 mt-4">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Example Calculations</h3>
                
                {/* Example 1 */}
                <div className="border rounded-md p-4 space-y-3 bg-primary/5">
                  <h4 className="font-semibold">Example 1: Longitudinal Test on Concrete Beam</h4>
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Given:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                      <li>Length (L) = 0.400 m</li>
                      <li>Mass = 9.60 kg</li>
                      <li>Volume = 0.004 m³</li>
                      <li>Density (ρ) = 2400 kg/m³</li>
                      <li>Measured frequency (n) = 8000 Hz</li>
                    </ul>
                    
                    <p className="font-medium mt-3">Solution:</p>
                    <div className="bg-muted/30 p-3 rounded space-y-1 font-mono text-xs">
                      <p>E<sub>L</sub> = 4 × L² × n² × ρ</p>
                      <p>E<sub>L</sub> = 4 × (0.400)² × (8000)² × 2400</p>
                      <p>E<sub>L</sub> = 4 × 0.16 × 64,000,000 × 2400</p>
                      <p>E<sub>L</sub> = 98,304,000,000 Pa</p>
                      <p className="text-primary font-bold">E<sub>L</sub> = 98.3 GPa</p>
                    </div>
                  </div>
                </div>

                {/* Example 2 */}
                <div className="border rounded-md p-4 space-y-3">
                  <h4 className="font-semibold">Example 2: Transverse Test on Concrete Cylinder</h4>
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Given:</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                      <li>Length (L) = 0.300 m</li>
                      <li>Diameter (d) = 0.150 m</li>
                      <li>Mass (m) = 12.72 kg</li>
                      <li>Measured frequency (n) = 3200 Hz</li>
                      <li>Correction factor (T) = 1.0</li>
                    </ul>
                    
                    <p className="font-medium mt-3">Solution:</p>
                    <div className="bg-muted/30 p-3 rounded space-y-1 font-mono text-xs">
                      <p>E<sub>T</sub> = 1.6067 × (L³/d⁴) × m × n² × T</p>
                      <p>E<sub>T</sub> = 1.6067 × (0.300³/0.150⁴) × 12.72 × (3200)² × 1.0</p>
                      <p>E<sub>T</sub> = 1.6067 × 53.333 × 12.72 × 10,240,000</p>
                      <p>E<sub>T</sub> = 111,347,000,000 Pa</p>
                      <p className="text-primary font-bold">E<sub>T</sub> = 111.3 GPa</p>
                    </div>
                  </div>
                </div>

                {/* Example 3 */}
                <div className="border rounded-md p-4 space-y-3 bg-primary/5">
                  <h4 className="font-semibold">Example 3: Calculating Poisson's Ratio</h4>
                  <div className="text-sm space-y-2">
                    <p className="font-medium">Given (from previous tests):</p>
                    <ul className="list-disc list-inside ml-2 space-y-1 text-muted-foreground">
                      <li>E<sub>d</sub> = 40.0 GPa (from longitudinal or transverse test)</li>
                      <li>G<sub>d</sub> = 16.0 GPa (from torsional test)</li>
                    </ul>
                    
                    <p className="font-medium mt-3">Solution:</p>
                    <div className="bg-muted/30 p-3 rounded space-y-1 font-mono text-xs">
                      <p>μ<sub>d</sub> = (E<sub>d</sub> / 2G<sub>d</sub>) - 1</p>
                      <p>μ<sub>d</sub> = (40.0 / (2 × 16.0)) - 1</p>
                      <p>μ<sub>d</sub> = (40.0 / 32.0) - 1</p>
                      <p>μ<sub>d</sub> = 1.25 - 1</p>
                      <p className="text-primary font-bold">μ<sub>d</sub> = 0.25</p>
                    </div>
                    <p className="text-muted-foreground text-xs mt-2">
                      This value of 0.25 is within the typical range for concrete (0.15-0.25).
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h4 className="font-semibold mb-2">Tips for Accurate Testing</h4>
                  <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground ml-2">
                    <li>Take multiple measurements (at least 3) and average the results</li>
                    <li>Ensure specimen is fully supported on soft pads at nodal points (typically L/4 from ends)</li>
                    <li>Look for clear, sharp peaks in frequency spectrum indicating resonance</li>
                    <li>Verify specimen dimensions with calipers accurate to 0.5 mm</li>
                    <li>Allow specimens to equilibrate to test temperature for at least 2 hours</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}