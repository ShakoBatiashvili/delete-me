import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import PageHeader from '../../modules/header/PageHeader';
import navigationSlice from '../../redux/slices/navigationSlice';
import translationsSlice from '../../redux/slices/translationsSlice';
import parametersSlice from '../../redux/slices/parametersSlice';

// Mock the API module
jest.mock('../../utils/api', () => ({
  loadTranslations: jest.fn().mockResolvedValue({
    'header.title': 'Lab Analyses and Constant Parameters',
    'header.default': 'Parameter Management',
    'language.english': 'English',
    'language.russian': 'Русский',
  }),
}));

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      navigation: navigationSlice,
      translations: translationsSlice,
      parameters: parametersSlice,
    },
    preloadedState: {
      navigation: {
        activeSection: 'map',
        activeChild: '',
        activeUnit: '',
        activeSubTab: '',
      },
      translations: {
        currentLanguage: 'en',
        translations: {
          'header.title': 'Lab Analyses and Constant Parameters',
          'header.default': 'Parameter Management',
          'language.english': 'English',
          'language.russian': 'Русский',
        },
      },
      parameters: {
        groups: [],
        availableElements: [],
        loading: false,
        error: null,
      },
      ...initialState,
    },
  });
};

describe('PageHeader', () => {
  const mockOnToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct title', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <PageHeader collapsed={false} onToggle={mockOnToggle} />
      </Provider>
    );

    expect(screen.getByText('Lab Analyses and Constant Parameters')).toBeInTheDocument();
  });

  it('calls onToggle when menu button is clicked', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <PageHeader collapsed={false} onToggle={mockOnToggle} />
      </Provider>
    );

    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it('shows correct bottom content for reactor unit', () => {
    const store = createMockStore({
      navigation: {
        activeSection: 'inputs',
        activeChild: 'chemistry',
        activeUnit: 'reactor',
        activeSubTab: '',
      },
      translations: {
        currentLanguage: 'en',
        translations: {
          'header.title': 'Lab Analyses and Constant Parameters',
          'header.reactor': 'Effluent Parameters',
          'language.english': 'English',
          'language.russian': 'Русский',
        },
      },
    });
    
    render(
      <Provider store={store}>
        <PageHeader collapsed={false} onToggle={mockOnToggle} />
      </Provider>
    );

    expect(screen.getByText('Effluent Parameters')).toBeInTheDocument();
  });

  it('shows correct bottom content for cooling towers unit', () => {
    const store = createMockStore({
      navigation: {
        activeSection: 'inputs',
        activeChild: 'chemistry',
        activeUnit: 'cooling-towers',
        activeSubTab: '',
      },
      translations: {
        currentLanguage: 'en',
        translations: {
          'header.title': 'Lab Analyses and Constant Parameters',
          'header.coolingTowers': 'Operating Limits',
          'language.english': 'English',
          'language.russian': 'Русский',
        },
      },
    });
    
    render(
      <Provider store={store}>
        <PageHeader collapsed={false} onToggle={mockOnToggle} />
      </Provider>
    );

    expect(screen.getByText('Operating Limits')).toBeInTheDocument();
  });

  it('shows language selector with correct options', () => {
    const store = createMockStore();
    
    render(
      <Provider store={store}>
        <PageHeader collapsed={false} onToggle={mockOnToggle} />
      </Provider>
    );

    // Check if language selector is present
    const languageSelect = screen.getByRole('combobox');
    expect(languageSelect).toBeInTheDocument();
  });
});
