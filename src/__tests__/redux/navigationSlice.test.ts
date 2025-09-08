import navigationReducer, {
  setActiveSection,
  setActiveChild,
  setActiveUnit,
  setActiveSubTab,
} from '../../redux/slices/navigationSlice';
import type { NavigationState } from '../../redux/slices/navigationSlice';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
(global as any).localStorage = localStorageMock;

describe('navigationSlice', () => {
  const initialState: NavigationState = {
    activeSection: 'map',
    activeChild: '',
    activeUnit: '',
    activeSubTab: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    expect(navigationReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('should handle setActiveSection', () => {
    const action = setActiveSection('inputs');
    const newState = navigationReducer(initialState, action);
    
    expect(newState.activeSection).toBe('inputs');
    expect(newState.activeChild).toBe('');
    expect(newState.activeUnit).toBe('');
    expect(newState.activeSubTab).toBe('');
  });

  it('should handle setActiveChild', () => {
    const stateWithInputs = { ...initialState, activeSection: 'inputs' };
    const action = setActiveChild('chemistry');
    const newState = navigationReducer(stateWithInputs, action);
    
    expect(newState.activeChild).toBe('chemistry');
    expect(newState.activeUnit).toBe('');
    expect(newState.activeSubTab).toBe('');
  });

  it('should handle setActiveUnit', () => {
    const stateWithChemistry = {
      ...initialState,
      activeSection: 'inputs',
      activeChild: 'chemistry',
    };
    const action = setActiveUnit('reactor');
    const newState = navigationReducer(stateWithChemistry, action);
    
    expect(newState.activeUnit).toBe('reactor');
    expect(newState.activeSubTab).toBe('');
  });

  it('should handle setActiveSubTab', () => {
    const stateWithUnit = {
      ...initialState,
      activeSection: 'inputs',
      activeChild: 'chemistry',
      activeUnit: 'flow-chemistry',
    };
    const action = setActiveSubTab('incoming-water');
    const newState = navigationReducer(stateWithUnit, action);
    
    expect(newState.activeSubTab).toBe('incoming-water');
  });

  it('should reset child navigation when section changes from inputs', () => {
    const stateWithChild = {
      ...initialState,
      activeSection: 'inputs',
      activeChild: 'chemistry',
      activeUnit: 'reactor',
      activeSubTab: 'test',
    };
    const action = setActiveSection('calculate');
    const newState = navigationReducer(stateWithChild, action);
    
    expect(newState.activeSection).toBe('calculate');
    expect(newState.activeChild).toBe('');
    expect(newState.activeUnit).toBe('');
    expect(newState.activeSubTab).toBe('');
  });

  it('should reset unit navigation when child changes from chemistry', () => {
    const stateWithUnit = {
      ...initialState,
      activeSection: 'inputs',
      activeChild: 'chemistry',
      activeUnit: 'reactor',
      activeSubTab: 'test',
    };
    const action = setActiveChild('general');
    const newState = navigationReducer(stateWithUnit, action);
    
    expect(newState.activeChild).toBe('general');
    expect(newState.activeUnit).toBe('');
    expect(newState.activeSubTab).toBe('');
  });
});
