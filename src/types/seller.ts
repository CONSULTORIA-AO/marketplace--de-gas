export type UserRole = 'buyer' | 'seller' | 'admin' | 'both'; 

export type AccountStatus = 
  | 'active' 
  | 'pending_verification' 
  | 'suspended' 
  | 'banned' 
  | 'deactivated';


export type VerificationLevel = 
  | 'none' 
  | 'email' 
  | 'phone' 
  | 'document'           
  | 'address'             
  | 'full';               


export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;         
  postalCode: string;
  country?: string;       
  isDefault?: boolean;
  type?: 'residential' | 'commercial' | 'pickup';
  reference?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'debit_card' | 'pix' | 'boleto' | 'paypal' | 'other';
  lastFour?: string;     
  brand?: string;         
  expiry?: string;        
  isDefault: boolean;
  nameOnCard?: string;
  pixKey?: string;
  createdAt: string;
}


export interface SellerProfile {
  storeName: string;              
  storeSlug?: string;             
  description?: string;           
  logoUrl?: string;
  bannerUrl?: string;
  categoryMain?: string;         
  rating?: number;                
  totalReviews?: number;
  totalSales?: number;
  joinedAt: string;             
  verifiedSeller?: boolean;       
  responseTime?: number;          
  shippingPolicy?: string;
  returnPolicy?: string;
}

export interface User {
  id: string;                   
  email: string;
  passwordHash?: string;        
  fullName: string;
  displayName?: string;           
  phone?: string;
  cpf?: string;                   
  cnpj?: string;                  
  birthDate?: string;             
  avatarUrl?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer_not_to_say';
  
  addresses: Address[];
  defaultAddressId?: string;

  // Pagamentos salvos
  paymentMethods: PaymentMethod[];

  // Papel e status
  role: UserRole;
  status: AccountStatus;
  verification: VerificationLevel;

  sellerProfile?: SellerProfile;
  
  preferredLanguage?: 'pt-BR' | 'en' | 'es';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    orderUpdates: boolean;
    promotions: boolean;
  };


  createdAt: string;
  lastLogin?: string;
  totalOrders?: number;           
  totalPurchasesAmount?: number;
  wishlistCount?: number;

  // Tokens / autenticação
  accessToken?: string;          
  refreshToken?: string;

  // Campos para extensibilidade futura
  metadata?: Record<string, any>;
}

export type UserProfileUpdate = Partial<
  Pick<
    User,
    | 'fullName'
    | 'displayName'
    | 'phone'
    | 'avatarUrl'
    | 'addresses'
    | 'defaultAddressId'
    | 'notifications'
    | 'preferredLanguage'
  >
> & {
  sellerProfile?: Partial<SellerProfile>;
};