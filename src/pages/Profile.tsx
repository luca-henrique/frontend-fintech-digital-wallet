import React from "react";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";

const ProfileSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Card>
    <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-dark-border pb-2 text-slate-900 dark:text-dark-text">
      {title}
    </h2>
    <div className="space-y-4 pt-2">{children}</div>
  </Card>
);

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
        Perfil & Segurança
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <ProfileSection title="Informações Pessoais">
            <Input
              label="Nome Completo"
              defaultValue="Usuário de Teste"
              disabled
            />
            <Input label="E-mail" defaultValue="usuario@teste.com" disabled />
            <Input
              label="Telefone"
              defaultValue="+55 (11) 98765-4321"
              disabled
            />
            <div className="flex justify-end">
              <Button variant="secondary">Editar Informações</Button>
            </div>
          </ProfileSection>

          <ProfileSection title="Verificação de Identidade (KYC)">
            <div className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-bold text-green-400">
                  Identidade Verificada
                </h3>
                <p className="text-sm text-slate-600 dark:text-dark-text-secondary">
                  Sua conta está totalmente verificada e com limites aumentados.
                </p>
              </div>
            </div>
          </ProfileSection>
        </div>

        <div className="space-y-8">
          <ProfileSection title="Segurança">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-dark-text">
                  Autenticação de 2 Fatores (2FA)
                </h4>
                <p className="text-sm text-slate-600 dark:text-dark-text-secondary">
                  Ativado via Google Authenticator
                </p>
              </div>
              <Button variant="danger">Desativar</Button>
            </div>
            <hr className="border-slate-200 dark:border-dark-border" />
            <h4 className="font-semibold pt-2 text-slate-800 dark:text-dark-text">
              Alterar Senha
            </h4>
            <Input label="Senha Atual" type="password" />
            <Input label="Nova Senha" type="password" />
            <Input label="Confirmar Nova Senha" type="password" />
            <div className="flex justify-end">
              <Button>Salvar Nova Senha</Button>
            </div>
          </ProfileSection>

          <ProfileSection title="Limites de Transação">
            <div className="space-y-3 text-slate-800 dark:text-dark-text">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-dark-text-secondary">
                  PIX via Cartão (diário)
                </span>
                <span className="font-semibold">R$ 5.000,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-dark-text-secondary">
                  Compra de Cripto (diário)
                </span>
                <span className="font-semibold">R$ 15.000,00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-dark-text-secondary">
                  Saque de Cripto (mensal)
                </span>
                <span className="font-semibold">R$ 50.000,00</span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="secondary">Solicitar Aumento</Button>
            </div>
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default Profile;
