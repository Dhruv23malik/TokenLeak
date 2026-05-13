import { describe, it, expect } from 'vitest';
import { calculateSavings } from '../lib/audit-engine/calculateSavings';
import { detectOverlap } from '../lib/audit-engine/detectOverlap';
import { AuditContext, ToolUsage } from '../types/audit';

describe('Audit Engine - calculateSavings', () => {
  it('identifies enterprise over-provisioning and calculates savings', () => {
    const context: AuditContext = {
      teamSize: 10,
      startupStage: 'seed',
      primaryUseCase: 'engineering',
      tools: [
        {
          id: 'chatgpt-ent',
          name: 'ChatGPT',
          category: 'chat',
          currentPlan: 'enterprise',
          monthlySpend: 1000,
          seats: 10,
          usageLevel: 'medium'
        }
      ]
    };

    const result = calculateSavings(context);
    expect(result.totalSpend).toBe(1000);
    expect(result.totalSavings).toBeGreaterThan(0);
    expect(result.recommendations.length).toBe(1);
    expect(result.recommendations[0].recommendedPlan).toBe('team');
  });

  it('handles empty tools list', () => {
    const context: AuditContext = {
      teamSize: 10,
      startupStage: 'seed',
      primaryUseCase: 'engineering',
      tools: []
    };

    const result = calculateSavings(context);
    expect(result.totalSpend).toBe(0);
    expect(result.totalSavings).toBe(0);
    expect(result.recommendations.length).toBe(0);
  });
});

describe('Audit Engine - detectOverlap', () => {
  it('detects high risk overlap in same category', () => {
    const tools: ToolUsage[] = [
      { id: 't1', name: 'GitHub Copilot', category: 'coding', currentPlan: 'pro', monthlySpend: 19, seats: 1, usageLevel: 'high' },
      { id: 't2', name: 'Cursor', category: 'coding', currentPlan: 'pro', monthlySpend: 20, seats: 1, usageLevel: 'high' },
      { id: 't3', name: 'Windsurf', category: 'coding', currentPlan: 'pro', monthlySpend: 15, seats: 1, usageLevel: 'medium' }
    ];

    const warnings = detectOverlap(tools);
    expect(warnings.length).toBe(1);
    expect(warnings[0].category).toBe('coding');
    expect(warnings[0].riskLevel).toBe('high');
    expect(warnings[0].toolsInvolved).toContain('GitHub Copilot');
  });
});
