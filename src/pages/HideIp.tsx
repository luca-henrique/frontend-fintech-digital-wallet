import React, { useState } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import Modal from '../components/shared/Modal';

const MiniMapIcon = () => (
    <svg className="w-24 h-24 text-slate-400 dark:text-slate-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <path d="M50,5 C25,5 5,25 5,50 C5,75 50,95 50,95 C50,95 95,75 95,50 C95,25 75,5 50,5 Z" fill="currentColor" opacity="0.2"/>
        <circle cx="50" cy="50" r="10" fill="var(--brand-accent)" />
        <path d="M10 50 Q50 10 90 50" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="5 5" />
        <path d="M20 60 Q50 80 80 60" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.5" strokeDasharray="5 5" />
    </svg>
);

const HideIp: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [isConfirming, setIsConfirming] = useState(false);

    const handleHideIpClick = () => {
        setIsConfirming(true);
    };

    const proceedToHideIp = () => {
        setIsConfirming(false);
        setStatus('loading');
        setTimeout(() => {
            setStatus('success');
        }, 2000);
    };

    const cancelHideIp = () => {
        setIsConfirming(false);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-dark-text">Esconder IP</h1>
            <Card className="flex flex-col items-center justify-center p-8 min-h-[300px]">
                {status === 'idle' && (
                    <>
                        <p className="text-slate-600 dark:text-dark-text-secondary mb-6">Proteja sua privacidade e altere sua localização virtual com um único clique.</p>
                        <Button onClick={handleHideIpClick} className="px-8 py-3 text-lg">
                            Esconder IP agora
                        </Button>
                    </>
                )}
                {status === 'loading' && (
                    <div className="flex flex-col items-center justify-center">
                        <svg className="animate-spin h-12 w-12 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="mt-4 text-slate-600 dark:text-dark-text-secondary">Ocultando seu IP, aguarde...</p>
                    </div>
                )}
                {status === 'success' && (
                    <div className="flex flex-col items-center justify-center">
                        <MiniMapIcon />
                        <h2 className="text-2xl font-bold text-green-500 mt-4">Atenção!</h2>
                        <p className="text-slate-600 dark:text-dark-text-secondary mt-2">
                            Seu IP foi ocultado e alterado junto com a localização.
                        </p>
                    </div>
                )}
            </Card>

            <Modal isOpen={isConfirming} onClose={cancelHideIp} title="Confirmar Ação">
                <div className="text-center">
                    <p className="mb-6">Tem certeza que deseja alterar seu IP e sua localização virtual?</p>
                    <div className="flex justify-center gap-4">
                        <Button variant="secondary" onClick={cancelHideIp}>Cancelar</Button>
                        <Button onClick={proceedToHideIp}>Confirmar</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default HideIp;