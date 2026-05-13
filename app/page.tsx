import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        
        {/* CTA Section */}
        <section className="py-32">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <div className="p-12 rounded-2xl border border-border bg-card shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Recover your hidden AI runway.</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join hundreds of startups optimizing their infrastructure spend. The audit takes less than 90 seconds.
                </p>
                <Button asChild size="lg" className="h-14 px-10 text-lg bg-foreground text-background hover:bg-foreground/90 font-medium rounded-full">
                  <Link href="/audit">
                    Start Free Audit <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground gap-4">
          <div>© {new Date().getFullYear()} TokenLeak. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
