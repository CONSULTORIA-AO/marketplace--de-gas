import User from '@/assets/user.jpg';

type UserData = {
  photo: string;
  full_name: string;
  client_type: string;
  email: string;
  localization: string;
  phone: string;
};

export const user: UserData = {
  photo: User,
  full_name: 'Romeu Cajamba',
  client_type: 'Cliente VIP',
  email: 'romeucajamba@gmail.com',
  localization: 'Sambizanga',
  phone: '943558106',
};
