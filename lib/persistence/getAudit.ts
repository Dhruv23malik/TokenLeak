import { supabase } from '@/lib/utils/supabase';
import { AuditResult } from '@/types/audit';

const LOCAL_STORAGE_KEY_PREFIX = 'tokenleak_audit_';

export async function getAudit(id: string): Promise<AuditResult | null> {
  // 1. Try fetching from Local Storage first for instant loading
  if (typeof window !== 'undefined') {
    try {
      const localData = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${id}`);
      if (localData) {
        return JSON.parse(localData) as AuditResult;
      }
    } catch (e) {
      console.error("Failed to parse local storage audit", e);
    }
  }

  // 2. Try fetching from Supabase if not found locally
  try {
    // Note: We would typically store the entire AuditResult or re-run the engine
    // Since our mock Supabase schema stores context, we'd fetch that and re-run runAudit()
    // For this prototype adapter, we assume the full result was serialized, or we rely on localStorage primarily
    const { data, error } = await supabase.from('audits').select('*').eq('id', id).single();
    if (!error && data && data.context) {
      // In a real implementation, you would dynamically import runAudit and recompute, 
      // or fetch the fully stored result. For now, we return null to fall back.
      console.log("Found in Supabase", data);
    }
  } catch (err) {
    console.warn("Supabase fetch failed.", err);
  }

  return null;
}
