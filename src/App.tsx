import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { store, RootState } from './redux/store';
import { loadTranslations } from './redux/slices/translationsSlice';
import { setActiveSection, setActiveChild, setActiveUnit } from './redux/slices/navigationSlice';
import { loadTranslations as loadTranslationsAPI } from './utils/api';
import Sidebar from './modules/navigation/Sidebar';
import PageHeader from './modules/header/PageHeader';
import PageFooter from './modules/footer/PageFooter';
import MapPage from './pages/MapPage';
import InputsPage from './pages/InputsPage';
import CalculatePage from './pages/CalculatePage';
import OutputsPage from './pages/OutputsPage';
import './index.css';

const { Content } = Layout;

const AppContent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentLanguage } = useSelector((state: RootState) => state.translations);

  // Sync URL with Redux state
  useEffect(() => {
    const path = location.pathname;
    let section = 'map';
    let child = '';
    let unit = '';

    if (path.startsWith('/inputs')) {
      section = 'inputs';
      const pathParts = path.split('/');
      if (pathParts.length > 2) {
        child = pathParts[2];
      }
      if (pathParts.length > 3) {
        unit = pathParts[3];
      }
    } else if (path.startsWith('/calculate')) {
      section = 'calculate';
      const pathParts = path.split('/');
      if (pathParts.length > 2) {
        child = pathParts[2];
      }
    } else if (path.startsWith('/outputs')) {
      section = 'outputs';
      const pathParts = path.split('/');
      if (pathParts.length > 2) {
        child = pathParts[2];
      }
    } else if (path.startsWith('/map')) {
      section = 'map';
      const pathParts = path.split('/');
      if (pathParts.length > 2) {
        child = pathParts[2];
      }
    }

    dispatch(setActiveSection(section));
    dispatch(setActiveChild(child));
    if (unit) {
      dispatch(setActiveUnit(unit));
    }
  }, [location.pathname, dispatch]);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load translations on app start
  useEffect(() => {
    const loadInitialTranslations = async () => {
      try {
        const translations = await loadTranslationsAPI(currentLanguage);
        dispatch(loadTranslations({ language: currentLanguage, translations }));
      } catch (error) {
        console.error('Failed to load initial translations:', error);
      }
    };

    loadInitialTranslations();
  }, [dispatch, currentLanguage]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        isMobile={isMobile}
      />
      
      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 80 : 256) }}>
        <PageHeader 
          collapsed={collapsed} 
          onToggle={() => setCollapsed(!collapsed)} 
        />
        
        <Content style={{ margin: 0, overflow: 'initial', backgroundColor: '#f0f2f5', display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 98px)' }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<MapPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/map/:child" element={<MapPage />} />
              <Route path="/inputs" element={<InputsPage />} />
              <Route path="/inputs/:child" element={<InputsPage />} />
              <Route path="/inputs/:child/:unit" element={<InputsPage />} />
              <Route path="/calculate" element={<CalculatePage />} />
              <Route path="/calculate/:child" element={<CalculatePage />} />
              <Route path="/outputs" element={<OutputsPage />} />
              <Route path="/outputs/:child" element={<OutputsPage />} />
            </Routes>
          </div>
          <PageFooter />
        </Content>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
};

export default App;