import { IconType } from 'react-icons';

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  avatar: string;
}

export interface Categorys {
  label: string;
  emoji: IconType;
  bg: string;
}

export interface Category {
  label: string;
  emoji: string;
  bg: string;
}

export interface NavItem {
  label: string;
}
