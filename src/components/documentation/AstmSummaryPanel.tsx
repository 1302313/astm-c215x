import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, FileText, TestTube, Radio, BookOpen } from "lucide-react";
import { useState } from "react";

export function AstmSummaryPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="mb-8 glass-card overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="flex items-center justify-between w-full hover:opacity-80 transition-opacity group">
            <CardTitle className="flex items-center gap-2.5 text-base">
              <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-semibold">ASTM C215-23 Standard Summary</span>
            </CardTitle>
            <div className="h-7 w-7 rounded-md bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ChevronDown 
                className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`} 
              />
            </div>
          </CollapsibleTrigger>
        </CardHeader>
        
        <CollapsibleContent>
          <CardContent className="space-y-5 pt-0">
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
              </p>
            </div>

            {/* Specimen Types */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TestTube className="h-4 w-4 text-primary" />
                <h3 className="font-semibold text-sm">Applicable Specimen Types</h3>
              </div>
              <div className="pl-6 grid sm:grid-cols-2 gap-3">
                <div className="text-sm p-3 rounded-lg bg-secondary/50">
                  <p className="font-semibold text-foreground mb-1.5">Prismatic Beams</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                    <li>Min. length-to-width ratio: 5:1</li>
                    <li>Typical: 75×100×400 mm or 100×100×500 mm</li>
                    <li>All three resonance modes</li>
                  </ul>
                </div>
                <div className="text-sm p-3 rounded-lg bg-secondary/50">
                  <p className="font-semibold text-foreground mb-1.5">Cylindrical Specimens</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-0.5 text-xs">
                    <li>Min. length-to-diameter ratio: 2:1</li>
                    <li>Typical: 150 mm ⌀ × 300 mm L</li>
                    <li>Standard cylinder molds</li>
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
              <div className="pl-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2.5 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-0.5">Longitudinal</p>
                    <p className="text-sm font-mono font-semibold">3–12 kHz</p>
                  </div>
                  <div className="text-center p-2.5 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-0.5">Transverse</p>
                    <p className="text-sm font-mono font-semibold">1–5 kHz</p>
                  </div>
                  <div className="text-center p-2.5 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground mb-0.5">Torsional</p>
                    <p className="text-sm font-mono font-semibold">2–8 kHz</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Actual frequencies depend on specimen geometry, density, and elastic properties.
                </p>
              </div>
            </div>

            {/* Standard References */}
            <div className="space-y-2 border-t pt-4">
              <h3 className="font-semibold text-sm">Key Standard Sections</h3>
              <div className="pl-6 grid sm:grid-cols-2 gap-1.5 text-sm text-muted-foreground">
                <p><span className="font-mono text-xs text-primary">§5</span> Apparatus and test setup</p>
                <p><span className="font-mono text-xs text-primary">§7</span> Resonant frequency determination</p>
                <p><span className="font-mono text-xs text-primary">§8</span> Dynamic elastic properties calc.</p>
                <p><span className="font-mono text-xs text-primary">§10</span> Precision and bias statements</p>
              </div>
            </div>

            <div className="border-t pt-3">
              <p className="text-[10px] text-muted-foreground italic">
                Reference: ASTM C215-23 — Standard Test Method for Fundamental Transverse, Longitudinal, 
                and Torsional Resonant Frequencies of Concrete Specimens
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
