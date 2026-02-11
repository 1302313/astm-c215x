import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LongitudinalCalculator } from "@/components/calculator/LongitudinalCalculator";
import { TransverseCalculator } from "@/components/calculator/TransverseCalculator";
import { TorsionalCalculator } from "@/components/calculator/TorsionalCalculator";
import { UnifiedCalculator } from "@/components/calculator/UnifiedCalculator";
import { AstmSummaryPanel } from "@/components/documentation/AstmSummaryPanel";
import { HelpModal } from "@/components/documentation/HelpModal";
import { ArrowRightLeft, Waves, RotateCw, Layers } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="hero-gradient py-12 px-4">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzMuMzE0IDAgNi0yLjY4NiA2LTZzLTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2em0wIDJjLTQuNDE4IDAtOC0zLjU4Mi04LThzMy41ODItOCA4LTggOCAzLjU4MiA4IDgtMy41ODIgOC04IDh6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="container mx-auto max-w-4xl relative z-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs font-medium tracking-wider uppercase mb-2">
                <Waves className="h-3 w-3" />
                ASTM C215-23 Standard
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                Modulus Calculator
              </h1>
              <p className="text-white/75 text-base md:text-lg max-w-xl mx-auto font-light">
                Dynamic Modulus of Elasticity via Resonant Frequency Method
              </p>
            </div>
          </div>
        </div>
        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-background rounded-t-[2rem]" />
      </header>

      <div className="container mx-auto px-4 max-w-4xl -mt-2 pb-16">
        {/* Quick actions row */}
        <div className="flex justify-center gap-3 mb-8">
          <HelpModal />
        </div>

        <AstmSummaryPanel />

        <Tabs defaultValue="longitudinal" className="w-full animate-fade-up">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-14 p-1.5 bg-secondary/80 backdrop-blur-sm rounded-xl">
            <TabsTrigger 
              value="longitudinal" 
              className="rounded-lg gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-200"
            >
              <ArrowRightLeft className="h-4 w-4 hidden sm:block" />
              Longitudinal
            </TabsTrigger>
            <TabsTrigger 
              value="transverse"
              className="rounded-lg gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-200"
            >
              <Waves className="h-4 w-4 hidden sm:block" />
              Transverse
            </TabsTrigger>
            <TabsTrigger 
              value="torsional"
              className="rounded-lg gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-200"
            >
              <RotateCw className="h-4 w-4 hidden sm:block" />
              Torsional
            </TabsTrigger>
            <TabsTrigger 
              value="unified"
              className="rounded-lg gap-2 text-sm font-medium data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-200"
            >
              <Layers className="h-4 w-4 hidden sm:block" />
              Unified
            </TabsTrigger>
          </TabsList>

          <TabsContent value="longitudinal" className="animate-in">
            <LongitudinalCalculator />
          </TabsContent>

          <TabsContent value="transverse" className="animate-in">
            <TransverseCalculator />
          </TabsContent>

          <TabsContent value="torsional" className="animate-in">
            <TorsionalCalculator />
          </TabsContent>

          <TabsContent value="unified" className="animate-in">
            <UnifiedCalculator />
          </TabsContent>
        </Tabs>

        <footer className="mt-20 pb-8 text-center space-y-2">
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-border to-transparent mb-6" />
          <p className="text-xs text-muted-foreground">
            Based on ASTM C215-14: Standard Test Method for Fundamental Transverse,
          </p>
          <p className="text-xs text-muted-foreground">
            Longitudinal, and Torsional Resonant Frequencies of Concrete Specimens
          </p>
          <p className="mt-4 text-xs font-semibold text-muted-foreground/70 tracking-widest uppercase">
            Designed & Curated by AMS<sup>13</sup>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
