"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface SpendEfficiencyMeterProps {
  score: number;
}

export function SpendEfficiencyMeter({ score }: SpendEfficiencyMeterProps) {
  // Determine color based on score
  const getColor = () => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getStrokeColor = () => {
    if (score >= 80) return "#22C55E";
    if (score >= 60) return "#F59E0B";
    return "#EF4444";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="bg-card border-border flex flex-col justify-center items-center h-full">
      <CardContent className="p-8 flex flex-col items-center justify-center relative w-full h-full">
        
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <Activity className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Efficiency</span>
        </div>

        <div className="relative w-48 h-48 mt-4 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-secondary"
            />
            {/* Animated Progress Circle */}
            <motion.circle
              cx="96"
              cy="96"
              r="45"
              stroke={getStrokeColor()}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="drop-shadow-[0_0_8px_rgba(var(--color),0.5)]"
              style={{ ["--color" as string]: getStrokeColor() }}
            />
          </svg>
          
          <div className="absolute flex flex-col items-center justify-center">
            <motion.span 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`text-5xl font-mono font-bold tracking-tight ${getColor()}`}
            >
              {score}
            </motion.span>
            <span className="text-sm font-medium text-muted-foreground mt-1">/ 100</span>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
