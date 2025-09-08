import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NavigationState {
  activeSection: string;
  activeChild: string;
  activeUnit: string;
  activeSubTab: string;
}

const initialState: NavigationState = {
  activeSection: 'map',
  activeChild: '',
  activeUnit: '',
  activeSubTab: '',
};

// Load from localStorage if available
const loadStateFromStorage = (): NavigationState => {
  try {
    const savedState = localStorage.getItem('navigationState');
    if (savedState) {
      return JSON.parse(savedState);
    }
  } catch (error) {
    console.error('Error loading navigation state from localStorage:', error);
  }
  return initialState;
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState: loadStateFromStorage(),
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
      // Reset child navigation when section changes
      if (action.payload !== 'inputs') {
        state.activeChild = '';
      }
      // Reset unit navigation when not in chemistry
      if (action.payload !== 'inputs' || state.activeChild !== 'chemistry') {
        state.activeUnit = '';
        state.activeSubTab = '';
      }
      // Save to localStorage
      localStorage.setItem('navigationState', JSON.stringify(state));
    },
    setActiveChild: (state, action: PayloadAction<string>) => {
      state.activeChild = action.payload;
      // Reset unit navigation when not in chemistry
      if (action.payload !== 'chemistry') {
        state.activeUnit = '';
        state.activeSubTab = '';
      }
      // Save to localStorage
      localStorage.setItem('navigationState', JSON.stringify(state));
    },
    setActiveUnit: (state, action: PayloadAction<string>) => {
      state.activeUnit = action.payload;
      // Reset sub-tab when unit changes
      state.activeSubTab = '';
      // Save to localStorage
      localStorage.setItem('navigationState', JSON.stringify(state));
    },
    setActiveSubTab: (state, action: PayloadAction<string>) => {
      state.activeSubTab = action.payload;
      // Save to localStorage
      localStorage.setItem('navigationState', JSON.stringify(state));
    },
  },
});

export const { setActiveSection, setActiveChild, setActiveUnit, setActiveSubTab } = navigationSlice.actions;
export default navigationSlice.reducer;
