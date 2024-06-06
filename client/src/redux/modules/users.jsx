import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthToken } from '../../utils';
import { showAlertMessage } from './alerts';

export const loadUser = createAsyncThunk('users/loadUser', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/users');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const register = createAsyncThunk('users/register', async (formData, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.post('/users/register', formData);
    setAuthToken(res.data.token); // set token after successful login
    dispatch(loadUser());
    return res.data;
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => {
        dispatch(showAlertMessage(err.msg, 'error'));
      });
    }
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk('users/login', async ({ email, password }, { dispatch, rejectWithValue }) => {
  try {
    const res = await api.post('/users/login', { email, password });
    setAuthToken(res.data.token); // تعيين التوكن بعد تسجيل الدخول بنجاح
    dispatch(loadUser());
    return res.data;
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(err => {
        dispatch(showAlertMessage(err.msg, 'error'));
      });
    }
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('users/logout', async (_, { dispatch }) => {
  setAuthToken();
  dispatch(userSlice.actions.logoutSuccess());
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
  },
  reducers: {
    logoutSuccess(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        setAuthToken(action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        setAuthToken();
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        setAuthToken(action.payload.token);
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        setAuthToken();
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      });
  }
});

export default userSlice.reducer;
