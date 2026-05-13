"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { AuditResult } from "@/types/audit";
import { RunwayRecoveryCard } from "@/components/audit/RunwayRecoveryCard";
import { LeakRadar } from "@/components/charts/LeakRadar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, Share2, AlertTriangle, Cpu, TrendingDown, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { getAudit } from "@/lib/persistence/getAudit";
import { useAuditStore } from "@/store/auditStore";
import { runAudit } from "@/lib/audit-engine/generateInsights";

export default function AuditResultsPage() {
  const params = useParams();
  const { context } = useAuditStore();
  const [result, setResult] = useState<AuditResult | null>(null);

  useEffect(() => {
    async function loadData() {
      const id = params.id as string;
      const persistedAudit = await getAudit(id);
      
      if (persistedAudit) {
        setResult(persistedAudit);
      } else if (context.tools.length > 0) {
        // Fallback for immediate live testing if adapter is async and context exists
        setResult(runAudit(id, context));
      }
    }
    loadData();
  }, [context, params.id]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-accent border-t-transparent animate-spin" />
          <p className="text-muted-foreground font-mono text-sm">Compiling financial intelligence report...</p>
        </div>
      </div>
    );
  }

  // Derived metrics for narrative
  const biggestLeak = result.recommendations.length > 0 
    ? result.recommendations.reduce((prev, current) => (prev.potentialMonthlySavings > current.potentialMonthlySavings) ? prev : current)
    : null;
    
  const stackComplexityRisk = result.context.tools.length > 5 ? 'High' : 'Moderate';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-4xl font-heading font-bold mb-2 tracking-tight">Financial Intelligence Report</h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
              Audit {result.sessionId.split('-')[0]} • Analyzed {result.context.tools.length} AI subscriptions
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="border-border/50 hover:bg-secondary/50">
              <Share2 className="h-4 w-4 mr-2" /> Share Report
            </Button>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              Execute Optimizations
            </Button>
          </div>
        </div>

        {/* 1. Hero Financial Metrics */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">1. Capital Efficiency</h2>
          <RunwayRecoveryCard 
            annualRecovery={result.recoveredRunwayAnnual} 
            monthlyRecovery={result.potentialMonthlySavings} 
          />
        </section>

        {/* 2 & 3. Biggest Leak & Leak Radar */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">2. Primary Inefficiency</h2>
             <Card className="bg-card border-border/40 h-[350px] shadow-sm flex flex-col justify-center p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <AlertTriangle className="w-32 h-32" />
                </div>
                {biggestLeak ? (
                  <>
                    <Badge variant="destructive" className="w-fit mb-4 bg-destructive/10 text-destructive border-none">Biggest Leak Detected</Badge>
                    <h3 className="text-3xl font-heading font-bold mb-2">{biggestLeak.toolId}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{biggestLeak.reasoning}</p>
                    <div className="mt-auto">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Recoverable Run Rate</p>
                      <p className="text-3xl font-mono font-bold text-foreground">${biggestLeak.potentialMonthlySavings * 12}<span className="text-lg text-muted-foreground font-sans font-normal">/yr</span></p>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">Your stack is highly optimized. No critical leaks detected.</p>
                  </div>
                )}
             </Card>
          </div>
          <div className="space-y-4">
             <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">3. Risk Geometry</h2>
             <LeakRadar result={result} />
          </div>
        </section>

        {/* 4 & 5. Stack Complexity & Optimization Timeline */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-card border-border/40 shadow-sm col-span-1">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-5 w-5 text-accent" /> Stack Complexity Risk
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-heading font-bold mb-2">{stackComplexityRisk}</div>
              <p className="text-sm text-muted-foreground">Operating {result.context.tools.length} distinct AI vendors creates significant operational sprawl and vendor management overhead.</p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40 shadow-sm col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-success" /> Optimization Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Current Monthly Burn</p>
                  <p className="text-2xl font-mono font-bold">${result.totalMonthlySpend}</p>
                </div>
                <div className="h-px bg-border/50 flex-1 mx-8 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground border border-border/50 rounded-full">
                    Optimization Execution
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-sm text-muted-foreground">Optimized Target Burn</p>
                  <p className="text-2xl font-mono font-bold text-success">${result.totalMonthlySpend - result.potentialMonthlySavings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 6. Tool Recommendations */}
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border/40 pb-2">6. Optimization Actions</h2>
          <div className="space-y-4 mt-6">
            {result.recommendations.length === 0 ? (
              <Card className="bg-card border-border/40 p-8 text-center text-muted-foreground">
                Your AI operating costs are fully optimized. No workflow redundancy detected.
              </Card>
            ) : (
              result.recommendations.map((rec, idx) => {
                const tool = result.context.tools.find(t => t.id === rec.toolId);
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="bg-card border-border/40 overflow-hidden shadow-sm hover:border-border transition-colors">
                      <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{tool?.name || rec.toolId}</h3>
                            <Badge variant="outline" className="uppercase text-[10px] tracking-wider bg-secondary/30">
                              {tool?.currentPlan} → {rec.recommendedPlan}
                            </Badge>
                          </div>
                          <p className="text-foreground/80 text-sm leading-relaxed mb-4">{rec.reasoning}</p>
                          
                          <div className="bg-secondary/20 rounded-md p-3 text-xs border border-border/30">
                            <span className="font-semibold text-muted-foreground uppercase tracking-wider block mb-1">Confidence Explanation</span>
                            Optimization Confidence: {rec.confidence}% — Based on team size mapping, standard utilization rates for {result.context.startupStage} startups, and pricing tier efficiency.
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 shrink-0 bg-secondary/10 p-5 rounded-xl border border-border/40">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Idle Capital</p>
                            <div className="flex items-center text-success font-mono text-xl font-bold">
                              <ArrowDownRight className="h-4 w-4 mr-1" />
                              ${rec.potentialMonthlySavings}/mo
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
        </section>

        {/* 7. AI Summary */}
        <section className="bg-secondary/10 border border-border/40 rounded-xl p-8 shadow-sm">
           <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
             <Cpu className="h-4 w-4" /> 7. Executive Synthesis
           </h2>
           <p className="text-foreground/80 leading-relaxed max-w-3xl">
             Based on the {result.context.tools.length} subscriptions analyzed for your {result.context.teamSize}-person engineering organization, we have identified <strong className="text-foreground font-medium">${result.recoveredRunwayAnnual.toLocaleString()} in annualized idle AI capital</strong>. By executing the optimization actions detailed above, you will significantly reduce operational sprawl and reallocate wasted spend directly back into your startup's core runway without sacrificing builder velocity.
           </p>
        </section>

      </main>
    </div>
  );
}
