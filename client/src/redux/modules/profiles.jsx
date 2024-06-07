import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showAlertMessage } from './alerts';
import { api, serverUrl } from '../../utils';

export const getCurrentProfile = createAsyncThunk('profiles/getCurrentProfile', async (_, { rejectWithValue }) => {
    try {
        const res = await api.get('/profiles/me');
        return res.data;
    } catch (err) {
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const createProfile = createAsyncThunk('profiles/createProfile', async ({ formData, history, edit }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.post('/profiles', formData);
        dispatch(showAlertMessage(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        if (!edit) {
            history.push('/home');
        }
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, 'error')));
        }
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const uploadProfileImage = createAsyncThunk('profiles/uploadProfileImage', async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
        const res = await api.post(`${serverUrl}/api/profiles/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (err) {
        return rejectWithValue({
            msg: err.response ? err.response.statusText : err.message,
            status: err.response ? err.response.status : null
        });
    }
});

export const getProfiles = createAsyncThunk('profiles/getProfiles', async (_, { dispatch, rejectWithValue }) => {
    dispatch(clearProfile());
    try {
        const res = await api.get('/profiles');
        return res.data;
    } catch (err) {
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const getProfileById = createAsyncThunk('profiles/getProfileById', async (userId, { rejectWithValue }) => {
    try {
        const res = await api.get(`/profiles/user/${userId}`);
        return res.data;
    } catch (err) {
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const addExperience = createAsyncThunk(
    'profiles/addExperience',
    async ({ formData, navigate }, { dispatch, rejectWithValue }) => {
        try {
            const res = await api.put('/profiles/experience', formData);
            dispatch(showAlertMessage('Experience added', 'success'));
            navigate('/home');
            return res.data;
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => dispatch(showAlertMessage(error.msg, 'error')));
            }
            return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
        }
    }
);

export const addEducation = createAsyncThunk('profiles/addEducation', async ({ formData, history }, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.put('/profiles/education', formData);
        dispatch(showAlertMessage('Education added', 'success'));
        history.push('/home');
        return res.data;
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(showAlertMessage(error.msg, 'error')));
        }
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const deleteExperience = createAsyncThunk('profiles/deleteExperience', async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/profiles/experience/${id}`);
        dispatch(showAlertMessage('Experience removed', 'success'));
        return res.data;
    } catch (err) {
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const deleteEducation = createAsyncThunk('profiles/deleteEducation', async (id, { dispatch, rejectWithValue }) => {
    try {
        const res = await api.delete(`/profiles/education/${id}`);
        dispatch(showAlertMessage('Education removed', 'success'));
        return res.data;
    } catch (err) {
        return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
    }
});

export const deleteAccount = createAsyncThunk('profiles/deleteAccount', async (_, { dispatch, rejectWithValue }) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await api.delete('/profiles');
            dispatch(clearProfile());
            dispatch(showAlertMessage('Your account has been permanently deleted'));
        } catch (err) {
            return rejectWithValue({ msg: err.response.statusText, status: err.response.status });
        }
    }
});

const profileSlice = createSlice({
    name: 'profiles',
    initialState: {
        profile: null,
        profiles: [],
        loading: true,
        error: {},
        image: null
    },
    reducers: {
        clearProfile(state) {
            state.profile = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(getCurrentProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(createProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(createProfile.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(uploadProfileImage.fulfilled, (state, action) => {
                state.image = action.payload;
            })
            .addCase(uploadProfileImage.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(getProfiles.fulfilled, (state, action) => {
                state.profiles = action.payload;
                state.loading = false;
            })
            .addCase(getProfiles.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(getProfileById.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(getProfileById.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addExperience.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(addExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(addEducation.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(addEducation.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteExperience.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(deleteExperience.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteEducation.fulfilled, (state, action) => {
                state.profile = action.payload;
                state.loading = false;
            })
            .addCase(deleteEducation.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(deleteAccount.fulfilled, (state) => {
                state.profile = null;
                state.profiles = [];
                state.loading = false;
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    }
});

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
