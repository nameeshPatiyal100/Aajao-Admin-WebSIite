import { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

// Create a default context value to avoid undefined checks
const defaultContextValue: SidebarContextType = {
  isCollapsed: false,
  toggleSidebar: () => {},
};

// Create the context with the default value
const SidebarContext = createContext<SidebarContextType>(defaultContextValue);

// Hook for consuming the sidebar context
export const useSidebar = (): SidebarContextType => {
  return useContext(SidebarContext);
};

interface SidebarProviderProps {
  children: ReactNode;
}

// Provider component for the sidebar context
export const SidebarProvider = ({ children }: SidebarProviderProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};