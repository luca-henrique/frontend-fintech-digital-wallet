import React, { useState } from "react";
import { CryptoWallet, CryptoAsset, UsdtNetwork } from "../@types/types";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Modal from "../components/shared/Modal";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";

import { useWallet } from "../context/WalletContext";

const CryptoWallets: React.FC = () => {
  const { wallets, addWallet, updateWallet, deleteWallet } = useWallet();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingWallet, setEditingWallet] =
    useState<Partial<CryptoWallet> | null>(null);

  const openAddModal = () => {
    setEditingWallet({});
    setModalOpen(true);
  };

  const openEditModal = (wallet: CryptoWallet) => {
    setEditingWallet(wallet);
    setModalOpen(true);
  };

  const handleSaveWallet = () => {
    if (
      !editingWallet?.alias ||
      !editingWallet?.asset ||
      !editingWallet?.address ||
      !editingWallet?.network ||
      (editingWallet.asset === CryptoAsset.USDT && !editingWallet.network)
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    if (editingWallet.id) {
      updateWallet(editingWallet as CryptoWallet);
    } else {
      addWallet(editingWallet);
    }
    setModalOpen(false);
    setEditingWallet(null);
  };

  const handleDeleteWallet = (id: string) => {
    if (window.confirm("Tem certeza que deseja remover esta carteira?")) {
      deleteWallet(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
          Carteiras Cripto
        </h1>
        <Button onClick={openAddModal}>Adicionar Carteira</Button>
      </div>

      <Card>
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
                  variant="secondary"
                  className="px-3 py-1 text-sm"
                  onClick={() => openEditModal(wallet)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  className="px-3 py-1 text-sm"
                  onClick={() => handleDeleteWallet(wallet.id)}
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
          {wallets.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500 dark:text-dark-text-secondary">
                Nenhuma carteira cadastrada.
              </p>
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingWallet?.id ? "Editar Carteira" : "Adicionar Carteira"}
      >
        <div className="space-y-4">
          <Select
            label="Ativo"
            value={editingWallet?.asset || ""}
            onChange={(e) =>
              setEditingWallet({
                ...editingWallet,
                asset: e.target.value as CryptoAsset,
              })
            }
          >
            <option value="">Selecione...</option>
            <option value={CryptoAsset.BTC}>BTC (Bitcoin)</option>
            <option value={CryptoAsset.USDT}>USDT (Tether)</option>
          </Select>

          {editingWallet?.asset === CryptoAsset.USDT && (
            <Select
              label="Rede"
              value={editingWallet?.network || ""}
              onChange={(e) =>
                setEditingWallet({
                  ...editingWallet,
                  network: e.target.value as UsdtNetwork,
                })
              }
            >
              <option value="">Selecione a rede...</option>
              <option value={UsdtNetwork.ERC20}>ERC20 (Ethereum)</option>
              <option value={UsdtNetwork.TRC20}>TRC20 (Tron)</option>
              <option value={UsdtNetwork.BEP20}>BEP20 (BNB Chain)</option>
            </Select>
          )}
          {editingWallet?.asset === CryptoAsset.BTC && (
            <Select
              label="Tipo de Endereço"
              value={editingWallet?.network || ""}
              onChange={(e) =>
                setEditingWallet({
                  ...editingWallet,
                  network: e.target.value as "Bech32" | "Legacy",
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
            value={editingWallet?.alias || ""}
            onChange={(e) =>
              setEditingWallet({ ...editingWallet, alias: e.target.value })
            }
          />
          <Input
            label="Endereço"
            placeholder="Cole o endereço da carteira aqui"
            value={editingWallet?.address || ""}
            onChange={(e) =>
              setEditingWallet({ ...editingWallet, address: e.target.value })
            }
          />

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveWallet}>Salvar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CryptoWallets;
