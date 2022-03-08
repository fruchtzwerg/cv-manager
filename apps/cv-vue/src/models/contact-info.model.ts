export type Icon = 'web' | 'mail' | 'phone' | 'address';

export interface ContactInfo {
  heading: string;
  records: Record<Icon, string> & {
    address: string[];
  };
}
