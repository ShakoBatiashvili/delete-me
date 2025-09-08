# 🧪 Lab System Manager

A comprehensive React application for managing laboratory analyses and water treatment system parameters with real-time data management and multi-language support.

## 🚀 Features

### Core Functionality
- **Multi-level Navigation**: Sidebar with primary, child, and unit-level navigation
- **Dynamic Page Headers**: Context-aware headers that change based on current section
- **Parameter Management**: Editable data tables with validation and real-time updates
- **Modal System**: Add parameters and edit group descriptions
- **Multi-language Support**: English and Russian translations with persistent language selection
- **State Management**: Redux Toolkit for efficient state management with localStorage persistence

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-friendly with collapsible sidebar and drawer navigation
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Testing**: Comprehensive unit tests (Jest + RTL) and E2E tests (Cypress)
- **Modern UI**: Ant Design components with Tailwind CSS for custom styling

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **State Management**: Redux Toolkit, React-Redux
- **UI Components**: Ant Design
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library, Cypress
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/          # Reusable components
├── modules/
│   ├── navigation/     # Sidebar and navigation components
│   ├── header/         # Page header component
│   ├── tables/         # Data table components
│   └── modals/         # Modal components
├── pages/              # Page components
├── redux/
│   ├── slices/         # Redux slices
│   └── store.ts        # Redux store configuration
├── translations/       # JSON translation files
├── utils/              # Utility functions and API clients
└── __tests__/          # Unit tests
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd homework
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run cypress:open` - Open Cypress test runner
- `npm run cypress:run` - Run Cypress tests headlessly
- `npm run e2e` - Run E2E tests (starts server and runs Cypress)
- `npm run test:all` - Run all tests (unit + E2E)

## 🧪 Testing

### Unit Tests
The application includes comprehensive unit tests for:
- Redux slices and state management
- React components and user interactions
- Form validation and error handling
- Navigation logic

Run unit tests:
```bash
npm run test
```

### E2E Tests
Cypress tests cover:
- Navigation flow between sections
- Parameter addition and editing
- Language switching
- Data persistence
- Mobile responsiveness

Run E2E tests:
```bash
npm run e2e
```

## 🌐 Multi-language Support

The app supports English and Russian languages:
- Translations stored in `src/translations/`
- Language preference persisted in localStorage
- Dynamic loading of translation files
- Complete UI translation including navigation, forms, and messages

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation with collapsible option
- **Tablet**: Collapsible sidebar with overlay
- **Mobile**: Drawer navigation with touch-friendly controls

## ♿ Accessibility Features

- ARIA labels and roles for screen readers
- Keyboard navigation support
- Focus management in modals
- Semantic HTML structure
- High contrast color schemes

## 🔄 State Persistence

The following state is automatically persisted in localStorage:
- Current navigation state (active section, child, unit, sub-tab)
- Language preference
- Added parameters and group descriptions

## 🧪 Chemistry API Integration

The application integrates with PubChem API for chemical elements:
- Fetches real chemical data when available
- Falls back to predefined chemical elements list
- Dropdown filtering and search functionality

## 🔧 Configuration

### Tailwind CSS
Configured to work alongside Ant Design:
- Preflight disabled to avoid conflicts
- Custom utility classes for layout
- Responsive design utilities

### Redux Store
- **navigationSlice**: Manages navigation state
- **translationsSlice**: Handles language and translations
- **parametersSlice**: Manages parameter data and groups

## 📈 Performance Considerations

- Lazy loading of translation files
- Efficient Redux state updates
- Memoized components where appropriate
- Optimized build with Vite

## 🐛 Error Handling

- Form validation with user-friendly messages
- API error handling with fallback data
- Graceful degradation for missing translations
- Error boundaries for component crashes

## 🚀 Deployment

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📝 Development Notes

### Adding New Parameters
1. Parameters are organized in groups
2. Each parameter has name, value, unit, and group association
3. Values are validated for non-negative numbers
4. Changes are automatically persisted

### Adding New Languages
1. Create a new JSON file in `src/translations/`
2. Add the language option to the header selector
3. Include all required translation keys

### Extending Navigation
1. Update the navigation slice for new sections
2. Add menu items to the Sidebar component
3. Create corresponding page components
4. Update the App component routing logic

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update translations for new UI text
4. Ensure accessibility compliance
5. Test on multiple screen sizes

## 📄 License

This project is private and proprietary.