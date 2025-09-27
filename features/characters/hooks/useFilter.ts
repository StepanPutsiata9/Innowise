import { useState, useCallback } from "react";
import { FilterType, FilterValues } from "../types/character.interfaces";
import {
  setFilters,
  resetFilters,
  clearCharacters,
  fetchCharacters,
} from "../store/charactersSlice";
import { useAppDispatch } from "@/store/store";

export const useFilter = () => {
  const dispatch = useAppDispatch();

  const [visibleFilter, setVisibleFilter] = useState<FilterType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    status: "",
    species: "",
  });

  const handleFilterSelect = useCallback(
    (filterType: FilterType, value: string) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    },
    []
  );

  const applyFilters = useCallback(() => {
    dispatch(clearCharacters());
    dispatch(setFilters(selectedFilters));
    dispatch(fetchCharacters());
    setVisibleFilter(null);
  }, [dispatch, selectedFilters]);

  const resetAllFilters = useCallback(() => {
    dispatch(clearCharacters());
    dispatch(resetFilters());
    dispatch(fetchCharacters());
    setSelectedFilters({ status: "", species: "" });
    setVisibleFilter(null);
  }, [dispatch]);

  const openFilter = useCallback((filterType: FilterType) => {
    setVisibleFilter(filterType);
  }, []);

  const closeFilter = useCallback(() => {
    setVisibleFilter(null);
  }, []);

  return {
    visibleFilter,
    selectedFilters,
    openFilter,
    closeFilter,
    handleFilterSelect,
    applyFilters,
    resetAllFilters,
    setVisibleFilter,
  };
};
