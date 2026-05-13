"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, ShieldCheck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-accent mr-2 animate-pulse"></span>
            Built for startups scaling with AI
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-foreground"
          >
            Your startup is probably <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
              overpaying for AI.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            Audit your AI stack in 90 seconds. Detect wasted spend, overlapping tools, and recover lost runway.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button asChild size="lg" className="h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90 font-medium">
              <Link href="/audit">
                Run Free Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base border-border bg-transparent hover:bg-secondary">
              <Link href="/audit">
                <BarChart3 className="mr-2 h-4 w-4" /> View Sample Audit
              </Link>
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center gap-6 text-sm text-muted-foreground pt-8"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> No credit card required
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> 100% private analysis
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
