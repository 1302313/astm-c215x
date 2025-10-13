import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VibrationDiagrams() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Vibration Modes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Longitudinal Mode */}
          <div className="space-y-3">
            <div className="text-center pb-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Longitudinal</h3>
              <p className="text-xs text-muted-foreground mt-1">Axial Vibration</p>
            </div>
            <svg 
              viewBox="0 0 200 120" 
              className="w-full h-auto"
              aria-label="Longitudinal vibration mode"
            >
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto">
                  <polygon points="0,0 8,3 0,6" fill="hsl(var(--primary))" />
                </marker>
              </defs>
              
              {/* Original state - dashed */}
              <rect 
                x="40" y="45" 
                width="80" height="25" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Compressed state */}
              <rect 
                x="45" y="45" 
                width="70" height="25" 
                fill="hsl(var(--primary) / 0.1)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              
              {/* Arrows */}
              <line x1="30" y1="57.5" x2="43" y2="57.5" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />
              <line x1="130" y1="57.5" x2="117" y2="57.5" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrow)" />
              
              {/* Center node */}
              <line 
                x1="80" y1="38" 
                x2="80" y2="78" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                strokeDasharray="2,2"
                opacity="0.5"
              />
              
              {/* Formula */}
              <text x="80" y="100" fontSize="12" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500" fontFamily="Inter">
                f = (π/2L)√(E/ρ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Compression along axis
            </p>
          </div>

          {/* Transverse Mode */}
          <div className="space-y-3">
            <div className="text-center pb-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Transverse</h3>
              <p className="text-xs text-muted-foreground mt-1">Flexural Bending</p>
            </div>
            <svg 
              viewBox="0 0 200 120" 
              className="w-full h-auto"
              aria-label="Transverse vibration mode"
            >
              {/* Neutral position - dashed */}
              <line 
                x1="30" y1="60" 
                x2="130" y2="60" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Deflected beam */}
              <path 
                d="M 30 60 Q 55 40, 80 60 Q 105 80, 130 60" 
                fill="none"
                stroke="hsl(var(--primary))" 
                strokeWidth="3"
              />
              
              {/* Support nodes */}
              <circle cx="55" cy="60" r="3" fill="hsl(var(--destructive))" />
              <circle cx="105" cy="60" r="3" fill="hsl(var(--destructive))" />
              
              {/* Length dimension */}
              <line x1="30" y1="85" x2="130" y2="85" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
              <text x="80" y="92" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontFamily="Inter">
                L
              </text>
              
              {/* Formula */}
              <text x="80" y="108" fontSize="12" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500" fontFamily="Inter">
                f = (n²π/2L²)√(EI/μ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Bending perpendicular to axis
            </p>
          </div>

          {/* Torsional Mode */}
          <div className="space-y-3">
            <div className="text-center pb-3 border-b">
              <h3 className="text-sm font-semibold text-foreground">Torsional</h3>
              <p className="text-xs text-muted-foreground mt-1">Twisting</p>
            </div>
            <svg 
              viewBox="0 0 200 120" 
              className="w-full h-auto"
              aria-label="Torsional vibration mode"
            >
              {/* Original state - dashed */}
              <rect 
                x="40" y="45" 
                width="80" height="25" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                strokeDasharray="3,3"
                opacity="0.4"
              />
              
              {/* Twisted specimen */}
              <path 
                d="M 40 47 L 48 43 L 118 43 L 120 47 Z" 
                fill="hsl(var(--primary) / 0.15)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <path 
                d="M 40 68 L 48 72 L 118 72 L 120 68 Z" 
                fill="hsl(var(--primary) / 0.15)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
              />
              <line x1="40" y1="47" x2="40" y2="68" stroke="hsl(var(--primary))" strokeWidth="2" />
              <line x1="120" y1="47" x2="120" y2="68" stroke="hsl(var(--primary))" strokeWidth="2" />
              
              {/* Rotation arrow */}
              <path 
                d="M 45 35 A 8 8 0 0 1 57 37" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
              <text x="48" y="35" fontSize="11" fill="hsl(var(--primary))" fontWeight="600" fontFamily="Inter">θ</text>
              
              {/* Twist axis */}
              <line 
                x1="80" y1="38" 
                x2="80" y2="78" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="1.5"
                strokeDasharray="2,2"
                opacity="0.5"
              />
              
              {/* Formula */}
              <text x="80" y="100" fontSize="12" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500" fontFamily="Inter">
                f = (n/2L)√(G/ρ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center">
              Rotation about axis
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
