
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import {loadOfflineCharacters} from "../../store/slices/charactersSlice"
export default function NoInternetScreen({ onRetry }) {
    const dispatch=useDispatch();
    return (
        <View style={styles.noInternetContainer}>
            <Image
                source={require("../../assets/images/logo.png")}
                style={styles.logo}
            />
            <Text style={styles.noInternetTitle}>
                No internet connection</Text>
            <Text style={styles.noInternetText}>Please check your internet connection</Text>
            <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                <View>
                    <Text style={styles.retryButtonText}>Try again</Text>

                </View>
            </TouchableOpacity>

            <View style={styles.offlineMode}>
                <TouchableOpacity style={styles.offlineButton} onPress={() => { 
                    dispatch(loadOfflineCharacters)
                }}>
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
        backgroundColor: '#4C82FF',
        paddingHorizontal: 90,
        paddingVertical: 10,
        borderRadius: 12,
    },
    offlineButtonText: {
        fontSize: 16,
        color:'white',
    },
    retryButtonText: {
        fontSize: 16,
    },
})