import React, { useState, useMemo } from "react";
import {
  Transaction,
  TransactionStatus,
  TransactionType,
} from "../@types/types";
import Card from "../components/shared/Card";
import Button from "../components/shared/Button";
import Input from "../components/shared/Input";
import Select from "../components/shared/Select";

const TransactionStatusBadge: React.FC<{ status: TransactionStatus }> = ({
  status,
}) => {
  const colorClasses = {
    [TransactionStatus.CONFIRMED]: "bg-green-500/20 text-green-400",
    [TransactionStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
    [TransactionStatus.FAILED]: "bg-red-500/20 text-red-400",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[status]}`}
    >
      {status}
    </span>
  );
};

import { useWallet } from "../context/WalletContext";

const History: React.FC = () => {
  const { transactions } = useWallet();
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const typeMatch = filterType === "all" || tx.type === filterType;
      const statusMatch = filterStatus === "all" || tx.status === filterStatus;
      const dateMatch =
        !filterDate ||
        tx.date.startsWith(filterDate.split("-").reverse().join("/"));
      return typeMatch && statusMatch && dateMatch;
    });
  }, [transactions, filterType, filterStatus, filterDate]);

  const handleExportSQL = () => {
    if (filteredTransactions.length === 0) {
      alert("Nenhuma transação para exportar.");
      return;
    }

    const escapeSql = (str: string) => str.replace(/'/g, "''");

    const createTableStmt = `
DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255),
    value DECIMAL(18, 2),
    date VARCHAR(255),
    status VARCHAR(255),
    details TEXT
);
\n\n`;

    const insertStmts = filteredTransactions
      .map(
        (tx) =>
          `INSERT INTO transactions (id, type, value, date, status, details) VALUES ('${escapeSql(tx.id)}', '${escapeSql(tx.type)}', ${tx.value}, '${escapeSql(tx.date)}', '${escapeSql(tx.status)}', '${escapeSql(tx.details)}');`,
      )
      .join("\n");

    const sqlContent = createTableStmt + insertStmts;

    const blob = new Blob([sqlContent], { type: "application/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transacoes.sql";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">
          Histórico de Transações
        </h1>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary" onClick={handleExportSQL}>
            Exportar SQL
          </Button>
          <Button variant="secondary">Exportar PDF</Button>
          <Button variant="secondary">Exportar CSV</Button>
        </div>
      </div>

      <Card className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Select
            label="Tipo de Transação"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Todos os Tipos</option>
            {(Object.values(TransactionType) as string[]).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
          <Select
            label="Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            {(Object.values(TransactionStatus) as string[]).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </Select>
          <Input
            label="Data"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-500 dark:text-dark-text-secondary">
              NENHUMA TRANSAÇÃO REALIZADA
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-2 border-slate-200 dark:border-dark-border">
                <tr>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Detalhes
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Valor (R$)
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary hidden md:table-cell">
                    Data/Hora
                  </th>
                  <th className="p-3 text-sm font-semibold text-slate-600 dark:text-dark-text-secondary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-slate-200 dark:border-dark-border last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    <td className="p-3">
                      <p className="font-medium text-slate-800 dark:text-dark-text">
                        {tx.type}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-dark-text-secondary">
                        {tx.details}
                      </p>
                    </td>
                    <td className="p-3 font-medium text-slate-800 dark:text-dark-text">
                      {tx.value.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3 text-slate-500 dark:text-dark-text-secondary hidden md:table-cell">
                      {tx.date}
                    </td>
                    <td className="p-3">
                      <TransactionStatusBadge status={tx.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;
