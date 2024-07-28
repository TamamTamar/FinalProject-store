export type IImage = {
    url?: string;
};

export type IProductInput = {
    title: string;
    subtitle: string;
    description: string;
    image: IImage;
    alt: string;
    sizes: string[];
    barcode: number;
    variants: IVariant[];
};

export type IVariant = {
    _id : string;
    size: string;
    price: number;
    quantity: number;
}
export type IProduct = IProductInput & {
    _id: string;
    barcode: number;
    createdAt: Date;
   shoppingCart: string[]; 
    sold: number;
    userId: string;
};


export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
};

export type ICartItem = {
    productId: string;
    title: string;
    image: IImage;
    variants: IVariant[];
    _id: string;
};

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
};

export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
};

export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
}


export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    title: string; // הוספת title
    price: number; // הוספת price

};

export type IOrder = {
    _id: string;
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    orderNumber: string;
};

export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
};
export interface AddToCartButtonProps {
    productId: string;
    variantId: string;
    title: string;
    price: number;
    image: string;
    size: string;
    onAdd: () => void;
}