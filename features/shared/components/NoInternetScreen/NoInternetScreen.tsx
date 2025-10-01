import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useAppDispatch } from "@/store/store";
import {
  loadOfflineCharacters,
  setOfflineMode,
} from "@/features/characters/store/charactersSlice";
import { styles } from "./useNoInternetStyles";

interface INoInternetProps {
  onRetry: () => void;
}
export const NoInternetScreen = ({ onRetry }: INoInternetProps) => {
  const dispatch = useAppDispatch();
  const handleOfflineMode = async () => {
    try {
      await dispatch(loadOfflineCharacters());
      dispatch(setOfflineMode(true));
    } catch (error) {
      console.error("Failed to load offline characters:", error);
      alert("No offline data available");
    }
  };
  return (
    <View style={styles.noInternetContainer}>
      <Text style={styles.noInternetTitle}>No internet connection</Text>
      <Text style={styles.noInternetText}>
        Please check your internet connection
      </Text>
      <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
        <View>
          <Text style={styles.retryButtonText}>Try again</Text>
        </View>
      </TouchableOpacity>

      <View>
        <TouchableOpacity onPress={handleOfflineMode}>
          <View>
            <Text style={styles.offlineButtonText}>Use offline mode</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
