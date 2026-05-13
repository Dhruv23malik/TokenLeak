"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { useAuditStore } from "@/store/auditStore";
import { runAudit } from "@/lib/audit-engine/generateInsights";
import { AuditResult } from "@/types/audit";
import { RunwayRecoveryCard } from "@/components/audit/RunwayRecoveryCard";
import { SpendEfficiencyMeter } from "@/components/audit/SpendEfficiencyMeter";
import { OverlapRiskPanel } from "@/components/audit/OverlapRiskPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function AuditResultsPage() {
  const params = useParams();
  const { context } = useAuditStore();
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    // In a real application, we would fetch the audit by ID from Supabase.
    // For this prototype, we'll run the audit engine locally if context exists.
    if (context.tools.length > 0) {
      const auditResult = runAudit(params.id as string, context);
      setResult(auditResult);
    }
  }, [context, params.id]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
          <p className="text-muted-foreground">Loading audit intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Financial Intelligence Dashboard</h1>
            <p className="text-muted-foreground">Audit ID: <span className="font-mono text-xs">{result.sessionId}</span></p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border">
              <Share2 className="h-4 w-4 mr-2" /> Share Report
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-white">
              Implement Optimizations
            </Button>
          </div>
        </div>

        {/* Top Row: Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <SpendEfficiencyMeter score={result.score.efficiency} />
          </div>
          <div className="md:col-span-2">
            <RunwayRecoveryCard 
              annualRecovery={result.recoveredRunwayAnnual} 
              monthlyRecovery={result.potentialMonthlySavings} 
            />
          </div>
        </div>

        {/* Second Row: Overlap and Benchmarks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverlapRiskPanel warnings={result.overlapWarnings} />
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-accent" /> Benchmark Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.benchmarks.map((insight, idx) => (
                <div key={idx} className="flex flex-col gap-2 p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{insight.metric}</span>
                    <span className="font-mono text-sm">{insight.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
              {result.benchmarks.length === 0 && (
                <p className="text-muted-foreground text-center py-8">Not enough data for benchmarking.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tool Breakdown */}
        <h2 className="text-2xl font-heading font-bold pt-8 pb-4 border-b border-border/50">Infrastructure Optimization Plan</h2>
        
        <div className="space-y-4">
          {result.recommendations.length === 0 ? (
            <Card className="bg-card border-border p-8 text-center text-muted-foreground">
              Your stack is highly optimized. No immediate downgrades recommended.
            </Card>
          ) : (
            result.recommendations.map((rec, idx) => {
              const tool = context.tools.find(t => t.id === rec.toolId);
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="bg-card border-border overflow-hidden">
                    <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{tool?.name || rec.toolId}</h3>
                          <Badge variant="outline" className="uppercase text-[10px] tracking-wider">
                            {tool?.currentPlan} → {rec.recommendedPlan}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{rec.reasoning}</p>
                      </div>
                      
                      <div className="flex items-center gap-6 shrink-0 bg-secondary/50 p-4 rounded-lg border border-border">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Monthly Savings</p>
                          <div className="flex items-center text-success font-mono text-lg font-bold">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            ${rec.potentialMonthlySavings}
                          </div>
                        </div>
                        <div className="w-px h-10 bg-border/50" />
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Confidence</p>
                          <div className="font-mono text-lg font-bold">
                            {rec.confidence}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )
            })
          )}
        </div>

      </main>
    </div>
  );
}
