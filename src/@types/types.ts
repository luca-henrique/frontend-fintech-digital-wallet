export enum Page {
  Dashboard = 'dashboard',
  Location = 'location',
  HideIp = 'hide-ip',
  CardToPix = 'card-to-pix',
  BalanceToCrypto = 'balance-to-crypto',
  CryptoWallets = 'crypto-wallets',
  PixKeys = 'pix-keys',
  TestCard = 'test-card',
  History = 'history',
  Profile = 'profile',
  TransactionSuccess = 'transaction-success',
}

export enum TransactionStatus {
  CONFIRMED = 'Confirmado',
  PENDING = 'Pendente',
  FAILED = 'Falhou',
}

export enum TransactionType {
  CRYPTO_PURCHASE = 'Compra de Cripto',
  PIX_CARD = 'PIX com Cartão',
  CRYPTO_WITHDRAWAL = 'Saque de Cripto',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  value: number;
  date: string;
  status: TransactionStatus;
  details: string;
}

export enum CryptoAsset {
  BTC = 'BTC',
  USDT = 'USDT',
}

export enum UsdtNetwork {
  ERC20 = 'ERC20',
  TRC20 = 'TRC20',
  BEP20 = 'BEP20',
}

export interface CryptoWallet {
  id: string;
  alias: string;
  asset: CryptoAsset;
  address: string;
  network: string; // Can be UsdtNetwork or 'Bech32', 'Legacy' for BTC
}

export enum PixKeyType {
  EMAIL = 'E-mail',
  TELEFONE = 'Telefone',
  ALEATORIA = 'Aleatória',
  CPF_CNPJ = 'CPF/CNPJ',
}

export interface PixKey {
  id: string;
  type: PixKeyType;
  key: string;
  isDefault: boolean;
}

export interface CreditCard {
  id: string;
  last4: string;
  brand: string;
  cardholderName: string;
  expiry: string; // MM/YY format
}

export interface TransactionSuccessDetails {
  cryptoAmount: number;
  asset: CryptoAsset;
  wallet: CryptoWallet;
  brlAmount: number;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}