import User from '@/assets/user.jpg';

type UserData = {
  photo: string;
  full_name: string;
  client_type: string;
  email: string;
  localization: string;
};

export const user: UserData = {
  photo: User,
  full_name: 'Romeu Cajamba',
  client_type: 'Cliente VIP',
  email: 'romeucajamba@getMainColorOfGraphicItem.com',
  localization: 'Sambizanga',
};
