import React, { useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageErrorEventData,
  ImageStyle,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import { useAnimation } from '../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style = {} }: Props) => {
  const { opacity, fadeIn } = useAnimation();
  const [isLoading, setIsLoading] = useState(true);

  const finishLoading = () => {
    setIsLoading(false);
    fadeIn();
  };

  const onError = (_: NativeSyntheticEvent<ImageErrorEventData>) => {
    setIsLoading(false);
  };

  return (
    <View style={[ownStyles.container, { ...(style as any) }]}>
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute' }}
          color='grey'
          size={30}
        />
      )}

      <Animated.Image
        source={{ uri }}
        onError={onError}
        onLoad={finishLoading}
        style={{
          ...(style as any),
          opacity,
        }}
      />
    </View>
  );
};

const ownStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
