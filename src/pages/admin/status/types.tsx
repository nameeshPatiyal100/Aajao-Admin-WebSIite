export interface ListingRecord {
  id: number;
  name: string;
  bg_color: string;
  text_color: string;
}

export interface BookingStatusRow {
  bs_id: number;
  bs_title: string;
  bs_code: string | null;
}

export interface FilterData {
  page: number;
  limit: number;
  keyword: string;
}

export interface FormValues {
  id: number;
  name: string;
  bg_color: string;
  text_color: string;
}

export interface ListingProps {
  statusListing: BookingStatusRow[];
  totalRecords: number;
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handlePaginate: (_: unknown, value: number) => void;
  onSave: (row: BookingStatusRow) => void;
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