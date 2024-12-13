// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getstrategy = createAsyncThunk(
  "staff/getstrategy",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/game/getstrategy");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const LeaderBoard = createAsyncThunk(
  "staff/LeaderBoard",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/game/getLeaderBoard");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);


export const updateresult = createAsyncThunk(
  "student/updateresult",
  async (payload, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`http://localhost:8000/api/v1/game/updateresult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const strategySave = createAsyncThunk(
  "student/strategySave",
  async (newStrategy, thunkAPI) => {
    try {
      // Your asynchronous logic to update student here
      const response = await fetch(`http://localhost:8000/api/v1/game/addstrategy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStrategy),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      // Handle error
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
const initialState = {
  allresult:null,
  strategy:null,
  loading: false,
  error: null,
  message: null,
};

const gameSlice = createSlice({
  name: "game",
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
      
      .addCase(LeaderBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LeaderBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allresult = action.payload.leaderboard;
      })
      .addCase(LeaderBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(getstrategy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getstrategy.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.strategy = action.payload.strategy;
      })
      .addCase(getstrategy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(updateresult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateresult.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(updateresult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(strategySave.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(strategySave.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(strategySave.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
  },
});

export const { clearErrors, clearMessage } = gameSlice.actions;

export default gameSlice.reducer;

