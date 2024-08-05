/* import { createContext, FC, useContext, useState } from 'react';
import { IVariant, VariantContextProps } from '../@Types/productType';
import { ContextProviderProps } from '../@Types/types';


const VariantContext = createContext<VariantContextProps | undefined>(undefined);

export const VariantProvider: FC<ContextProviderProps> = ({ children }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);

    return (
        <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
            {children}
        </VariantContext.Provider>
    );
};


 */