"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, TrendingDown, Users, Key, Wallet, EyeOff } from "lucide-react";

const problems = [
  {
    title: "Duplicate Subscriptions",
    description: "Multiple teams paying for ChatGPT Plus independently.",
    icon: Copy,
  },
  {
    title: "Tool Overlap",
    description: "Paying for GitHub Copilot, Cursor, and Windsurf simultaneously.",
    icon: Users,
  },
  {
    title: "Enterprise Over-provisioning",
    description: "Buying Enterprise tiers when Team or Pro is sufficient.",
    icon: TrendingDown,
  },
  {
    title: "API Inefficiency",
    description: "Leaving expensive models as defaults for simple internal tasks.",
    icon: Key,
  },
  {
    title: "Idle AI Capital",
    description: "Paying for seats that haven't been active in 30+ days.",
    icon: Wallet,
  },
  {
    title: "Hidden Monthly Burn",
    description: "SaaS sprawl masking the true total cost of AI infrastructure.",
    icon: EyeOff,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ProblemSection() {
  return (
    <section className="py-24 bg-secondary/30 border-y border-border/50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Where AI budgets leak</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most startups are overpaying for AI by 30-40%. These are the most common areas where capital is wasted.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {problems.map((problem, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="bg-card border-border hover:border-border/80 transition-colors h-full">
                <CardContent className="p-6">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                    <problem.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{problem.title}</h3>
                  <p className="text-sm text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
