export interface ListingRecord {
  id: number;
  name: string;
  bg_color: string;
  text_color: string;
}

export interface FilterData {
  keyword: string;
  [key: string]: any;
}

export interface FormValues {
  id: number;
  name: string;
  bg_color: string;
  text_color: string;
}

export interface ListingProps {
  statusListing: { id: number; name: string; bg_color: string; text_color: string; }[];
  totalRecords: number;
  loading: boolean;
  handlePaginate: (event: React.ChangeEvent<unknown>, page: number) => void;
  page: number;
  rowsPerPage: number;
  onSave: (row: ListingRecord) => void;
}

export interface SearchBarProps {
  ThemeColors: {
    primary: string;
    secondary?: string;
    background?: string;
    text?: {
      primary?: string;
      secondary?: string;
    };
  };
  handleFilterUpdate: (key: string, value: any, apply: boolean) => void;
  handleFilter: () => void;
  handleClear: () => void;
}