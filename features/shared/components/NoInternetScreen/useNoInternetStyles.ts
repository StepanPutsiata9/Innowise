import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    borderColor: '#4C82FF',
    borderWidth: 1,
    paddingHorizontal: 90,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 50,
  },

  offlineButtonText: {
    fontSize: 16,
    color: '8b8b8b',
  },
  retryButtonText: {
    fontSize: 16,
  },
});
