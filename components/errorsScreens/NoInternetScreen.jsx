
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import {loadOfflineCharacters,setOfflineMode} from "../../store/slices/charactersSlice"
import { useRouter } from "expo-router";
export default function NoInternetScreen({ onRetry,}) {
  const dispatch = useDispatch();
  const handleOfflineMode = async () => {
    try {
      // Загружаем оффлайн-данные и включаем оффлайн-режим
      await dispatch(loadOfflineCharacters());
      dispatch(setOfflineMode(true));

    //   router.replace("/(tabs)");
    } catch (error) {
      console.error('Failed to load offline characters:', error);
      alert('No offline data available');
    }
  };
    return (
        <View style={styles.noInternetContainer}>
            <Text style={styles.noInternetTitle}>
                No internet connection</Text>
            <Text style={styles.noInternetText}>Please check your internet connection</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <View>
                    <Text style={styles.retryButtonText}>Try again</Text>

                </View>
            </TouchableOpacity>

            <View style={styles.offlineMode}>
                <TouchableOpacity style={styles.offlineButton} onPress={handleOfflineMode}>
                    <View>
                        <Text style={styles.offlineButtonText}>Use offline mode</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    noInternetContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#eee',
    },
    noInternetTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10,
        color: '#333',
    },
    noInternetText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    retryButton: {
        backgroundColor: '#fff',
        borderColor: "#4C82FF",
        borderWidth: 1,
        paddingHorizontal: 90,
        paddingVertical: 10,
        borderRadius: 12,
        marginBottom:50,
    },
    offlineButton: {
        // backgroundColor: '#4C82FF',
        // paddingHorizontal: 90,
        // paddingVertical: 10,
        // borderRadius: 12,
    },
    offlineButtonText: {
        fontSize: 16,
        color:'8b8b8b',
    },
    retryButtonText: {
        fontSize: 16,
    },
})