export interface PageRecord {
    id: number;
    title: string;
    slug: string;
    status: "draft" | "published";
    created_at: string;
  }

  export interface PageFilterData {
    page: number;
    limit: number;
    keyword?: string;
    status?: string;
  }
  
  export interface PageSearchBarProps {
    ThemeColors: any;
    filterData: PageFilterData;
    handleFilterUpdate: (
      key: keyof PageFilterData,
      value: string,
      autoApply?: boolean
    ) => void;
    handleFilter: () => void;
    handleClear: () => void;
    handleAddNew: () => void;
  }

  export interface PageRecord {
    id: number;
    title: string;
    slug: string;
    status: 0 | 1; // 0 = Draft, 1 = Publish
    url: string;
    created_at: string;
  }
  