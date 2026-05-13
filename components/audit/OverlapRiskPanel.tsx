import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OverlapWarning } from "@/types/audit";
import { AlertTriangle, Layers } from "lucide-react";

interface OverlapRiskPanelProps {
  warnings: OverlapWarning[];
}

export function OverlapRiskPanel({ warnings }: OverlapRiskPanelProps) {
  if (warnings.length === 0) {
    return (
      <Card className="bg-card border-border h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Layers className="h-5 w-5 text-muted-foreground" /> Stack Overlap Risk
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
          <Layers className="h-12 w-12 opacity-20 mb-4" />
          <p>No significant stack overlap detected.</p>
          <p className="text-sm">Your tool usage is highly differentiated.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" /> Stack Overlap Risk
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {warnings.map((warning, idx) => (
          <div key={idx} className="p-4 rounded-lg bg-secondary/50 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium capitalize">{warning.category} Tools</span>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${warning.riskLevel === 'high' ? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'}`}>
                {warning.riskLevel.toUpperCase()} RISK
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{warning.description}</p>
            <div className="flex flex-wrap gap-2">
              {warning.toolsInvolved.map((t, i) => (
                <span key={i} className="text-xs bg-background border border-border px-2 py-1 rounded text-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
