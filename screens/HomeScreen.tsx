import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>홈 화면</Text>
      <Button title="메인 퀘스트" onPress={() => navigation.navigate('QuestList', { type: 'main' })} />
      <Button title="서브 퀘스트" onPress={() => navigation.navigate('QuestList', { type: 'sub' })} />
      <Button title="일일 퀘스트" onPress={() => navigation.navigate('QuestList', { type: 'daily' })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

export default HomeScreen;