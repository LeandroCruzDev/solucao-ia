import type { SimulationRecord } from '@/data/simulation';
import { Button } from '@/components/shared/Button';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { calcMonthlySavings } from '@/utils/simulation';
import { Activity, Clock, DollarSign, Info, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function HistoryPage() {
  const { getAllFormData, deleteSimulation } = useSimulationStorage();
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);

  useEffect(() => {
    setSimulations(getAllFormData());
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <h1 className="mb-2 text-3xl font-bold">Histórico de Simulações</h1>
      <p className="text-muted-foreground mb-8">
        Veja os resultados das simulações que você salvou.
      </p>
      <ul className="space-y-4">
        {simulations.map((sim) => {
          const monthlySavings = calcMonthlySavings(sim);

          return (
            <li
              key={sim.id}
              className="border-border bg-card rounded-3xl border p-4 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-4">
                  <div className="bg-primary/10 text-primary grid h-14 w-14 place-items-center rounded-3xl">
                    <Activity size={22} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Simulação</p>
                    <p className="text-lg font-semibold">{sim.goalName}</p>
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-wrap gap-3">
                  <div className="border-border bg-card min-w-[150px] flex-1 rounded-2xl border p-3">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      Meta
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold">
                      {sim.goalName}
                    </p>
                  </div>
                  <div className="border-border bg-card min-w-[150px] flex-1 rounded-2xl border p-3">
                    <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
                      Custo
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold">
                      {sim.goalAmount}
                    </p>
                  </div>
                  <div className="border-border bg-card min-w-[150px] flex-1 rounded-2xl border p-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Clock size={14} />
                      <span className="text-xs uppercase tracking-[0.2em]">
                        Prazo
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      {sim.goalDeadline} meses
                    </p>
                  </div>
                  <div className="border-border bg-card min-w-[150px] flex-1 rounded-2xl border p-3">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <DollarSign size={14} />
                      <span className="text-xs uppercase tracking-[0.2em]">
                        Economia
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">
                      R${' '}
                      {monthlySavings.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    variant="secondary"
                    icon={Trash2}
                    onClick={() => {
                      deleteSimulation(sim.id);
                      setSimulations(getAllFormData());
                    }}
                  >
                    Excluir
                  </Button>
                  <Link to={`/historico/${sim.id}`}>
                    <Button variant="primary" icon={Info}>
                      Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        {simulations.length === 0 && (
          <p>Nenhuma simulação encontrada no histórico.</p>
        )}
      </ul>
    </main>
  );
}
