import { getInsight, type InsightData } from '@/services/aiService';
import { useCallback, useEffect, useState } from 'react';
import { useSimulationStorage } from './useSimulationStorage';
import { buildAIPrompt } from '@/data/aiPrompt';
import type { SimulationRecord } from '@/data/simulation';

export const useInsight = (id: string) => {
  const { getFormData, updateSimulation } = useSimulationStorage();

  const [insight, setInsight] = useState<InsightData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId);

      if (!simulation) {
        setError('Simulação não encontrada');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const prompt = buildAIPrompt(simulation);
        const insightData = await getInsight(prompt);

        const simulationWithInsight: SimulationRecord = {
          ...simulation,
          insight: insightData,
        };
        setInsight(insightData);
        updateSimulation(simulationWithInsight);
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente');
      } finally {
        setIsLoading(false);
      }
    },
    [getFormData, updateSimulation]
  );

  useEffect(() => {
    const simulation = getFormData(id);

    if (simulation?.insight) {
      setInsight(simulation.insight);
      setIsLoading(false);
      setError(null);
    } else {
      setInsight(null);
      // We don't control fetchInsight's internals, so we can't easily add
      // cancellation logic here. We rely on the component unmounting or the
      // ID changing to eventually settle the state.
      fetchInsight(id);
    }
  }, [id, getFormData, fetchInsight]);

  return { insight, isLoading, error, fetchInsight };
};
