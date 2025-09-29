// import { useCallback, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { RootState, useAppDispatch } from "@/store/store";
// import { fetchCharacters } from "@/features/characters/store/charactersSlice";

// export const useCharacters = () => {
//   const dispatch = useAppDispatch();
//   const {
//     filteredCharacters,
//     offlineCharacters,
//     loading,
//     hasMore,
//     isOfflineMode,
//     isSearching,
//     searchQuery,
//   } = useSelector((state: RootState) => state.characters);

//   const displayData = isOfflineMode ? offlineCharacters : filteredCharacters;

//   const uniqueCharacters = useMemo(() => {
//     if (!displayData) return [];
//     const seen = new Set();
//     return displayData.filter((char) => {
//       if (seen.has(char.id)) return false;
//       seen.add(char.id);
//       return true;
//     });
//   }, [displayData]);

//   const handleLoadMore = useCallback(() => {
//     if (hasMore && !loading && !isOfflineMode && !isSearching) {
//       dispatch(fetchCharacters());
//     }
//   }, [hasMore, loading, dispatch, isOfflineMode, isSearching]);

//   const emptyText = useMemo(() => {
//     if (loading) return null;
//     return isSearching
//       ? `No characters found for "${searchQuery}"`
//       : "No characters available";
//   }, [loading, isSearching, searchQuery]);

//   return {
//     characters: uniqueCharacters,
//     loading,
//     hasMore,
//     handleLoadMore,
//     emptyText,

//     isOfflineMode,
//     isSearching,
//     searchQuery,
//   };
// };

import { useCallback, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/store/store";
import { fetchCharacters } from "@/features/characters/store/charactersSlice";

export const useCharacters = () => {
  const dispatch = useAppDispatch();

  const {
    filteredCharacters,
    offlineCharacters,
    loading,
    hasMore,
    isOfflineMode,
    isSearching,
    searchQuery,
  } = useSelector((state: RootState) => state.characters);

  const displayData = isOfflineMode ? offlineCharacters : filteredCharacters;

  // Убираем дубликаты персонажей
  const characters = useMemo(() => {
    if (!displayData) return [];
    const seen = new Set();
    return displayData.filter((char) => {
      if (seen.has(char.id)) return false;
      seen.add(char.id);
      return true;
    });
  }, [displayData]);

  // Загрузка дополнительных данных
  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading && !isOfflineMode && !isSearching) {
      dispatch(fetchCharacters());
    }
  }, [hasMore, loading, dispatch, isOfflineMode, isSearching]);

  // Текст для пустого состояния
  const emptyText = useMemo(() => {
    if (loading) return null;
    return isSearching
      ? `No characters found for "${searchQuery}"`
      : "No characters available";
  }, [loading, isSearching, searchQuery]);

  // Логика первоначальной загрузки
  useEffect(() => {
    if (!isOfflineMode && !isSearching && !searchQuery) {
      dispatch(fetchCharacters());
    }
  }, [dispatch, isOfflineMode, isSearching, searchQuery]);

  return {
    characters,
    loading,
    hasMore,
    handleLoadMore,
    emptyText,
  };
};
