import React, { useState } from "react";
import {
  PixKey,
  PixKeyType,
  CryptoWallet,
  CryptoAsset,
  UsdtNetwork,
} from "../@types/types";
import { useWallet } from "../context/WalletContext";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";

const PixKeys: React.FC = () => {
  const {
    pixKeys,
    wallets,
    addPixKey,
    updatePixKey,
    deletePixKey,
    setDefaultPixKey,
    addWallet,
    deleteWallet,
  } = useWallet();
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<"select" | "form">("select");
  const [formType, setFormType] = useState<"pix" | "crypto" | null>(null);
  const [editingItem, setEditingItem] = useState<
    Partial<PixKey | CryptoWallet>
  >({});

  const openAddModal = () => {
    setModalStep("select");
    setFormType(null);
    setEditingItem({});
    setModalOpen(true);
  };

  const openEditPixKeyModal = (key: PixKey) => {
    setModalStep("form");
    setFormType("pix");
    setEditingItem(key);
    setModalOpen(true);
  };

  const handleSelectFormType = (type: "pix" | "crypto") => {
    setFormType(type);
    setModalStep("form");
    if (type === "pix") setEditingItem({ type: PixKeyType.EMAIL });
    if (type === "crypto") setEditingItem({});
  };

  const handleSave = () => {
    if (formType === "pix") {
      const key = editingItem as Partial<PixKey>;
      if (!key.type || !key.key) {
        alert("Preencha todos os campos.");
        return;
      }
      if (key.id) {
        updatePixKey(key as PixKey);
      } else {
        addPixKey(key);
      }
    } else if (formType === "crypto") {
      const wallet = editingItem as Partial<CryptoWallet>;
      if (
        !wallet.alias ||
        !wallet.asset ||
        !wallet.address ||
        !wallet.network
      ) {
        alert("Preencha todos os campos.");
        return;
      }
      addWallet(wallet);
    }
    setModalOpen(false);
  };

  const getModalTitle = () => {
    if (!isModalOpen) return "";
    if (modalStep === "select") return "Adicionar Chave ou Carteira";
    if (formType === "pix")
      return (editingItem as PixKey)?.id
        ? "Editar Chave PIX"
        : "Adicionar Chave PIX";
    if (formType === "crypto") return "Adicionar Carteira Cripto";
    return "Adicionar";
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
          Chaves PIX e Carteiras
        </h1>
        <Button onClick={openAddModal}>Adicionar</Button>
      </div>

      <Card>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-dark-text">
          Minhas Chaves PIX
        </h2>
        <div className="space-y-4">
          {pixKeys.map((key) => (
            <div
              key={key.id}
              className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-lg text-slate-900 dark:text-dark-text">
                    {key.type}
                  </p>
                  {key.isDefault && (
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-brand-accent/20 text-brand-accent">
                      Padrão
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-dark-text-secondary font-mono">
                  {key.key}
                </p>
              </div>
              <div className="flex gap-2 self-end sm:self-center flex-wrap">
                <Button
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                  onClick={() => openEditPixKeyModal(key)}
                >
                  Editar
                </Button>
                {!key.isDefault && (
                  <Button
                    variant="secondary"
                    className="px-3 py-1 text-sm"
                    onClick={() => setDefaultPixKey(key.id)}
                  >
                    Tornar Padrão
                  </Button>
                )}
                <Button
                  variant="danger"
                  className="px-3 py-1 text-sm"
                  onClick={() => deletePixKey(key.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          {pixKeys.length === 0 && (
            <p className="text-center py-4 text-slate-500 dark:text-dark-text-secondary">
              Nenhuma chave PIX cadastrada.
            </p>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-dark-text">
          Minhas Carteiras Cripto
        </h2>
        <div className="space-y-4">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="p-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div>
                <p className="font-bold text-lg text-slate-900 dark:text-dark-text">
                  {wallet.alias}{" "}
                  <span className="text-sm font-normal text-slate-600 dark:text-dark-text-secondary">
                    ({wallet.asset} - {wallet.network})
                  </span>
                </p>
                <p className="text-sm text-slate-500 dark:text-dark-text-secondary font-mono break-all">
                  {wallet.address}
                </p>
              </div>
              <div className="flex gap-2 self-end sm:self-center">
                <Button
                  variant="danger"
                  className="px-3 py-1 text-sm"
                  onClick={() => deleteWallet(wallet.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          {wallets.length === 0 && (
            <p className="text-center py-4 text-slate-500 dark:text-dark-text-secondary">
              Nenhuma carteira cadastrada.
            </p>
          )}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={getModalTitle()}
      >
        {modalStep === "select" && (
          <div className="flex flex-col gap-4">
            <Button
              onClick={() => handleSelectFormType("pix")}
              className="w-full"
            >
              Adicionar Chave PIX
            </Button>
            <Button
              onClick={() => handleSelectFormType("crypto")}
              variant="secondary"
              className="w-full"
            >
              Adicionar Carteira Cripto
            </Button>
          </div>
        )}
        {modalStep === "form" && formType === "pix" && (
          <div className="space-y-4">
            <Select
              label="Tipo de Chave"
              value={(editingItem as PixKey).type || ""}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  type: e.target.value as PixKeyType,
                })
              }
            >
              {(Object.values(PixKeyType) as string[]).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
            <Input
              label="Chave"
              placeholder="Digite a chave"
              value={(editingItem as PixKey).key || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, key: e.target.value })
              }
            />
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        )}
        {modalStep === "form" && formType === "crypto" && (
          <div className="space-y-4">
            <Select
              label="Ativo"
              value={(editingItem as CryptoWallet).asset || ""}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  asset: e.target.value as CryptoAsset,
                  network: "",
                })
              }
            >
              <option value="">Selecione...</option>
              <option value={CryptoAsset.BTC}>BTC</option>
              <option value={CryptoAsset.USDT}>USDT</option>
            </Select>
            {(editingItem as CryptoWallet).asset === CryptoAsset.USDT && (
              <Select
                label="Rede"
                value={(editingItem as CryptoWallet).network || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    network: e.target.value as UsdtNetwork,
                  })
                }
              >
                <option value="">Selecione a rede...</option>
                <option value={UsdtNetwork.ERC20}>ERC20</option>
                <option value={UsdtNetwork.TRC20}>TRC20</option>
                <option value={UsdtNetwork.BEP20}>BEP20</option>
              </Select>
            )}
            {(editingItem as CryptoWallet).asset === CryptoAsset.BTC && (
              <Select
                label="Tipo de Endereço"
                value={(editingItem as CryptoWallet).network || ""}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    network: e.target.value as string,
                  })
                }
              >
                <option value="">Selecione o tipo...</option>
                <option value="Bech32">Bech32</option>
                <option value="Legacy">Legacy</option>
              </Select>
            )}
            <Input
              label="Apelido da Carteira"
              placeholder="Ex: Minha Ledger"
              value={(editingItem as CryptoWallet).alias || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, alias: e.target.value })
              }
            />
            <Input
              label="Endereço"
              placeholder="Cole o endereço da carteira aqui"
              value={(editingItem as CryptoWallet).address || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, address: e.target.value })
              }
            />
            <div className="flex justify-end gap-4 pt-4">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PixKeys;
