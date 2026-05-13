"use client";

import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from "recharts";
import { AuditResult } from "@/types/audit";

interface LeakRadarProps {
  result: AuditResult;
}

export function LeakRadar({ result }: LeakRadarProps) {
  // In a full implementation, these would be calculated rigorously by the engine.
  // For the prototype, we simulate these metrics based on the score and overlap warnings.
  const hasOverlap = result.overlapWarnings.length > 0;
  const overlapSeverity = hasOverlap ? 85 : 20;
  const planInflation = result.recommendations.length > 0 ? 75 : 15;
  const idleCapital = result.score.efficiency < 70 ? 80 : 30;
  const apiInefficiency = 45; // Simulated baseline
  const stackComplexity = Math.min(result.context.tools.length * 15, 100);
  const workflowRedundancy = hasOverlap ? 90 : 25;

  const data = [
    { subject: 'Overlap Risk', A: overlapSeverity, fullMark: 100 },
    { subject: 'Idle AI Capital', A: idleCapital, fullMark: 100 },
    { subject: 'Plan Inflation', A: planInflation, fullMark: 100 },
    { subject: 'API Inefficiency', A: apiInefficiency, fullMark: 100 },
    { subject: 'Stack Complexity', A: stackComplexity, fullMark: 100 },
    { subject: 'Workflow Redundancy', A: workflowRedundancy, fullMark: 100 },
  ];

  return (
    <div className="w-full h-[350px] bg-card border border-border/40 rounded-xl p-4 flex flex-col items-center shadow-sm">
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <h3 className="font-heading font-medium text-sm text-foreground/80">Leak Detection Radar</h3>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Multi-Axis Risk Analysis</span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#2A2A2D" strokeDasharray="3 3" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#8A8A93', fontSize: 11, fontFamily: 'Inter' }} 
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Risk Level"
            dataKey="A"
            stroke="#7C3AED"
            strokeWidth={1.5}
            fill="#7C3AED"
            fillOpacity={0.15}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#111214', 
              borderColor: '#2A2A2D',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}
            itemStyle={{ color: '#E4E4E7' }}
            labelStyle={{ color: '#8A8A93', marginBottom: '4px' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
