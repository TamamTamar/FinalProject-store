import { useContext } from "react";
import { VariantContext } from "../contexts/VariantContext";

export const useVariant = () => {
    const context = useContext(VariantContext);
    if (!context) {
        throw new Error('useVariant must be used within a VariantProvider');
    }
    return context;
};