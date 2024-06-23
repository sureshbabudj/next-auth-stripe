"use client";

import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface DashboardPageSidebarSearchProps {
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
}

export function DashboardPageSidebarSearch({
  placeholder = "Search",
  onSearch,
}: DashboardPageSidebarSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value);
    onSearch && onSearch(event.target.value);
  };
  return (
    <div className="relative mt-2">
      <input
        type="text"
        className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <SearchIcon className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" />
    </div>
  );
}
