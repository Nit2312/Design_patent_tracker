import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Patent {
  id: string;
  title: string;
  applicant: string;
  filingDate: string;
  class: string;
  status: 'pending' | 'granted' | 'abandoned';
  image: string;
  description: string;
  inventors: string[];
  country: string;
  similarity?: number;
  patentNumber?: string;
}

export interface Watchlist {
  id: string;
  name: string;
  description: string;
  patents: Patent[];
  status: 'active' | 'draft' | 'archived';
  createdAt: string;
  tags: string[];
}

interface SearchFilters {
  applicant?: string;
  class?: string;
  status?: string;
  dateRange?: {
    from: string;
    to: string;
  };
  country?: string;
  inventor?: string;
  patentNumber?: string;
}

interface DataContextType {
  patents: Patent[];
  watchlists: Watchlist[];
  searchPatents: (query: string, filters?: SearchFilters, image?: File) => Promise<Patent[]>;
  createWatchlist: (name: string, description: string) => Promise<Watchlist>;
  addToWatchlist: (watchlistId: string, patent: Patent) => void;
  removeFromWatchlist: (watchlistId: string, patentId: string) => void;
  deleteWatchlist: (watchlistId: string) => void;
  getSimilarPatents: (patentId: string) => Promise<Patent[]>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

// Mock data with additional fields
const mockPatents: Patent[] = [
  {
    id: '1',
    title: 'Smartphone Design with Curved Display',
    applicant: 'TechCorp Inc.',
    filingDate: '2024-01-15',
    class: 'D14-138',
    status: 'granted',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'A sleek smartphone design featuring a curved display and minimalist aesthetic.',
    inventors: ['John Smith', 'Jane Doe'],
    country: 'US',
    patentNumber: 'US1234567',
  },
  {
    id: '2',
    title: 'Ergonomic Office Chair',
    applicant: 'FurniDesign Ltd.',
    filingDate: '2024-02-20',
    class: 'D06-301',
    status: 'pending',
    image: 'https://images.pexels.com/photos/586062/pexels-photo-586062.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Modern office chair with advanced ergonomic features and premium materials.',
    inventors: ['Mike Johnson'],
    country: 'US',
    patentNumber: 'US2345678',
  },
  {
    id: '3',
    title: 'Wireless Headphone Design',
    applicant: 'AudioTech Solutions',
    filingDate: '2024-03-10',
    class: 'D14-179',
    status: 'granted',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium wireless headphones with noise-canceling technology and sleek design.',
    inventors: ['Sarah Wilson', 'Tom Brown'],
    country: 'US',
    patentNumber: 'US3456789',
  },
  {
    id: '4',
    title: 'Smart Watch Interface',
    applicant: 'WearableTech Inc.',
    filingDate: '2024-01-28',
    class: 'D14-138',
    status: 'granted',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Innovative smartwatch design with circular display and premium materials.',
    inventors: ['Alex Lee'],
    country: 'US',
    patentNumber: 'US4567890',
  },
  {
    id: '5',
    title: 'Electric Vehicle Charging Station',
    applicant: 'GreenTech Motors',
    filingDate: '2023-12-05',
    class: 'D12-108',
    status: 'granted',
    image: 'https://images.pexels.com/photos/7859749/pexels-photo-7859749.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Sleek and modern electric vehicle charging station with user-friendly interface.',
    inventors: ['Emma Davis', 'Robert Chen'],
    country: 'EP',
    patentNumber: 'EP5678901',
  },
  {
    id: '6',
    title: 'Gaming Controller Design',
    applicant: 'GameTech Industries',
    filingDate: '2024-03-22',
    class: 'D21-456',
    status: 'pending',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Ergonomic gaming controller with customizable buttons and RGB lighting.',
    inventors: ['David Kim', 'Lisa Zhang'],
    country: 'JP',
    patentNumber: 'JP6789012',
  },
];

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [patents] = useState<Patent[]>(mockPatents);
  const [watchlists, setWatchlists] = useState<Watchlist[]>([
    {
      id: '1',
      name: 'Mobile Device Designs',
      description: 'Collection of smartphone and tablet design patents',
      patents: [mockPatents[0], mockPatents[3]],
      status: 'active',
      createdAt: '2024-01-10',
      tags: ['mobile', 'consumer electronics'],
    },
    {
      id: '2',
      name: 'Furniture Patents',
      description: 'Office and home furniture design patents',
      patents: [mockPatents[1]],
      status: 'active',
      createdAt: '2024-02-15',
      tags: ['furniture', 'ergonomic'],
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPatents = async (query: string, filters?: SearchFilters, image?: File): Promise<Patent[]> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let results = [...patents];
    
    // Text search
    if (query && query.trim()) {
      results = results.filter(patent => 
        patent.title.toLowerCase().includes(query.toLowerCase()) ||
        patent.applicant.toLowerCase().includes(query.toLowerCase()) ||
        patent.description.toLowerCase().includes(query.toLowerCase()) ||
        patent.inventors.some(inventor => inventor.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    // Apply filters
    if (filters?.applicant) {
      results = results.filter(patent => 
        patent.applicant.toLowerCase().includes(filters.applicant!.toLowerCase())
      );
    }
    
    if (filters?.inventor) {
      results = results.filter(patent => 
        patent.inventors.some(inventor => 
          inventor.toLowerCase().includes(filters.inventor!.toLowerCase())
        )
      );
    }
    
    if (filters?.patentNumber) {
      results = results.filter(patent => 
        patent.patentNumber?.toLowerCase().includes(filters.patentNumber!.toLowerCase())
      );
    }
    
    if (filters?.class) {
      results = results.filter(patent => patent.class === filters.class);
    }
    
    if (filters?.status) {
      results = results.filter(patent => patent.status === filters.status);
    }
    
    if (filters?.country) {
      results = results.filter(patent => patent.country === filters.country);
    }
    
    // Date range filter
    if (filters?.dateRange?.from || filters?.dateRange?.to) {
      results = results.filter(patent => {
        const filingDate = new Date(patent.filingDate);
        const fromDate = filters.dateRange?.from ? new Date(filters.dateRange.from) : null;
        const toDate = filters.dateRange?.to ? new Date(filters.dateRange.to) : null;
        
        if (fromDate && filingDate < fromDate) return false;
        if (toDate && filingDate > toDate) return false;
        return true;
      });
    }
    
    // Add similarity scores for demo
    results = results.map(patent => ({
      ...patent,
      similarity: Math.floor(Math.random() * 40) + 60, // 60-100%
    }));
    
    setIsLoading(false);
    return results;
  };

  const createWatchlist = async (name: string, description: string): Promise<Watchlist> => {
    const newWatchlist: Watchlist = {
      id: Date.now().toString(),
      name,
      description,
      patents: [],
      status: 'active',
      createdAt: new Date().toISOString(),
      tags: [],
    };
    
    setWatchlists(prev => [...prev, newWatchlist]);
    return newWatchlist;
  };

  const addToWatchlist = (watchlistId: string, patent: Patent) => {
    setWatchlists(prev => 
      prev.map(watchlist => 
        watchlist.id === watchlistId
          ? { ...watchlist, patents: [...watchlist.patents, patent] }
          : watchlist
      )
    );
  };

  const removeFromWatchlist = (watchlistId: string, patentId: string) => {
    setWatchlists(prev => 
      prev.map(watchlist => 
        watchlist.id === watchlistId
          ? { ...watchlist, patents: watchlist.patents.filter(p => p.id !== patentId) }
          : watchlist
      )
    );
  };

  const deleteWatchlist = (watchlistId: string) => {
    setWatchlists(prev => prev.filter(w => w.id !== watchlistId));
  };

  const getSimilarPatents = async (patentId: string): Promise<Patent[]> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const similarPatents = patents
      .filter(p => p.id !== patentId)
      .slice(0, 3)
      .map(patent => ({
        ...patent,
        similarity: Math.floor(Math.random() * 30) + 70, // 70-100%
      }));
    
    setIsLoading(false);
    return similarPatents;
  };

  return (
    <DataContext.Provider value={{
      patents,
      watchlists,
      searchPatents,
      createWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      deleteWatchlist,
      getSimilarPatents,
      isLoading,
    }}>
      {children}
    </DataContext.Provider>
  );
};