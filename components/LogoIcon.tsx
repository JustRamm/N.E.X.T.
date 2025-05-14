import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface LogoIconProps {
  size?: number;
  style?: any;
}

const LogoIcon: React.FC<LogoIconProps> = ({ size = 100, style }) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image 
        source={require('@/assets/images/icon.png')} 
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoIcon;