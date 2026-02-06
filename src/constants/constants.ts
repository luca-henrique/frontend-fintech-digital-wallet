import { Transaction, CryptoWallet, CryptoAsset, UsdtNetwork, PixKey, PixKeyType, CreditCard } from '../@types/types';

export const MOCK_USER_BALANCE_BRL = 0.00;

export const MOCK_TRANSACTIONS: Transaction[] = [];

export const MOCK_CRYPTO_WALLETS: CryptoWallet[] = [
    { id: 'cw1', alias: 'Minha Ledger BTC', asset: CryptoAsset.BTC, address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', network: 'Bech32' },
    { id: 'cw2', alias: 'Binance USDT', asset: CryptoAsset.USDT, address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F', network: UsdtNetwork.ERC20 },
    { id: 'cw3', alias: 'Metamask USDT', asset: CryptoAsset.USDT, address: 'TQb9393kjbwefguwe7623hbjwef7823hjb', network: UsdtNetwork.TRC20 },
];

export const MOCK_PIX_KEYS: PixKey[] = [
    { id: 'pk1', type: PixKeyType.EMAIL, key: 'usuario@teste.com', isDefault: true },
    { id: 'pk2', type: PixKeyType.TELEFONE, key: '+5511987654321', isDefault: false },
    { id: 'pk3', type: PixKeyType.ALEATORIA, key: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', isDefault: false },
];

export const MOCK_SAVED_CARDS: CreditCard[] = [
    { id: 'cc1', last4: '4242', brand: 'Visa', cardholderName: 'Usuário de Teste', expiry: '12/28' },
    { id: 'cc2', last4: '1111', brand: 'Mastercard', cardholderName: 'Usuário Expirado', expiry: '01/23' },
];

// FIX: Added missing MOCK_CRYPTO_PRICES constant.
export const MOCK_CRYPTO_PRICES = {
    bitcoin: { brl: 350123.45, change24h: 1.25 },
    tether: { brl: 5.08, change24h: -0.15 },
};