import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { FileCode, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ExecutionDetails({ execution, isOpen, onClose }) {
  if (!execution) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Detalhes da Execução
          </DialogTitle>
          <DialogDescription>
            Revisão do prompt gerado e do resultado da IA para o agente: {execution.agent_name}.
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6 my-4">
            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200">
                <FileCode className="w-5 h-5 text-indigo-500" />
                Prompt Gerado
              </h3>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono">
                  {execution.generated_prompt}
                </p>
              </div>
            </div>
            
            <Separator />

            <div>
              <h3 className="flex items-center gap-2 font-semibold text-lg mb-2 text-slate-800 dark:text-slate-200">
                <Bot className="w-5 h-5 text-purple-500" />
                Resultado da IA
              </h3>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{execution.output}</ReactMarkdown>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}