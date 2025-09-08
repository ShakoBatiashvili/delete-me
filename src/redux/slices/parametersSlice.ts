import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Parameter {
  id: string;
  name: string;
  parameter: string;
  value: number;
  group: string;
  unit?: string;
  alarm?: string;
  description?: string;
}

export interface ParameterGroup {
  id: string;
  name: string;
  description: string;
  parameters: Parameter[];
}

export interface ParametersState {
  groups: ParameterGroup[];
  availableElements: Array<{ label: string; value: string; formula?: string }>;
  loading: boolean;
  error: string | null;
}

const initialState: ParametersState = {
  groups: [
    {
      id: 'general',
      name: 'General Parameters',
      description: 'General water analysis parameters',
      parameters: [
        { id: '1', name: 'pH Level', parameter: 'pH', value: 7.25, group: 'general', unit: '', alarm: 'Normal', description: 'Acidity/alkalinity measurement' },
        { id: '2', name: 'Water Temperature', parameter: 'Temperature', value: 25.50, group: 'general', unit: '°C', alarm: 'Normal', description: 'Water temperature monitoring' },
        { id: '3', name: 'Water Clarity', parameter: 'Turbidity', value: 1.20, group: 'general', unit: 'NTU', alarm: 'Normal', description: 'Measure of water cloudiness' },
      ],
    },
    {
      id: 'chemical',
      name: 'Chemical Parameters',
      description: 'Chemical composition and properties',
      parameters: [
        { id: '4', name: 'Free Chlorine', parameter: 'Chlorine', value: 2.10, group: 'chemical', unit: 'mg/L', alarm: 'Normal', description: 'Chlorine disinfectant level' },
        { id: '5', name: 'Fluoride Content', parameter: 'Fluoride', value: 0.80, group: 'chemical', unit: 'mg/L', alarm: 'Normal', description: 'Fluoride concentration in water' },
      ],
    },
  ],
  availableElements: [],
  loading: false,
  error: null,
};

// Load from localStorage if available
const loadStateFromStorage = (): ParametersState => {
  try {
    const savedParameters = localStorage.getItem('parametersState');
    if (savedParameters) {
      const parsed = JSON.parse(savedParameters);
      return { ...initialState, ...parsed };
    }
  } catch (error) {
    console.error('Error loading parameters state from localStorage:', error);
  }
  return initialState;
};

const parametersSlice = createSlice({
  name: 'parameters',
  initialState: loadStateFromStorage(),
  reducers: {
    updateParameter: (state, action: PayloadAction<{ groupId: string; parameterId: string; value: number }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        const parameter = group.parameters.find(p => p.id === action.payload.parameterId);
        if (parameter) {
          parameter.value = action.payload.value;
          // Save to localStorage
          localStorage.setItem('parametersState', JSON.stringify(state));
        }
      }
    },
    addParameter: (state, action: PayloadAction<{ groupId: string; name: string; parameter: string; value: number; unit?: string; alarm?: string; description?: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        const newParameter: Parameter = {
          id: `param_${Date.now()}`,
          name: action.payload.name,
          parameter: action.payload.parameter,
          value: action.payload.value,
          group: action.payload.groupId,
          unit: action.payload.unit || '',
          alarm: action.payload.alarm || 'Normal',
          description: action.payload.description || '',
        };
        group.parameters.push(newParameter);
        // Save to localStorage
        localStorage.setItem('parametersState', JSON.stringify(state));
      }
    },
    removeParameter: (state, action: PayloadAction<{ groupId: string; parameterId: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.parameters = group.parameters.filter(p => p.id !== action.payload.parameterId);
        // Save to localStorage
        localStorage.setItem('parametersState', JSON.stringify(state));
      }
    },
    updateGroupDescription: (state, action: PayloadAction<{ groupId: string; description: string }>) => {
      const group = state.groups.find(g => g.id === action.payload.groupId);
      if (group) {
        group.description = action.payload.description;
        // Save to localStorage
        localStorage.setItem('parametersState', JSON.stringify(state));
      }
    },
    setAvailableElements: (state, action: PayloadAction<Array<{ label: string; value: string; formula?: string }>>) => {
      state.availableElements = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  updateParameter,
  addParameter,
  removeParameter,
  updateGroupDescription,
  setAvailableElements,
  setLoading,
  setError,
} = parametersSlice.actions;

export default parametersSlice.reducer;
