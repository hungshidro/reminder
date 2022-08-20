import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';

// Define a type for the slice state
export interface ListState {
  id: string;
  name: string;
  count: number;
  color?: string;
  icon?: string
}

// Define the initial state using that type
type State = {
  list: ListState[];
};

const initialState: State = {
  list: [],
};

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<ListState>) => {
      state.list.push(action.payload);
    },
    incrementCount: (state, action: PayloadAction<{listId: string}>) => {
      state.list.forEach((value, index) => {
        if (value.id === action.payload.listId) {
            state.list[index].count = value.count+1
        }
      });
    },
    decrementCount: (state, action: PayloadAction<{listId: string}>) => {
      state.list.forEach((value, index) => {
        if (value.id === action.payload.listId) {
            state.list[index].count = value.count-1
        }
      });
    },
    clearList: (state) => {
      state.list.splice(0, state.list.length)
    },
    deleteList: (state,action: PayloadAction<{listId: string}>) => {
      state.list.forEach((value, index) => {
        if(value.id === action.payload.listId) {
          state.list.splice(index,1);
        }
      })
    }
  },
});

export const {addNewList, incrementCount,clearList,deleteList,decrementCount} = listSlice.actions;

export default listSlice.reducer;
