import { TouchableOpacity, Text } from "react-native";
import { useAppDispatch } from "@/store/store";
import { setOfflineMode } from "@/features/characters/store/charactersSlice";
import { IThemeColors } from "@/features/theme/types/theme.interfaces";
import useStyles from "./useBackToRetryStyles";

interface IBackToRetryProps {
  themeColors: IThemeColors;
}
export const BackToRetry = ({ themeColors }: IBackToRetryProps) => {
  const dispatch = useAppDispatch();
  const styles = useStyles(themeColors);
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
};
