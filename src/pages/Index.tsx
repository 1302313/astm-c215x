import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LongitudinalCalculator } from "@/components/calculator/LongitudinalCalculator";
import { TransverseCalculator } from "@/components/calculator/TransverseCalculator";
import { TorsionalCalculator } from "@/components/calculator/TorsionalCalculator";
import { UnifiedCalculator } from "@/components/calculator/UnifiedCalculator";
import { AstmSummaryPanel } from "@/components/documentation/AstmSummaryPanel";
import { HelpModal } from "@/components/documentation/HelpModal";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">ASTM C215 Modulus Calculator</h1>
          <p className="text-muted-foreground text-lg">
            Dynamic Modulus of Elasticity via Resonant Frequency Method
          </p>
        </header>

        <AstmSummaryPanel />
        
        <div className="flex justify-center mb-6">
          <HelpModal />
        </div>

        <Tabs defaultValue="longitudinal" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="longitudinal">Longitudinal</TabsTrigger>
            <TabsTrigger value="transverse">Transverse</TabsTrigger>
            <TabsTrigger value="torsional">Torsional</TabsTrigger>
            <TabsTrigger value="unified">Unified</TabsTrigger>
          </TabsList>

          <TabsContent value="longitudinal">
            <LongitudinalCalculator />
          </TabsContent>

          <TabsContent value="transverse">
            <TransverseCalculator />
          </TabsContent>

          <TabsContent value="torsional">
            <TorsionalCalculator />
          </TabsContent>

          <TabsContent value="unified">
            <UnifiedCalculator />
          </TabsContent>
        </Tabs>

        <footer className="mt-16 pb-8 text-center text-sm text-muted-foreground space-y-1">
          <p>Based on ASTM C215-14: Standard Test Method for Fundamental</p>
          <p>Transverse, Longitudinal, and Torsional Resonant Frequencies of Concrete Specimens</p>
          <p className="mt-4 font-medium">
            Designed and Curated by AMS<sup>13</sup>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
