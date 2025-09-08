import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TranslationsState {
  currentLanguage: string;
  translations: Record<string, string>;
}

const initialState: TranslationsState = {
  currentLanguage: 'en',
  translations: {},
};

// Load from localStorage if available
const loadStateFromStorage = (): TranslationsState => {
  try {
    const savedLanguage = localStorage.getItem('currentLanguage');
    if (savedLanguage) {
      return {
        ...initialState,
        currentLanguage: savedLanguage,
      };
    }
  } catch (error) {
    console.error('Error loading translations state from localStorage:', error);
  }
  return initialState;
};

const translationsSlice = createSlice({
  name: 'translations',
  initialState: loadStateFromStorage(),
  reducers: {
    setCurrentLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      // Save to localStorage
      localStorage.setItem('currentLanguage', action.payload);
    },
    setTranslations: (state, action: PayloadAction<Record<string, string>>) => {
      state.translations = action.payload;
    },
    loadTranslations: (state, action: PayloadAction<{ language: string; translations: Record<string, string> }>) => {
      if (action.payload.language === state.currentLanguage) {
        state.translations = action.payload.translations;
      }
    },
  },
});

export const { setCurrentLanguage, setTranslations, loadTranslations } = translationsSlice.actions;
export default translationsSlice.reducer;
