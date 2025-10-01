import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { RootState, useAppDispatch } from "@/store/store";
import {
  searchCharacter,
  searchCharactersAPI,
  endSearch,
} from "@/features/characters/store/charactersSlice";

export const useSearch = () => {
  const dispatch = useAppDispatch();

  const searchQuery = useSelector(
    (state: RootState) => state.characters.searchQuery
  );
  const isSearching = useSelector(
    (state: RootState) => state.characters.isSearching
  );

  const [localQuery, setLocalQuery] = useState(searchQuery);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        dispatch(searchCharactersAPI(query));
      }
    }, 500),
    [dispatch]
  );

  const handleTextChange = useCallback(
    (inputText: string) => {
      setLocalQuery(inputText);

      dispatch(searchCharacter(inputText));

      if (!inputText.trim()) {
        dispatch(endSearch());
        dispatch(searchCharactersAPI(""));
      } else {
        debouncedSearch(inputText);
      }
    },
    [dispatch, debouncedSearch]
  );

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
      if (isSearching) {
        dispatch(endSearch());
      }
    };
  }, [dispatch, debouncedSearch, isSearching]);

  return {
    localQuery,
    handleTextChange,
    placeholder: "Search character...",
  };
};
