import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

interface AuthState {
  user: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// 로그인 액션
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user.uid;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

// 로그아웃 액션
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return rejectWithValue(errorMessage);
  }
});

// 인증 상태를 관리하는 슬라이스
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
