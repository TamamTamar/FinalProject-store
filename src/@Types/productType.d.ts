
//types for product
export type IImage = {
    url?: string;
};

//types for variant
export type IVariant = {
    _id?: string;
    size: string;
    quantity: number;
    price: number;
};

//types for product
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

//types for product with more properties
export type IProduct = IProductInput & {
    _id: string;
    createdAt: Date;
    shoppingCart: string[];
    sold: number;
    userId: string;
};


/* export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
}; */


export interface ICartItem {
    productId: string;
    variantId: string;
    title: string;
    price: number;
    size: string;
    quantity: number;
    image: IImage;
}

// טיפוס עבור עגלת קניות
export interface ICart {
    userId: string;
    items: ICartItem[];
}

// טיפוס עבור עגלת קניות עם סיכומים
export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
}

// טיפוס עבור הקונטקסט של עגלת הקניות
export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
    addToCart: (productId: string, variantId: string, quantity: number, size: string, price: number) => Promise<void>;
}

// טיפוס עבור פרטי מוצר בהזמנה
export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    title: string;
    price: number;
};

export type IOrder = {
    _id: string;
    orderId: string;
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: string; // Assuming it's a string, convert it if necessary
    orderNumber: string;

};

export type OrderResponse = {
    count: number;
    orders: IOrder[];
};


// טיפוס עבור שאילתה של מכירות לפי תאריך
export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
}

// טיפוס עבור רכיב כפתור "הוסף לעגלה"
export interface AddToCartButtonProps {
    productId: string;
    variants: IVariant[];
    title: string;
    image: IImage;
}

// טיפוס עבור שם
export type IName = {
    first: string;
    middle?: string;
    last: string;
};

// טיפוס עבור כתובת
export type IAddress = {
    street: string;
    city: string;
    state?: string;
    zip?: string;
    country: string;
    houseNumber: number;
};

// טיפוס עבור פרטי משתמש בעת הרשמה
export type RegisterUser = {
    name: IName;
    phone: string;
    email: string;
    password: string;
    address: IAddress;
};

// טיפוס עבור פרטי התחברות
export type ILogin = {
    email: string;
    password: string;
};

// טיפוס עבור פרטי משתמש
export type IUserInput = {
    email: string;
    phone: string;
    password: string;
    address: IAddress;
    name: IName;
};

// טיפוס עבור משתמש (כולל פרטים נוספים)
export type IUser = IUserInput & {
    _id: string;
    createdAt: Date;
    isAdmin: boolean;
    cart: ICartProduct[];
};

// טיפוס עבור רכיב המספק קונטקסט לילדים
export interface ContextProviderProps {
    children: ReactNode;
}

// טיפוס עבור ה-Payload של JWT
export type IJWTPayload = {
    _id: string;
    isAdmin: boolean;
};

// טיפוס עבור קונטקסט האימות
export interface AuthContextType {
    token: string | null;
    user: IUser | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (form: IUser) => Promise<void>;
    logout: () => void;
    onUpdateUser: (user: IUser) => void;
}

// טיפוס עבור שגיאה
export type ErrorType = {
    status: number;
    message: string;
    details: string;
};

// טיפוס עבור טוקן מפוענח
export interface DecodedToken {
    _id: string;
    isAdmin: boolean;
}

// טיפוס עבור קונטקסט החיפוש
export interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

// טיפוס עבור רכיב עם ילדים
export type FCC = ({ children }: { children: ReactNode }) => ReactNode;

// טיפוס עבור עדכון פרטי משתמש
export type updateUserType = {
    name: IName;
    phone: string;
    address: IAddress;
};
export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
    addToCart: (productId: string, variant: IVariant) => void; // Removed price
}
export interface DateRangePickerProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
}
export type IMessage ={
    _id?: string;
    fullName: string;
    email: string;
    message: string;
    createdAt?: Date;
  }
  interface VariantContextProps {
    selectedVariant: IVariant | null;
    setSelectedVariant: (variant: IVariant | null) => void;
}

  