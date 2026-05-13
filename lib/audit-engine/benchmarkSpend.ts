import { AuditContext, BenchmarkInsight } from '@/types/audit';

export function benchmarkSpend(context: AuditContext, totalSpend: number): BenchmarkInsight[] {
  const insights: BenchmarkInsight[] = [];
  
  if (context.teamSize === 0) return insights;

  const spendPerDeveloper = totalSpend / context.teamSize;

  // Approximate industry benchmark based on stage
  const benchmarkMap: Record<string, number> = {
    'pre_seed': 20,
    'seed': 40,
    'series_a': 70,
    'growth': 100,
    'enterprise': 150,
  };

  const expectedSpend = benchmarkMap[context.startupStage] || 50;
  
  if (spendPerDeveloper > expectedSpend * 1.2) {
    const diff = Math.round(((spendPerDeveloper - expectedSpend) / expectedSpend) * 100);
    insights.push({
      metric: 'Spend per Developer',
      value: `$${Math.round(spendPerDeveloper)}/mo`,
      comparison: 'above',
      description: `Your AI spend per developer is ${diff}% above comparable ${context.startupStage.replace('_', ' ')} startups.`,
    });
  } else if (spendPerDeveloper < expectedSpend * 0.8) {
    insights.push({
      metric: 'Spend per Developer',
      value: `$${Math.round(spendPerDeveloper)}/mo`,
      comparison: 'below',
      description: `Your AI stack is lean. You spend less per developer than average for your stage.`,
    });
  } else {
    insights.push({
      metric: 'Spend per Developer',
      value: `$${Math.round(spendPerDeveloper)}/mo`,
      comparison: 'average',
      description: `Your AI spend is well-aligned with industry benchmarks for your stage.`,
    });
  }

  return insights;
}
