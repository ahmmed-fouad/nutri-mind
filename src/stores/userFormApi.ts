import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserFormData {
  name: string;
  age: number;
  gender: 'male' | 'female' | '';
  pregnant?: boolean;
  pregnancyMonth?: string;
  length: number;
  weight: number;
  waterPerDay: number;
  mealsPerDay?: number;
  favoriteMeal?: string;
  favoriteMealOther?: string;
  commonMeals?: string;
  commonMealsOther?: string;
  favoriteFruit?: string;
  favoriteFruitOther?: string;
  favoriteVegetables?: string;
  favoriteVegetablesOther?: string;
  favoriteSport?: string;
  favoriteSportOther?: string;
  exerciseHoursPerDay?: number;
}

interface UserFormState {
  [userId: string]: UserFormData;
}

const loadState = (): UserFormState => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('userForm');
    if (data) return JSON.parse(data);
  }
  return {};
};

const saveState = (state: UserFormState) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userForm', JSON.stringify(state));
  }
};

const initialState: UserFormState = loadState();

const userFormSlice = createSlice({
  name: 'userForm',
  initialState,
  reducers: {
    setUserForm: (
      state,
      action: PayloadAction<{ userId: string; data: UserFormData }>
    ) => {
      const { userId, data } = action.payload;
      state[userId] = data;
      saveState(state);
    },
  },
});

export const { setUserForm } = userFormSlice.actions;
export default userFormSlice.reducer;

export const selectUserForm = (state: UserFormState, userId: string) =>
  state[userId] || null; 