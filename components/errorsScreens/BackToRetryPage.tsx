import { View, TouchableOpacity, Text } from "react-native";

import { useAppDispatch } from "@/store/index";
import useStyles from "./useBackToRetryStyles";
import { setOfflineMode } from "../../store/slices/charactersSlice";
export default function BackToRetry() {
  const dispatch = useAppDispatch();
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.offlineBlock}
      onPress={() => {
        dispatch(setOfflineMode(false));
      }}
    >
      <Text style={styles.offlineBlockText}>Offline Mode. Back to Retry</Text>
    </TouchableOpacity>
  );
}
