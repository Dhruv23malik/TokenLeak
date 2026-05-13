import { ToolUsage, OverlapWarning } from '@/types/audit';

export function detectOverlap(tools: ToolUsage[]): OverlapWarning[] {
  const warnings: OverlapWarning[] = [];
  const categoryMap: Record<string, string[]> = {};

  for (const tool of tools) {
    if (!categoryMap[tool.category]) {
      categoryMap[tool.category] = [];
    }
    categoryMap[tool.category].push(tool.name);
  }

  // Detect redundant subscriptions
  for (const [category, toolNames] of Object.entries(categoryMap)) {
    if (toolNames.length > 1) {
      warnings.push({
        category,
        toolsInvolved: toolNames,
        riskLevel: toolNames.length > 2 ? 'high' : 'medium',
        description: `High overlap risk in ${category} stack. Paying for ${toolNames.join(' and ')} creates redundant capabilities. Consolidating could recover runway.`,
      });
    }
  }

  return warnings;
}
