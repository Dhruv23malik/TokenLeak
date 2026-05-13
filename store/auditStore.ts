import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuditContext, ToolUsage } from '@/types/audit';

interface AuditState {
  context: AuditContext;
  updateTeamSize: (size: number) => void;
  updateStartupStage: (stage: AuditContext['startupStage']) => void;
  updatePrimaryUseCase: (useCase: AuditContext['primaryUseCase']) => void;
  addTool: (tool: ToolUsage) => void;
  removeTool: (toolId: string) => void;
  updateTool: (toolId: string, updates: Partial<ToolUsage>) => void;
  reset: () => void;
}

const initialState: AuditContext = {
  teamSize: 0,
  startupStage: 'seed',
  primaryUseCase: 'engineering',
  tools: [],
};

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      context: initialState,
      updateTeamSize: (size) =>
        set((state) => ({ context: { ...state.context, teamSize: size } })),
      updateStartupStage: (stage) =>
        set((state) => ({ context: { ...state.context, startupStage: stage } })),
      updatePrimaryUseCase: (useCase) =>
        set((state) => ({ context: { ...state.context, primaryUseCase: useCase } })),
      addTool: (tool) =>
        set((state) => ({
          context: {
            ...state.context,
            tools: [...state.context.tools.filter((t) => t.id !== tool.id), tool],
          },
        })),
      removeTool: (toolId) =>
        set((state) => ({
          context: {
            ...state.context,
            tools: state.context.tools.filter((t) => t.id !== toolId),
          },
        })),
      updateTool: (toolId, updates) =>
        set((state) => ({
          context: {
            ...state.context,
            tools: state.context.tools.map((t) =>
              t.id === toolId ? { ...t, ...updates } : t
            ),
          },
        })),
      reset: () => set({ context: initialState }),
    }),
    {
      name: 'audit-storage', // key in local storage
    }
  )
);
