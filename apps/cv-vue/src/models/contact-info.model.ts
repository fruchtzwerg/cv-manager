export type Icon = 'web' | 'mail' | 'phone' | 'address';

export interface ContactInfo {
  heading: string;
  records: Omit<Record<Icon, string>, 'address'> & {
    address: string[];
  };
}
