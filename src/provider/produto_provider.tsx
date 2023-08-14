import React from 'react';

import Produto from '@/domain/models/Produto';
import usePaginatedData from '@/hooks/useProdutoPaginationData';



interface ProductContextType {
    productData: ReturnType<typeof usePaginatedData>;
}

const ProductContext = React.createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
    const context = React.useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
};

interface ProductProviderProps {
    children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
    const productData = usePaginatedData<Produto>(0, 10);

    return (
        <ProductContext.Provider value={{ productData }}>
            {children}
        </ProductContext.Provider>
    );
};
