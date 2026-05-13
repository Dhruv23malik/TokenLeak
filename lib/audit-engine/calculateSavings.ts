import { ToolUsage, AuditContext, ToolRecommendation } from '@/types/audit';

export function calculateSavings(context: AuditContext): {
  totalSpend: number;
  totalSavings: number;
  recommendations: ToolRecommendation[];
} {
  let totalSpend = 0;
  let totalSavings = 0;
  const recommendations: ToolRecommendation[] = [];

  for (const tool of context.tools) {
    totalSpend += tool.monthlySpend;

    // Simple heuristic for over-provisioning
    if (tool.currentPlan === 'enterprise' && context.teamSize < 50 && tool.usageLevel !== 'high') {
      const estimatedSavings = Math.max(tool.monthlySpend * 0.4, 0); // Estimate 40% savings
      totalSavings += estimatedSavings;
      
      recommendations.push({
        toolId: tool.id,
        recommendedPlan: 'team',
        potentialMonthlySavings: estimatedSavings,
        reasoning: `Enterprise tier is likely unnecessary for a team of ${context.teamSize} with ${tool.usageLevel} usage. Downgrading to Team plan recovers idle AI capital.`,
        confidence: 85,
      });
    } else if (tool.currentPlan === 'team' && context.teamSize <= 5 && tool.usageLevel === 'low') {
      const estimatedSavings = Math.max(tool.monthlySpend * 0.5, 0); 
      totalSavings += estimatedSavings;

      recommendations.push({
        toolId: tool.id,
        recommendedPlan: 'pro',
        potentialMonthlySavings: estimatedSavings,
        reasoning: `Low usage on a Team plan. Transitioning to individual Pro licenses for active users will optimize spend.`,
        confidence: 90,
      });
    }
  }

  return { totalSpend, totalSavings, recommendations };
}
