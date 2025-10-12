import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, FileText, TestTube, Radio, BookOpen } from "lucide-react";
import { useState } from "react";

export function AstmSummaryPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-6 border-primary/20">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition-opacity">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              ASTM C215-23 Standard Summary
            </CardTitle>
            <ChevronDown 
              className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                isOpen ? 'transform rotate-180' : ''
              }`} 
            />
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-4 pt-0">
            {/* Purpose */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Purpose of the Test</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed pl-6">
                This standard describes test methods for determining the fundamental resonant frequencies 
                of concrete specimens. From these frequencies, the dynamic modulus of elasticity (E<sub>d</sub>), 
                dynamic modulus of rigidity (G<sub>d</sub>), and dynamic Poisson's ratio (μ<sub>d</sub>) can be calculated.
                The test is non-destructive and applicable to laboratory or field-cured specimens.
              </p>
            </div>

            {/* Specimen Types */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Applicable Specimen Types</h3>
              </div>
              <div className="pl-6 space-y-2">
                <div className="text-sm">
                  <p className="font-medium text-foreground">Prismatic Beams:</p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                    <li>Minimum length-to-width ratio: 5:1 (recommended)</li>
                    <li>Typical dimensions: 75 × 100 × 400 mm or 100 × 100 × 500 mm</li>
                    <li>Suitable for all three resonance modes</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-foreground">Cylindrical Specimens:</p>
                  <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                    <li>Minimum length-to-diameter ratio: 2:1</li>
                    <li>Typical: 150 mm diameter × 300 mm length</li>
                    <li>Compatible with standard cylinder molds</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Frequency Ranges */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Valid Frequency Ranges</h3>
              </div>
              <div className="pl-6 text-sm space-y-2">
                <p className="text-muted-foreground">
                  Typical resonant frequencies for concrete specimens:
                </p>
                <ul className="list-disc list-inside text-muted-foreground ml-2 space-y-1">
                  <li><span className="font-medium text-foreground">Longitudinal:</span> 3,000 – 12,000 Hz</li>
                  <li><span className="font-medium text-foreground">Transverse:</span> 1,000 – 5,000 Hz</li>
                  <li><span className="font-medium text-foreground">Torsional:</span> 2,000 – 8,000 Hz</li>
                </ul>
                <p className="text-muted-foreground mt-2 italic">
                  Note: Actual frequencies depend on specimen geometry, density, and elastic properties.
                </p>
              </div>
            </div>

            {/* Standard References */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-sm">Key Standard Sections</h3>
              <div className="pl-6 text-sm space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Section 5:</span> Apparatus and test setup</p>
                <p><span className="font-medium text-foreground">Section 7:</span> Fundamental resonant frequency determination</p>
                <p><span className="font-medium text-foreground">Section 8:</span> Calculation of dynamic elastic properties</p>
                <p><span className="font-medium text-foreground">Section 10:</span> Precision and bias statements</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground italic">
                Reference: ASTM C215-23 - Standard Test Method for Fundamental Transverse, Longitudinal, 
                and Torsional Resonant Frequencies of Concrete Specimens
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}