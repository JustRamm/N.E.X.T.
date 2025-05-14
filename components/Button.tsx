import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  View
} from 'react-native';
import colors from '@/constants/colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  icon,
  ...props
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...sizeStyles[size],
    };

    if (disabled) {
      return {
        ...baseStyle,
        ...variantStyles[variant].disabled,
      };
    }

    return {
      ...baseStyle,
      ...variantStyles[variant].default,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...styles.text,
      ...textSizeStyles[size],
    };

    if (disabled) {
      return {
        ...baseStyle,
        ...variantStyles[variant].disabledText,
      };
    }

    return {
      ...baseStyle,
      ...variantStyles[variant].text,
    };
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.background : colors.primary} 
        />
      ) : (
        <View style={styles.contentContainer}>
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginLeft: 8,
  }
});

const sizeStyles = {
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
};

const textSizeStyles = {
  small: {
    fontSize: 14,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 18,
  },
};

const variantStyles = {
  primary: {
    default: {
      backgroundColor: colors.primary,
    },
    disabled: {
      backgroundColor: colors.primaryLight,
    },
    text: {
      color: colors.background,
    },
    disabledText: {
      color: colors.background,
    },
  },
  secondary: {
    default: {
      backgroundColor: colors.secondary,
    },
    disabled: {
      backgroundColor: colors.textLight,
    },
    text: {
      color: colors.background,
    },
    disabledText: {
      color: colors.background,
    },
  },
  outline: {
    default: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primary,
    },
    disabled: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    text: {
      color: colors.primary,
    },
    disabledText: {
      color: colors.primaryLight,
    },
  },
  text: {
    default: {
      backgroundColor: 'transparent',
    },
    disabled: {
      backgroundColor: 'transparent',
    },
    text: {
      color: colors.primary,
    },
    disabledText: {
      color: colors.primaryLight,
    },
  },
};

export default Button;