import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown } from "lucide-react";

interface RunwayRecoveryCardProps {
  annualRecovery: number;
  monthlyRecovery: number;
}

export function RunwayRecoveryCard({ annualRecovery, monthlyRecovery }: RunwayRecoveryCardProps) {
  // Approximate developer cost $400/day
  const engineeringDays = Math.round(annualRecovery / 400);

  return (
    <Card className="bg-card border-border relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-50" />
      <CardContent className="p-8 relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 rounded bg-success/20 flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-success" />
          </div>
          <h3 className="font-medium text-muted-foreground uppercase tracking-wider text-sm">Recovered Runway</h3>
        </div>
        
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-5xl font-mono font-bold text-foreground tracking-tight">
            ${annualRecovery.toLocaleString()}
          </span>
          <span className="text-muted-foreground font-medium">/year</span>
        </div>
        
        <div className="text-sm text-success font-medium mb-6">
          ${monthlyRecovery.toLocaleString()}/month optimization potential
        </div>
        
        <div className="pt-4 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            ≈ <span className="text-foreground font-medium">{engineeringDays} extra engineering days</span> recovered annually.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
