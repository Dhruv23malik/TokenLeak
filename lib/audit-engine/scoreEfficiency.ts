import { AuditContext, AuditScore, ToolRecommendation, OverlapWarning } from '@/types/audit';

export function scoreEfficiency(
  context: AuditContext,
  recommendations: ToolRecommendation[],
  overlapWarnings: OverlapWarning[],
  totalSpend: number,
  totalSavings: number
): AuditScore {
  let efficiency = 100;

  // Deduct based on overlap
  const overlapRisk = overlapWarnings.length > 0 
    ? Math.min(overlapWarnings.reduce((acc, w) => acc + (w.riskLevel === 'high' ? 20 : 10), 0), 100)
    : 0;
  
  efficiency -= overlapRisk * 0.4;

  // Deduct based on savings potential
  const optimizationPotential = totalSpend > 0 ? (totalSavings / totalSpend) * 100 : 0;
  efficiency -= optimizationPotential * 0.6;

  // Calculate confidence based on data completeness
  const confidence = context.tools.length > 0 ? 85 + Math.min(context.tools.length * 2, 10) : 50;

  return {
    efficiency: Math.max(Math.round(efficiency), 0),
    overlapRisk: Math.round(overlapRisk),
    optimizationPotential: Math.round(optimizationPotential),
    confidence: Math.round(confidence),
  };
}
