import React from 'react';
import { Select, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, GlobalOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { setCurrentLanguage, loadTranslations } from '../../redux/slices/translationsSlice';
import { loadTranslations as loadTranslationsAPI } from '../../utils/api';
import Breadcrumb from '../../components/Breadcrumb';

const { Option } = Select;

interface PageHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ collapsed, onToggle }) => {
  const dispatch = useDispatch();
  const { activeSection, activeChild, activeUnit } = useSelector((state: RootState) => state.navigation);
  const { currentLanguage, translations } = useSelector((state: RootState) => state.translations);

  const t = translations;

  const handleLanguageChange = async (language: string) => {
    dispatch(setCurrentLanguage(language));
    try {
      const newTranslations = await loadTranslationsAPI(language);
      dispatch(loadTranslations({ language, translations: newTranslations }));
    } catch (error) {
      console.error('Failed to load translations:', error);
    }
  };

  const getBottomContent = () => {
    // Dynamic content based on current navigation
    if (activeSection === 'inputs' && activeChild === 'chemistry') {
      if (activeUnit === 'reactor') {
        return t['header.reactor'] || 'Effluent Parameters';
      }
      if (activeUnit === 'cooling-towers') {
        return t['header.coolingTowers'] || 'Operating Limits';
      }
    }
    return t['header.default'] || 'Parameter Management';
  };

  const extra = [
    <Select
      key="language"
      value={currentLanguage}
      onChange={handleLanguageChange}
      style={{ width: 120 }}
      suffixIcon={<GlobalOutlined />}
      data-testid="language-selector"
      aria-label="Select language"
    >
      <Option value="en">{t['language.english'] || 'English'}</Option>
      <Option value="ru">{t['language.russian'] || 'Русский'}</Option>
    </Select>,
  ];

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
            className="mr-4"
            data-testid="menu-toggle"
            aria-label={collapsed ? (t['aria.menuToggleExpand'] || 'Expand navigation menu') : (t['aria.menuToggleCollapse'] || 'Collapse navigation menu')}
          />
          <div>
            <div className="text-2xl font-bold text-gray-800 mb-0">
              {t['header.title'] || 'Lab Analyses and Constant Parameters'}
            </div>
            <Breadcrumb />
            <div className="text-lg text-gray-600 mt-1">
              {getBottomContent()}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {extra}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
