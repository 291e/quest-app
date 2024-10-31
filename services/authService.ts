import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// 이메일과 비밀번호로 회원가입
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign Up Error:", error);
  }
};

// 이메일과 비밀번호로 로그인
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Sign In Error:", error);
  }
};

// 로그아웃
export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Log Out Error:", error);
  }
};