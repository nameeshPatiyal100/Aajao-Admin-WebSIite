// ../components/types.ts
export interface PropertyRow {
    id: string;
    name: string;
    email: string;
    date: string;
    active: boolean;
    type: string;
    value: string;
    location: string;
  };

  // ../components/types.ts

export interface GenericRow {
  id: string;
  name?: string;
  email?: string;
  date?: string;
  active?: boolean;
  type?: string;
  value?: string;
  location?: string;
  // add optional fields so it's flexible
}

  