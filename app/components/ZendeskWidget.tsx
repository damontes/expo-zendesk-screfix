import Ionicons from '@expo/vector-icons/Ionicons';
import React, { ComponentProps } from 'react';
import { StyleSheet, Pressable, PressableProps } from 'react-native';

interface IconButtonProps extends PressableProps {
  icon: ComponentProps<typeof Ionicons>['name'];
}

const ZendeskWidget = ({ icon, style, ...rest }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        typeof style === 'function'
          ? style({
              pressed,
              hovered: false,
            })
          : style,
      ]}
      {...rest}
    >
      <Ionicons size={32} name={icon} style={styles.icon} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: '#151718',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    color: 'white',
  },
});

export default ZendeskWidget;
