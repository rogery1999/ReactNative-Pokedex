import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator size={50} color='grey' />
      <Text style={styles.activityIndicatorText}>Cargando...</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorText: {
    marginTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
});
