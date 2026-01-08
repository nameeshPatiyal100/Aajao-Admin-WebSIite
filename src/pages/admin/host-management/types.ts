export interface Host {
    id: string;
    name: string;
    age: number;
    email: string;
    date: string;
    status: "Active" | "Inactive";
    isVerified: boolean;
    propertyCount: number;
  }
  

  export interface Host {
    id: string;
    name: string;
    email: string;
    date: string;
    status: "Active" | "Inactive";
    isVerified: boolean;
    propertyCount: number;
  }
  
  export type ModalMode = "add" | "view" | "edit";
  