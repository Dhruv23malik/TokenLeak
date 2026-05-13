"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { useAuditStore } from "@/store/auditStore";
import { AuditIntelligenceFeed } from "@/components/audit/AuditIntelligenceFeed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolUsage } from "@/types/audit";
import { Plus, Trash2, ArrowRight, DollarSign } from "lucide-react";
import { saveAudit } from "@/lib/persistence/saveAudit";
import { runAudit } from "@/lib/audit-engine/generateInsights";

export default function AuditPage() {
  const router = useRouter();
  const { context, updateTeamSize, updateStartupStage, addTool, removeTool } = useAuditStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTool, setNewTool] = useState<Partial<ToolUsage>>({
    name: "ChatGPT",
    category: "chat",
    currentPlan: "pro",
    monthlySpend: 20,
    seats: 1,
    usageLevel: "medium",
  });

  // Live analytics calculation
  const liveResult = context.tools.length > 0 ? runAudit("live", context) : null;

  const handleAddTool = () => {
    if (!newTool.name) return;
    addTool({
      ...newTool,
      id: `${newTool.name?.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
    } as ToolUsage);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Generate real UUID
    const sessionId = crypto.randomUUID();
    const result = runAudit(sessionId, context);
    
    // Persist via adapter
    await saveAudit(result);
    
    router.push(`/audit/${sessionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Configure Infrastructure</h1>
            <p className="text-muted-foreground">Add your company details and current AI subscriptions to run the intelligence engine.</p>
          </div>

          <Card className="bg-card border-border/40 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Company Context</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size (Engineers/Builders)</Label>
                <Input 
                  id="teamSize" 
                  type="number" 
                  placeholder="e.g. 15" 
                  value={context.teamSize || ''} 
                  onChange={(e) => updateTeamSize(parseInt(e.target.value) || 0)}
                  className="bg-secondary/50 focus-visible:ring-1 focus-visible:ring-accent border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Startup Stage</Label>
                <Select value={context.startupStage} onValueChange={(val: any) => val && updateStartupStage(val)}>
                  <SelectTrigger className="bg-secondary/50 focus:ring-1 focus:ring-accent border-border/50">
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre_seed">Pre-Seed</SelectItem>
                    <SelectItem value="seed">Seed</SelectItem>
                    <SelectItem value="series_a">Series A</SelectItem>
                    <SelectItem value="growth">Growth</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">AI Tool Stack</CardTitle>
              {liveResult && (
                <div className="flex items-center text-sm font-medium text-success bg-success/10 px-3 py-1 rounded-full">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  ${liveResult.potentialMonthlySavings}/mo optimization found
                </div>
              )}
            </CardHeader>
            <CardContent className="space-y-6">
              {context.tools.map(tool => (
                <div key={tool.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 border border-border/40 hover:border-border transition-colors">
                  <div>
                    <h4 className="font-medium text-foreground">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{tool.currentPlan} Plan • {tool.seats} seats • ${tool.monthlySpend}/mo</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeTool(tool.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="p-5 rounded-lg border border-border/40 bg-secondary/10 space-y-4">
                <h4 className="font-medium text-sm text-foreground">Add New Tool</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input 
                    placeholder="Tool Name" 
                    value={newTool.name} 
                    onChange={e => setNewTool({...newTool, name: e.target.value})}
                    className="bg-background col-span-2 md:col-span-1 border-border/50"
                  />
                  <Select value={newTool.currentPlan} onValueChange={(val: any) => setNewTool({...newTool, currentPlan: val})}>
                    <SelectTrigger className="bg-background border-border/50"><SelectValue placeholder="Plan" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="team">Team</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="number" 
                    placeholder="Monthly $" 
                    value={newTool.monthlySpend} 
                    onChange={e => setNewTool({...newTool, monthlySpend: parseInt(e.target.value) || 0})}
                    className="bg-background border-border/50"
                  />
                  <Input 
                    type="number" 
                    placeholder="Seats" 
                    value={newTool.seats} 
                    onChange={e => setNewTool({...newTool, seats: parseInt(e.target.value) || 1})}
                    className="bg-background border-border/50"
                  />
                </div>
                <Button variant="outline" className="w-full border-border/50 hover:bg-secondary" onClick={handleAddTool}>
                  <Plus className="h-4 w-4 mr-2 text-muted-foreground" /> Add to Stack
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end pt-4">
            <Button 
              size="lg" 
              onClick={handleSubmit} 
              disabled={isSubmitting || context.tools.length === 0 || !context.teamSize}
              className="bg-foreground text-background hover:bg-foreground/90 w-full md:w-auto h-12 px-8 font-medium shadow-lg shadow-foreground/10"
            >
              {isSubmitting ? "Generating Report..." : "Generate Intelligence Report"}
              {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Right Column: Intelligence Feed */}
        <div className="h-[600px] sticky top-24">
          <AuditIntelligenceFeed />
        </div>

      </main>
    </div>
  );
}
