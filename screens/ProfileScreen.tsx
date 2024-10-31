import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { logOut } from '../services/authService';

// 네비게이션 타입 정의
type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = async () => {
    try {
      await logOut();
      navigation.navigate('Login'); // 로그아웃 후 로그인 화면으로 이동
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>프로필</Text>
      <Text>사용자 정보 표시</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 }
});

export default ProfileScreen;