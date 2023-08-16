import React from 'react';
import CabecalhoVenda from '@/domain/models/CabecalhoVenda'; // Certifique-se de importar o modelo correto
import usePaginatedData from '@/hooks/useProdutoPaginationData';
import usePaginatedDataVenda from '@/hooks/useVendaPagination';

interface VendaContextType {
    vendaData: ReturnType<typeof usePaginatedDataVenda>;
}

const VendaContext = React.createContext<VendaContextType | undefined>(undefined);

export const useVendaContext = () => {
    const context = React.useContext(VendaContext);
    if (!context) {
        throw new Error('useVendaContext must be used within a VendaProvider');
    }
    return context;
};

interface VendaProviderProps {
    children: React.ReactNode;
}

export const VendaProvider: React.FC<VendaProviderProps> = ({ children }) => {
    const vendaData = usePaginatedDataVenda(0, 10);

    return (
        <VendaContext.Provider value={{ vendaData }}>
            {children}
        </VendaContext.Provider>
    );
};
