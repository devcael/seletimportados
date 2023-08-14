import React from 'react';

import Clientes from '@/domain/models/Clientes'; // Certifique-se de importar o modelo correto
import usePaginatedClientes from '@/hooks/usePaginatedClientes'; // Certifique-se de importar o hook correto

interface ClientesContextType {
    clientesData: ReturnType<typeof usePaginatedClientes>;
}

const ClientesContext = React.createContext<ClientesContextType | undefined>(undefined);

export const useClientesContext = () => {
    const context = React.useContext(ClientesContext);
    if (!context) {
        throw new Error('useClientesContext must be used within a ClientesProvider');
    }
    return context;
};

interface ClientesProviderProps {
    children: React.ReactNode;
}

export const ClientesProvider: React.FC<ClientesProviderProps> = ({ children }) => {
    const clientesData = usePaginatedClientes(0, 10);

    return (
        <ClientesContext.Provider value={{ clientesData }}>
            {children}
        </ClientesContext.Provider>
    );
};
