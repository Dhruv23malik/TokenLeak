export type PlanTier = 'free' | 'pro' | 'team' | 'enterprise';

export interface ToolUsage {
  id: string; // e.g., 'chatgpt', 'claude', 'github_copilot'
  name: string;
  category: 'chat' | 'coding' | 'api' | 'design' | 'other';
  currentPlan: PlanTier;
  monthlySpend: number;
  seats: number;
  usageLevel: 'low' | 'medium' | 'high';
}

export interface AuditContext {
  teamSize: number;
  startupStage: 'pre_seed' | 'seed' | 'series_a' | 'growth' | 'enterprise';
  primaryUseCase: 'engineering' | 'content' | 'general' | 'design';
  tools: ToolUsage[];
}

export interface AuditScore {
  efficiency: number; // 0-100
  overlapRisk: number; // 0-100
  optimizationPotential: number; // 0-100
  confidence: number; // 0-100
}

export interface ToolRecommendation {
  toolId: string;
  recommendedPlan: PlanTier;
  potentialMonthlySavings: number;
  reasoning: string;
  confidence: number;
}

export interface OverlapWarning {
  category: string;
  toolsInvolved: string[];
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export interface BenchmarkInsight {
  metric: string;
  value: string;
  comparison: 'below' | 'average' | 'above';
  description: string;
}

export interface AuditResult {
  sessionId: string;
  context: AuditContext;
  totalMonthlySpend: number;
  potentialMonthlySavings: number;
  recoveredRunwayAnnual: number;
  score: AuditScore;
  recommendations: ToolRecommendation[];
  overlapWarnings: OverlapWarning[];
  benchmarks: BenchmarkInsight[];
  createdAt: string;
}
