import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RepeatType} from 'utils/types/rootTypes';

// Define a type for the slice state
export interface ReminderState {
  id: string;
  name: string;
  completed?: boolean;
  notificationID?: string;
  repeat?: RepeatType;
  sound?: string;
  flag?: boolean;
  dateTime?: number;
  priority?: number;
  notes: string;
  listId: string;
  image?: string;

}

// Define the initial state using that type
type State = {
  reminder: ReminderState[];
};

const initialState: State = {
  reminder: [],
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    addNewReminder: (state, action: PayloadAction<ReminderState>) => {
      state.reminder.push(action.payload);
    },
    updateCompleted: (
      state,
      action: PayloadAction<{id: string; complete: boolean}>,
    ) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder[index].completed = action.payload.complete;
        }
      });
    },
    updateNotification: (
      state,
      action: PayloadAction<{reminderId: string; notifiId: string}>,
    ) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.reminderId) {
          state.reminder[index].notificationID = action.payload.notifiId;
        }
      });
    },
    deleteReminder: (state, action: PayloadAction<{id: string}>) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder.splice(index, 1);
        }
      });
    },
    clearReminder: state => {
      state.reminder.splice(0, state.reminder.length);
    },
    updateName: (
      state,
      action: PayloadAction<{id: string; newName: string}>,
    ) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder[index].name = action.payload.newName;
        }
      });
    },
    changeSound: (
      state,
      action: PayloadAction<{id: string; sound: string}>,
    ) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder[index].sound = action.payload.sound;
        }
      });
    },
    updateReminder: (
      state,
      action: PayloadAction<{id: string; data: ReminderState}>,
    ) => {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder.splice(index, 1, action.payload.data);
        }
      });
    },
    updateFlag: (
      state,
      action: PayloadAction<{id: string; flag: boolean}>,
    )=> {
      state.reminder.forEach((value, index) => {
        if (value.id === action.payload.id) {
          state.reminder[index].flag=action.payload.flag
        }
      });
    }
  },
});

export const {
  addNewReminder,
  updateName,
  deleteReminder,
  updateCompleted,
  updateNotification,
  clearReminder,
  updateReminder,
  updateFlag
} = reminderSlice.actions;

export default reminderSlice.reducer;
