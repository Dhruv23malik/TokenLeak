import { supabase } from '@/lib/utils/supabase';
import { AuditContext, AuditResult } from '@/types/audit';

const LOCAL_STORAGE_KEY_PREFIX = 'tokenleak_audit_';

export async function saveAudit(result: AuditResult): Promise<string> {
  // 1. Try saving to Supabase
  try {
    const { error } = await supabase.from('audits').insert([
      { 
        id: result.sessionId, 
        context: result.context,
        metrics: {
          totalSpend: result.totalMonthlySpend,
          totalSavings: result.potentialMonthlySavings,
          efficiency: result.score.efficiency
        },
        created_at: result.createdAt
      }
    ]);
    
    if (error) {
      console.warn("Supabase insertion failed or not configured, falling back to local storage.", error.message);
    }
  } catch (err) {
    console.warn("Supabase client error, falling back to local storage.", err);
  }

  // 2. Always save to Local Storage as a fallback for seamless immediate UX
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${result.sessionId}`, JSON.stringify(result));
    }
  } catch (e) {
    console.error("Failed to save to local storage", e);
  }

  return result.sessionId;
}
