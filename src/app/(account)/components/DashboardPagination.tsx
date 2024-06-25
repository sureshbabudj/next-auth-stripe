"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";

export interface DashboardPaginationProps {
  limit: number;
  totalProducts: number;
  currentPage: number;
  onChange?: (page: number) => void;
}

export function DashboardPagination({
  limit,
  totalProducts,
  currentPage: initialCurrentPage,
  onChange,
}: DashboardPaginationProps) {
  const [currentPage, setCurrentPage] = useState(initialCurrentPage);

  const totalPages = Math.ceil(totalProducts / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevAction = () => {
    if (currentPage - 1 <= 0) return;
    handlePageClick(currentPage - 1);
  };

  const handleNextAction = () => {
    if (currentPage + 1 > totalPages) return;
    handlePageClick(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    onChange && onChange(page);
  };

  useEffect(() => {
    setCurrentPage(initialCurrentPage);
  }, [initialCurrentPage]);

  if (totalProducts === 0) return <></>;

  return (
    <div className="flex w-full mt-5 space-x-2 justify-end">
      <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
        <ChevronLeftIcon className="h-4" onClick={handlePrevAction} />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 ${
            page === currentPage
              ? "bg-gray-100 dark:bg-gray-800 dark:text-white"
              : ""
          } leading-none`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
        <ChevronRightIcon className="h-4" onClick={handleNextAction} />
      </button>
    </div>
  );
}
