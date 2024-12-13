// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const getTheme = createAsyncThunk(
  "staff/getTheme",
  async (user_id, thunkAPI) => {
    try {
        console.log(user_id)
      const response = await fetch(`http://localhost:8000/api/v1/theme/${user_id}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const updateTheme = createAsyncThunk(
  "staff/updateTheme",
  async ({name,color,user_id}, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/theme/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,color,user_id}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
    theme:null,
    loading: false,
    error: null,
    message: null,
  };
  
  const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      clearErrors: (state) => {
        state.error = null;
      },
      clearMessage: (state) => {
        state.message = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getTheme.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getTheme.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.theme = action.payload.theme;
        })
        .addCase(getTheme.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        .addCase(updateTheme.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTheme.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.message = action.payload.message;
        })
        .addCase(updateTheme.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.error;
        })
        
    },
  });
  
  export const { clearErrors, clearMessage } = themeSlice.actions;
  
  export default themeSlice.reducer;
  
  