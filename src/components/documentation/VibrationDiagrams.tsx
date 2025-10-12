import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function VibrationDiagrams() {
  return (
    <Card className="mb-6 bg-gradient-to-br from-background to-muted/20">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Vibration Mode Diagrams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Longitudinal - Professional Design */}
          <div className="space-y-4">
            <div className="text-center pb-2 border-b">
              <h3 className="text-base font-bold text-foreground">Longitudinal Mode</h3>
              <p className="text-xs text-muted-foreground mt-1">Axial Compression & Extension</p>
            </div>
            <svg 
              viewBox="0 0 240 140" 
              className="w-full h-auto border-2 rounded-lg bg-card shadow-sm"
              aria-label="Longitudinal vibration mode diagram"
            >
              <defs>
                <linearGradient id="long-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                </linearGradient>
                <marker id="arrow-long" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0,0 10,3 0,6" fill="hsl(var(--primary))" />
                </marker>
              </defs>
              
              {/* Original State (dashed) */}
              <rect 
                x="35" y="50" 
                width="90" height="30" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="4,3"
                opacity="0.4"
              />
              <text x="80" y="45" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.6">
                Original Length
              </text>
              
              {/* Compressed State */}
              <rect 
                x="40" y="50" 
                width="80" height="30" 
                fill="url(#long-grad)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              
              {/* Compression Arrows */}
              <line x1="30" y1="65" x2="38" y2="65" stroke="hsl(var(--primary))" strokeWidth="2.5" markerEnd="url(#arrow-long)" />
              <line x1="130" y1="65" x2="122" y2="65" stroke="hsl(var(--primary))" strokeWidth="2.5" markerEnd="url(#arrow-long)" />
              
              {/* Center Node */}
              <line 
                x1="80" y1="35" 
                x2="80" y2="95" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.5"
              />
              <text x="80" y="33" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                Node (Zero Motion)
              </text>
              
              {/* Waveform */}
              <path 
                d="M 145 65 Q 165 50, 185 65 Q 205 80, 225 65" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              <circle cx="145" cy="65" r="2.5" fill="hsl(var(--primary))" />
              <circle cx="225" cy="65" r="2.5" fill="hsl(var(--primary))" />
              
              {/* Formula */}
              <text x="80" y="108" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500">
                f = (π/2L)√(E/ρ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
              Compression and extension along the longitudinal axis
            </p>
          </div>

          {/* Transverse - Professional Design */}
          <div className="space-y-4">
            <div className="text-center pb-2 border-b">
              <h3 className="text-base font-bold text-foreground">Transverse Mode</h3>
              <p className="text-xs text-muted-foreground mt-1">Flexural Vibration</p>
            </div>
            <svg 
              viewBox="0 0 240 140" 
              className="w-full h-auto border-2 rounded-lg bg-card shadow-sm"
              aria-label="Transverse vibration mode diagram"
            >
              <defs>
                <linearGradient id="beam-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                </linearGradient>
                <filter id="shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                  <feOffset dx="0" dy="1" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.3"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              
              {/* Neutral Position (dashed) */}
              <line 
                x1="30" y1="65" 
                x2="135" y2="65" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="4,3"
                opacity="0.4"
              />
              <text x="20" y="65" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.6">
                Neutral
              </text>
              
              {/* Deflected Beam */}
              <path 
                d="M 30 65 Q 55 45, 82.5 65 Q 110 85, 135 65" 
                fill="url(#beam-grad)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="4"
                filter="url(#shadow)"
              />
              
              {/* Support Nodes */}
              <g>
                <circle cx="55" cy="65" r="4" fill="hsl(var(--destructive))" stroke="hsl(var(--background))" strokeWidth="2" />
                <text x="55" y="78" fontSize="8" fill="hsl(var(--destructive))" textAnchor="middle" fontWeight="600">
                  Node
                </text>
              </g>
              <g>
                <circle cx="110" cy="65" r="4" fill="hsl(var(--destructive))" stroke="hsl(var(--background))" strokeWidth="2" />
                <text x="110" y="78" fontSize="8" fill="hsl(var(--destructive))" textAnchor="middle" fontWeight="600">
                  Node
                </text>
              </g>
              
              {/* Max Deflection Arrow */}
              <line x1="82.5" y1="45" x2="82.5" y2="35" stroke="hsl(var(--primary))" strokeWidth="2.5" markerEnd="url(#arrow-long)" />
              <text x="82.5" y="33" fontSize="9" fill="hsl(var(--primary))" textAnchor="middle" fontWeight="500">
                Max Deflection
              </text>
              
              {/* Length Dimension */}
              <line x1="30" y1="90" x2="135" y2="90" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" />
              <text x="82.5" y="98" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                L (Specimen Length)
              </text>
              
              {/* Waveform */}
              <path 
                d="M 150 65 Q 170 50, 190 65 Q 210 80, 230 65" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              
              {/* Formula */}
              <text x="82.5" y="115" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500">
                f = (n²π/2L²)√(EI/μ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
              Flexural bending perpendicular to the longitudinal axis
            </p>
          </div>

          {/* Torsional - Professional Design */}
          <div className="space-y-4">
            <div className="text-center pb-2 border-b">
              <h3 className="text-base font-bold text-foreground">Torsional Mode</h3>
              <p className="text-xs text-muted-foreground mt-1">Twisting Vibration</p>
            </div>
            <svg 
              viewBox="0 0 240 140" 
              className="w-full h-auto border-2 rounded-lg bg-card shadow-sm"
              aria-label="Torsional vibration mode diagram"
            >
              <defs>
                <linearGradient id="twist-top" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                </linearGradient>
                <linearGradient id="twist-bottom" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.25" />
                </linearGradient>
              </defs>
              
              {/* Original State (dashed) */}
              <rect 
                x="30" y="48" 
                width="95" height="24" 
                fill="none" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="4,3"
                opacity="0.35"
              />
              
              {/* Twisted Specimen - Top Face */}
              <path 
                d="M 30 50 L 45 45 L 130 45 L 125 50 Z" 
                fill="url(#twist-top)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              
              {/* Twisted Specimen - Bottom Face */}
              <path 
                d="M 30 70 L 45 75 L 130 75 L 125 70 Z" 
                fill="url(#twist-bottom)" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              
              {/* Side Faces */}
              <line x1="30" y1="50" x2="30" y2="70" stroke="hsl(var(--primary))" strokeWidth="2.5" />
              <line x1="125" y1="50" x2="125" y2="70" stroke="hsl(var(--primary))" strokeWidth="2.5" />
              
              {/* Rotation Arrows - Left */}
              <path 
                d="M 35 35 A 10 10 0 0 1 50 38" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
                markerEnd="url(#arrow-long)"
              />
              <text x="38" y="35" fontSize="10" fill="hsl(var(--primary))" fontWeight="600">θ</text>
              
              {/* Rotation Arrows - Right */}
              <path 
                d="M 120 82 A 10 10 0 0 1 105 80" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
                markerEnd="url(#arrow-long)"
              />
              <text x="115" y="88" fontSize="10" fill="hsl(var(--primary))" fontWeight="600">θ</text>
              
              {/* Twist Axis */}
              <line 
                x1="77.5" y1="35" 
                x2="77.5" y2="85" 
                stroke="hsl(var(--muted-foreground))" 
                strokeWidth="2"
                strokeDasharray="3,3"
                opacity="0.5"
              />
              <text x="77.5" y="33" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                Twist Axis
              </text>
              
              {/* Waveform */}
              <path 
                d="M 150 60 Q 170 50, 190 60 Q 210 70, 230 60" 
                fill="none" 
                stroke="hsl(var(--primary))" 
                strokeWidth="2.5"
              />
              
              {/* Formulas */}
              <text x="80" y="105" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="500">
                τ = T × r / J
              </text>
              <text x="80" y="118" fontSize="10" fill="hsl(var(--muted-foreground))" textAnchor="middle">
                f = (n/2L)√(G/ρ)
              </text>
            </svg>
            <p className="text-xs text-muted-foreground text-center leading-relaxed px-2">
              Twisting rotation about the longitudinal axis
            </p>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
