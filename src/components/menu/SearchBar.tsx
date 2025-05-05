
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  isSearchVisible: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setIsSearchVisible: (isVisible: boolean) => void;
}

const SearchBar = ({ 
  isSearchVisible, 
  searchQuery, 
  setSearchQuery, 
  setIsSearchVisible 
}: SearchBarProps) => {
  return (
    <div className="flex justify-center mb-6">
      {isSearchVisible ? (
        <div className="relative w-full max-w-md">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-800 border-gray-700 pl-10 pr-4"
            autoFocus
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            onClick={() => setIsSearchVisible(false)}
          >
            ✕
          </button>
        </div>
      ) : (
        <Button
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-gray-800"
          onClick={() => setIsSearchVisible(true)}
        >
          <Search className="mr-2 h-4 w-4" /> Buscar
        </Button>
      )}
    </div>
  );
};

export default SearchBar;
