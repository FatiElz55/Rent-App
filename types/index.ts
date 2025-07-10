export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'renter';
  avatar?: string;
  phone?: string;
  createdAt: Date;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  address: string;
  images: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  ownerId: string;
  owner: User;
  availability: boolean;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  latitude?: number;
  longitude?: number;
}

export interface Booking {
  id: string;
  propertyId: string;
  property: Property;
  customerId: string;
  customer: User;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  guests: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: Date;
}

export interface Review {
  id: string;
  propertyId: string;
  customerId: string;
  customer: User;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  bookingId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface SearchFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  amenities?: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'customer' | 'renter') => Promise<void>;
  logout: () => void;
  loading: boolean;
}