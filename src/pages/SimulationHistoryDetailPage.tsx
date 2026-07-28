import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';
import { useSimulationStorage } from '@/hooks/useSimulationStorage';
import { buildAIChatPrompt } from '@/data/aiPrompt';
import { getChatReply } from '@/services/aiService';
import { calcMonthlySavings } from '@/utils/simulation';
import {
  ArrowLeft,
  CalendarClock,
  CreditCard,
  Goal,
  PiggyBank,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export function SimulationHistoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { getFormData } = useSimulationStorage();
  const simulation = id ? getFormData(id) : null;
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<
    {
      sender: 'user' | 'assistant';
      text: string;
    }[]
  >([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  if (!simulation) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
        <p className="text-lg font-semibold">Simulação não encontrada.</p>
        <Link to="/historico">
          <Button variant="secondary">Voltar ao histórico</Button>
        </Link>
      </main>
    );
  }

  const monthlySavings = calcMonthlySavings(simulation);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.3em]">
            Detalhes da simulação
          </p>
          <h1 className="text-3xl font-bold">{simulation.goalName}</h1>
          <p className="text-muted-foreground text-sm">
            Todas as informações salvas aparecem abaixo.
          </p>
        </div>
        <Link to="/historico">
          <Button variant="secondary" icon={ArrowLeft}>
            Voltar
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border-border bg-card space-y-4 rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary grid h-12 w-12 place-items-center rounded-2xl">
              <Goal size={20} />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                Meta
              </p>
              <p className="text-lg font-semibold">{simulation.goalName}</p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Custo da meta</p>
            <Input value={simulation.goalAmount} readOnly prefix="R$" />
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Prazo</p>
            <Input value={simulation.goalDeadline} readOnly suffix="meses" />
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Renda mensal</p>
            <Input value={simulation.income} readOnly prefix="R$" />
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Custos fixos</p>
            <Input value={simulation.expenses} readOnly prefix="R$" />
          </div>
          <div>
            <p className="text-muted-foreground mb-2 text-sm">
              Dívidas / parcelas
            </p>
            <Input value={simulation.debts} readOnly prefix="R$" />
          </div>
        </div>

        <div className="border-border bg-card space-y-4 rounded-3xl border p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary grid h-12 w-12 place-items-center rounded-2xl">
              <PiggyBank size={20} />
            </div>
            <div>
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                Economia mensal
              </p>
              <p className="text-lg font-semibold">
                R${' '}
                {monthlySavings.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="bg-card border-border rounded-2xl border p-4">
              <div className="text-muted-foreground flex items-center gap-2">
                <CalendarClock size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">
                  Prazo
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">
                {simulation.goalDeadline} meses
              </p>
            </div>
            <div className="bg-card border-border rounded-2xl border p-4">
              <div className="text-muted-foreground flex items-center gap-2">
                <Wallet size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">
                  Renda
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">
                R$ {simulation.income}
              </p>
            </div>
            <div className="bg-card border-border rounded-2xl border p-4">
              <div className="text-muted-foreground flex items-center gap-2">
                <CreditCard size={16} />
                <span className="text-xs uppercase tracking-[0.3em]">
                  Despesas
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold">
                R$ {simulation.expenses}
              </p>
            </div>
          </div>
        </div>
      </div>

      {simulation.insight && (
        <section className="border-border bg-card mt-8 rounded-3xl border p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Diagnóstico da IA</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-950/70 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                Viabilidade
              </p>
              <p className="mt-2 text-sm">
                {simulation.insight.feasibility.content}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-950/70 p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                Motivação
              </p>
              <p className="mt-2 text-sm">
                {simulation.insight.motivation.content}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="border-border bg-card mt-8 rounded-3xl border p-6 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Continue conversando com a IA
            </h2>
            <p className="text-muted-foreground text-sm">
              Use as informações dessa simulação como contexto para a conversa.
            </p>
          </div>
          <Button
            variant="secondary"
            disabled={!chatInput.trim() || chatLoading}
            onClick={async () => {
              if (!chatInput.trim()) return;

              const userMessage = chatInput.trim();
              setChatError(null);
              setChatMessages((prev) => [
                ...prev,
                { sender: 'user', text: userMessage },
              ]);
              setChatInput('');
              setChatLoading(true);

              try {
                const prompt = buildAIChatPrompt(simulation, userMessage);
                const response = await getChatReply(prompt);
                setChatMessages((prev) => [
                  ...prev,
                  { sender: 'assistant', text: response },
                ]);
              } catch {
                setChatError('Erro ao enviar mensagem. Tente novamente.');
              } finally {
                setChatLoading(false);
              }
            }}
          >
            Enviar
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="bg-card border-border text-muted-foreground rounded-3xl border p-6 text-sm">
              Nenhuma mensagem ainda. Faça uma pergunta para a IA.
            </div>
          ) : (
            chatMessages.map((message, index) => (
              <div
                key={index}
                className={`rounded-3xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-card border-border self-end border'
                    : 'bg-card border-border border'
                }`}
              >
                <p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
                  {message.sender === 'user' ? 'Você' : 'Assistente'}
                </p>
                <p className="mt-2 whitespace-pre-line text-sm">
                  {message.text}
                </p>
              </div>
            ))
          )}
        </div>

        <textarea
          rows={4}
          value={chatInput}
          onChange={(event) => setChatInput(event.target.value)}
          placeholder="Pergunte algo sobre essa simulação..."
          className="border-border placeholder:text-muted-foreground mt-6 w-full rounded-3xl border bg-transparent p-4 text-sm text-foreground outline-none"
        />

        {chatError && (
          <p className="text-destructive mt-3 text-sm">{chatError}</p>
        )}
      </section>
    </main>
  );
}
