
import React, { useState, useEffect } from "react";
import { User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { KeyRound, Save, CheckCircle, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Configuracoes() {
  const [apiKey, setApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      const userData = await User.me();
      setUser(userData);
      if (userData.openai_api_key) {
        setApiKey(userData.openai_api_key);
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaved(false);
    try {
      await User.updateMyUserData({ openai_api_key: apiKey });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Erro ao salvar a chave de API:", error);
    }
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Configurações
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 mt-2">
            Gerencie suas integrações e configurações da conta
          </p>
        </div>

        <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-slate-200/60 dark:border-slate-700/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-indigo-600" />
              Chave de API da OpenAI
            </CardTitle>
            <CardDescription>
              Sua chave de API é armazenada de forma segura e usada apenas para executar os agentes em seu nome.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Sua Chave</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="sk-************************************************"
                value={apiKey}
                onChange={(e) => { setApiKey(e.target.value); setSaved(false); }}
                className="border-slate-200 dark:border-slate-600"
              />
            </div>
            {saved && (
              <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-700 dark:text-green-300">
                  Chave de API salva com sucesso!
                </AlertDescription>
              </Alert>
            )}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Salvando..." : <><Save className="w-4 h-4 mr-2" /> Salvar Chave</>}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Como funciona a execução?</AlertTitle>
          <AlertDescription>
            O FusiON utiliza a sua chave de API da OpenAI para executar os prompts diretamente na sua conta. Isso garante que você tenha total controle sobre o uso e os custos. Atualmente, não suportamos login direto com a conta Google/OpenAI, sendo o uso da chave de API o método de integração.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
