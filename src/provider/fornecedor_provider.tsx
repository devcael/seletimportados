import React, { FC, useContext } from 'react';
import useFornecedoresPaginatedData from '@/hooks/useFornecedoresPaginatedData';

interface FornecedorContextType {
    fornecedorData: ReturnType<typeof useFornecedoresPaginatedData>;
}

const FornecedorContext = React.createContext<FornecedorContextType | undefined>(undefined);

export const useFornecedorContext = () => {
    const context = useContext(FornecedorContext);
    if (!context) {
        throw new Error('useFornecedorContext must be used within a FornecedorProvider');
    }
    return context;
};

interface FornecedorProviderProps {
    children: React.ReactNode;
}

export const FornecedorProvider: React.FC<FornecedorProviderProps> = ({ children }) => {
    const fornecedorData = useFornecedoresPaginatedData(0, 10);

    return (
        <FornecedorContext.Provider value={{ fornecedorData }}>
            {children}
        </FornecedorContext.Provider>
    );
};


