import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



interface CounterState {
  value: number;
  data: {[key: string]: string|number|boolean|unknown[]}[];
  loading: boolean;
}

const initialState: CounterState = {
  value: 0,
  data: [{}],
  loading: true,
};

export const fetchcounter = createAsyncThunk(
  'counter/fetchcounter',
  async (_,thunkAPI) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: thunkAPI.signal // Attach the signal to the fetch request
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data; // Return the entire data array
    } catch (error) {
      console.error('Failed to fetch counter catch:', error);
    //   return thunkAPI.rejectWithValue("Failed to fetch counter api");
    }
  }
);

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {

      state.value += 1;
    },
    decrement: state => {
        state.value = Math.max(0, state.value - 1);
    },
    change: (state) => {
        if (state.data.length > 0) {
        state.data[0].name="New Title";
    }}
  },
   extraReducers: builder => {
    builder
      .addCase(fetchcounter.pending, (state) => {
        state.loading = true;
       console.log('Fetching counter...');
      })
      .addCase(fetchcounter.fulfilled, (state, action) => {
        state.data=action.payload;
        state.loading = false;
      })
      .addCase(fetchcounter.rejected, (state, action) => {
     console.error('Failed to fetch counter:base', action.error.message);
        state.loading = false;
      });
  },
});


export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;