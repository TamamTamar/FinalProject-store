import React, { createContext, useContext, useState, ReactNode, FC } from 'react';
import { IVariant, VariantContextProps } from '../@Types/productType';


export const VariantContext = createContext<VariantContextProps | undefined>(undefined);

export const VariantProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

    return (
        <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
            {children}
        </VariantContext.Provider>
    );
};


