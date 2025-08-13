import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import {
  setFilters,
  resetFilters,
  clearCharacters,
  fetchCharacters,
} from "../../../store/slices/charactersSlice";
import Modal from "react-native-modal";
import useStyles from "./useFilterStyles";
import { useAppDispatch } from "@/store/index";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type FilterType = "status" | "species";

interface FilterValues {
  status: "Alive" | "Dead" | "unknown" | "";
  species: string;
}

const statusOptions = ["", "Alive", "Dead", "unknown"] as const;
const speciesOptions = ["", "Human", "Alien"] as const;

const Filters: React.FC = () => {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  const insets = useSafeAreaInsets();

  const [visibleFilter, setVisibleFilter] = useState<FilterType | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<FilterValues>({
    status: "",
    species: "",
  });

  const handleFilterSelect = (filterType: FilterType, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const applyFilters = () => {
    dispatch(clearCharacters());
    dispatch(setFilters(selectedFilters));
    dispatch(fetchCharacters());
    setVisibleFilter(null);
  };

  const resetAllFilters = () => {
    dispatch(clearCharacters());
    dispatch(resetFilters());
    dispatch(fetchCharacters());
    setSelectedFilters({ status: "", species: "" });
    setVisibleFilter(null);
  };

  const renderFilterModal = () => {
    if (!visibleFilter) return null;

    const options = visibleFilter === "status" ? statusOptions : speciesOptions;
    const currentValue = selectedFilters[visibleFilter];

    return (
      <Modal
        isVisible={!!visibleFilter}
        onBackdropPress={() => setVisibleFilter(null)}
        style={styles.modal}
      >
        <View style={[styles.modalContent, { paddingBottom: insets.bottom }]}>
          {options.map((option) => (
            <TouchableOpacity
              key={option || "empty"}
              style={[
                styles.filterOption,
                currentValue === option && styles.selectedFilterOption,
              ]}
              onPress={() => handleFilterSelect(visibleFilter, option)}
            >
              <Text style={styles.filterOptionText}>{option || "All"}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.filterButtons}>
            <TouchableOpacity
              style={
                [
                  styles.filterButton,
                  styles.applyButton,
                ] as StyleProp<ViewStyle>
              }
              onPress={applyFilters}
            >
              <Text style={styles.filterButtonText}>Set</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, styles.resetButton]}
              onPress={resetAllFilters}
            >
              <Text style={styles.filterButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.filterContainer}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisibleFilter("status")}
      >
        <Text style={styles.filterButtonText}>
          {selectedFilters.status || "Status"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setVisibleFilter("species")}
      >
        <Text style={styles.filterButtonText}>
          {selectedFilters.species || "Species"}
        </Text>
      </TouchableOpacity>

      {renderFilterModal()}
    </View>
  );
};

export default React.memo(Filters);
