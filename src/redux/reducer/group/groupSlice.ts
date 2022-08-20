import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'redux/store';
import {icon} from 'utils/icons/icons';
import colors from 'utils/colors';

// Define a type for the slice state
export interface GroupState {
  id: string;
  name: string;
  color?: string;
  icon?: string;
  count?: number;
  show?: boolean;
}

// Define the initial state using that type
type State = {
  group: GroupState[];
};

const initialState: State = {
  group: [
    {
      id: '1',
      name: 'Today',
      icon: icon.today,
      color: colors.blue,
      count: 0,
      show:true
    },
    {
      id: '2',
      name: 'Schedule',
      icon: icon.calendar,
      color: colors.red,
      count: 0,
      show:true
    },
    {
      id: '3',
      name: 'All',
      icon: icon.albums,
      color: colors.gray02_dark,
      count: 0,
      show:true
    },
    {
      id: '4',
      name: 'Flagged',
      icon: icon.flag,
      color: colors.orange_dark,
      count: 0,
      show:true
    },
  ],
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    updateGroup: (
      state,
      action: PayloadAction<{id: string; data: GroupState}>,
    ) => {
      state.group.forEach((value, index) => {
        if ((value.id = action.payload.id))
          state.group[index] = action.payload.data;
      });
    },
    sortGroup: (state, action: PayloadAction<{from: number, to:number}>) => {},
    updateCount: (
      state,
      action: PayloadAction<{name: string; count: number}>,
    ) => {
      state.group.forEach((value, index) => {
        if (value.id === action.payload.name)
          state.group[index].count = action.payload.count;
      });
    },
    clearGroup: (state) => {
      state.group.splice(0,state.group.length)
    },
    initGroup: (state, action: PayloadAction<{data: GroupState[]}>) => {
      state.group = action.payload.data
    }
  },
});

export const {updateGroup,updateCount,sortGroup,clearGroup,initGroup} = groupSlice.actions;

export default groupSlice.reducer;
