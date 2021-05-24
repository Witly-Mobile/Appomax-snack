import * as React from 'react';
import { Pressable } from 'react-native';

export default function InteractivePressable({ children, onPress }) {
	return <Pressable onPress={onPress}>{children}</Pressable>;
}
