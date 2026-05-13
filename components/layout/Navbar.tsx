import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-accent" />
            <span className="font-heading font-bold text-lg tracking-tight">
              TokenLeak
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/audit" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            View Sample Audit
          </Link>
          <Button asChild className="bg-foreground text-background hover:bg-foreground/90 font-medium">
            <Link href="/audit">Run Free Audit</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
