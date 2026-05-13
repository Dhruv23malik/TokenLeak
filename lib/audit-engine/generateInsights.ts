import { AuditContext, AuditResult } from '@/types/audit';
import { calculateSavings } from './calculateSavings';
import { detectOverlap } from './detectOverlap';
import { scoreEfficiency } from './scoreEfficiency';
import { benchmarkSpend } from './benchmarkSpend';

export function runAudit(sessionId: string, context: AuditContext): AuditResult {
  const { totalSpend, totalSavings, recommendations } = calculateSavings(context);
  const overlapWarnings = detectOverlap(context.tools);
  const score = scoreEfficiency(context, recommendations, overlapWarnings, totalSpend, totalSavings);
  const benchmarks = benchmarkSpend(context, totalSpend);

  return {
    sessionId,
    context,
    totalMonthlySpend: totalSpend,
    potentialMonthlySavings: totalSavings,
    recoveredRunwayAnnual: totalSavings * 12,
    score,
    recommendations,
    overlapWarnings,
    benchmarks,
    createdAt: new Date().toISOString(),
  };
}
