export interface SelectOption {
  value: string | number;
  label: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
  badge?: number;
}

export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  order: SortOrder;
}

export interface FilterConfig {
  [key: string]: any;
}