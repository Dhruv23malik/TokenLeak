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
import { Plus, Trash2, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/utils/supabase";

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

  const handleAddTool = () => {
    if (!newTool.name) return;
    addTool({
      ...newTool,
      id: `${newTool.name?.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
    } as ToolUsage);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, save to Supabase here
    // const { data } = await supabase.from('audits').insert([{ context }]).select('id').single();
    
    // For now, use a mock ID
    const mockSessionId = `audit_${Date.now()}`;
    router.push(`/audit/${mockSessionId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold mb-2">Configure Stack</h1>
            <p className="text-muted-foreground">Add your company details and current AI subscriptions to run the intelligence engine.</p>
          </div>

          <Card className="bg-card border-border">
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
                  className="bg-secondary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stage">Startup Stage</Label>
                <Select value={context.startupStage} onValueChange={updateStartupStage}>
                  <SelectTrigger className="bg-secondary">
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

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">AI Tool Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {context.tools.map(tool => (
                <div key={tool.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border">
                  <div>
                    <h4 className="font-medium">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground capitalize">{tool.currentPlan} Plan • {tool.seats} seats • ${tool.monthlySpend}/mo</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeTool(tool.id)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <div className="p-4 rounded-lg border border-border border-dashed space-y-4">
                <h4 className="font-medium text-sm text-muted-foreground">Add New Tool</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input 
                    placeholder="Tool Name" 
                    value={newTool.name} 
                    onChange={e => setNewTool({...newTool, name: e.target.value})}
                    className="bg-secondary col-span-2 md:col-span-1"
                  />
                  <Select value={newTool.currentPlan} onValueChange={(val: any) => setNewTool({...newTool, currentPlan: val})}>
                    <SelectTrigger className="bg-secondary"><SelectValue placeholder="Plan" /></SelectTrigger>
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
                    className="bg-secondary"
                  />
                  <Input 
                    type="number" 
                    placeholder="Seats" 
                    value={newTool.seats} 
                    onChange={e => setNewTool({...newTool, seats: parseInt(e.target.value) || 1})}
                    className="bg-secondary"
                  />
                </div>
                <Button variant="outline" className="w-full" onClick={handleAddTool}>
                  <Plus className="h-4 w-4 mr-2" /> Add to Stack
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end pt-4">
            <Button 
              size="lg" 
              onClick={handleSubmit} 
              disabled={isSubmitting || context.tools.length === 0 || !context.teamSize}
              className="bg-accent hover:bg-accent/90 text-white w-full md:w-auto"
            >
              {isSubmitting ? "Running Engine..." : "Generate Audit Report"}
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
