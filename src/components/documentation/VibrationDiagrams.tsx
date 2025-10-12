import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VibrationDiagrams() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">Vibration Mode Diagrams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Longitudinal Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-center">Longitudinal Mode</h3>
            <svg 
              viewBox="0 0 200 100" 
              className="w-full h-auto border rounded-md bg-muted/20"
              aria-label="Longitudinal vibration mode diagram"
            >
              {/* Specimen outline - compressed state */}
              <rect 
                x="20" y="35" 
                width="70" height="30" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Specimen - expanded state */}
              <rect 
                x="15" y="35" 
                width="80" height="30" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              
              {/* Arrows showing compression/expansion */}
              <path 
                d="M 30 50 L 20 50 M 25 45 L 20 50 L 25 55" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M 80 50 L 90 50 M 85 45 L 90 50 L 85 55" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Center line */}
              <line 
                x1="55" y1="20" 
                x2="55" y2="80" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                strokeDasharray="2,2"
              />
              
              {/* Waveform */}
              <path 
                d="M 110 50 Q 130 35, 150 50 Q 170 65, 190 50" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5"
              />
              
              <text 
                x="150" y="90" 
                fontSize="10" 
                fill="hsl(var(--muted-foreground))" 
                textAnchor="middle"
              >
                Axial vibration
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Compression and expansion along the length axis
            </p>
          </div>

          {/* Transverse Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-center">Transverse Mode</h3>
            <svg 
              viewBox="0 0 200 100" 
              className="w-full h-auto border rounded-md bg-muted/20"
              aria-label="Transverse vibration mode diagram"
            >
              {/* Specimen - neutral */}
              <rect 
                x="30" y="48" 
                width="80" height="4" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Specimen - bent state */}
              <path 
                d="M 30 50 Q 70 30, 110 50" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="3"
              />
              
              {/* Support points */}
              <circle cx="50" cy="50" r="3" fill="hsl(var(--destructive))" />
              <circle cx="90" cy="50" r="3" fill="hsl(var(--destructive))" />
              
              {/* Arrows showing bending */}
              <path 
                d="M 70 35 L 70 25 M 67 28 L 70 25 L 73 28" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M 30 50 L 30 60 M 27 57 L 30 60 L 33 57" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none"
              />
              <path 
                d="M 110 50 L 110 60 M 107 57 L 110 60 L 113 57" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Waveform */}
              <path 
                d="M 125 50 Q 145 35, 165 50 Q 185 65, 195 50" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5"
              />
              
              <text 
                x="160" y="90" 
                fontSize="10" 
                fill="hsl(var(--muted-foreground))" 
                textAnchor="middle"
              >
                Flexural vibration
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Bending perpendicular to the length axis
            </p>
          </div>

          {/* Torsional Mode */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-center">Torsional Mode</h3>
            <svg 
              viewBox="0 0 200 100" 
              className="w-full h-auto border rounded-md bg-muted/20"
              aria-label="Torsional vibration mode diagram"
            >
              {/* Specimen - front view neutral */}
              <rect 
                x="30" y="40" 
                width="80" height="20" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Specimen - twisted state (perspective) */}
              <path 
                d="M 30 45 L 40 40 L 120 40 L 110 45 Z" 
                fill="hsl(var(--primary)/0.2)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <path 
                d="M 30 55 L 40 60 L 120 60 L 110 55 Z" 
                fill="hsl(var(--primary)/0.1)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <line x1="30" y1="45" x2="30" y2="55" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="110" y1="45" x2="110" y2="55" stroke="hsl(var(--primary))" strokeWidth="2" />
              
              {/* Rotation arrows */}
              <path 
                d="M 35 30 A 8 8 0 0 1 45 30" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <path 
                d="M 45 30 L 43 27 M 45 30 L 43 33" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              
              <path 
                d="M 105 70 A 8 8 0 0 0 95 70" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <path 
                d="M 95 70 L 97 67 M 95 70 L 97 73" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              
              {/* Center axis */}
              <line 
                x1="70" y1="25" 
                x2="70" y2="75" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1" 
                strokeDasharray="2,2"
              />
              
              {/* Waveform */}
              <path 
                d="M 130 50 Q 150 35, 170 50 Q 190 65, 195 50" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="1.5"
              />
              
              <text 
                x="162" y="90" 
                fontSize="10" 
                fill="hsl(var(--muted-foreground))" 
                textAnchor="middle"
              >
                Twisting vibration
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Rotation about the longitudinal axis
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}