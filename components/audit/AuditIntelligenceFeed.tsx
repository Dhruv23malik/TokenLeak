"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuditStore } from "@/store/auditStore";
import { useEffect, useState } from "react";
import { Activity, AlertTriangle, TrendingUp, CheckCircle2 } from "lucide-react";
import { detectOverlap } from "@/lib/audit-engine/detectOverlap";
import { calculateSavings } from "@/lib/audit-engine/calculateSavings";

interface FeedItem {
  id: string;
  type: "insight" | "warning" | "success" | "neutral";
  message: string;
}

export function AuditIntelligenceFeed() {
  const { context } = useAuditStore();
  const [feed, setFeed] = useState<FeedItem[]>([
    { id: "init", type: "neutral", message: "Audit Engine initialized. Awaiting stack data..." }
  ]);

  useEffect(() => {
    if (context.tools.length === 0) return;

    const newFeed: FeedItem[] = [];
    
    // Check overlap
    const warnings = detectOverlap(context.tools);
    if (warnings.length > 0) {
      newFeed.push({
        id: `overlap-${Date.now()}`,
        type: "warning",
        message: `High overlap risk in ${warnings[0].category} stack.`
      });
    }

    // Check savings
    const { totalSavings } = calculateSavings(context);
    if (totalSavings > 0) {
      newFeed.push({
        id: `savings-${Date.now()}`,
        type: "success",
        message: `Potential annual runway recovery increased to $${Math.round(totalSavings * 12).toLocaleString()}.`
      });
    }

    // Check enterprise
    const hasEnterprise = context.tools.some(t => t.currentPlan === 'enterprise');
    if (hasEnterprise && context.teamSize < 50) {
      newFeed.push({
        id: `enterprise-${Date.now()}`,
        type: "insight",
        message: `Enterprise tier likely unnecessary for team size ${context.teamSize}.`
      });
    }

    if (newFeed.length > 0) {
      setFeed(prev => [...newFeed, ...prev].slice(0, 5));
    }
  }, [context.tools, context.teamSize]);

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground uppercase tracking-wider">
        <Activity className="h-4 w-4 animate-pulse text-accent" />
        Intelligence Feed
      </div>
      
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent z-10 pointer-events-none" />
        <div className="flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {feed.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 border border-border/50"
              >
                {item.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning mt-0.5 shrink-0" />}
                {item.type === 'success' && <TrendingUp className="h-4 w-4 text-success mt-0.5 shrink-0" />}
                {item.type === 'insight' && <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />}
                {item.type === 'neutral' && <Activity className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
                
                <span className="text-sm font-medium leading-tight">{item.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
