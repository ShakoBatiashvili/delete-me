import React from 'react';
import { Breadcrumb as AntdBreadcrumb } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { RootState } from '../redux/store';

const Breadcrumb: React.FC = () => {
  const navigate = useNavigate();
  const { activeSection, activeChild, activeUnit } = useSelector((state: RootState) => state.navigation);
  const t = useSelector((state: RootState) => state.translations.translations);

  const buildBreadcrumbItems = () => {
    const items = [
      {
        key: 'home',
        title: (
          <span 
            onClick={() => navigate('/')} 
            className="cursor-pointer hover:text-blue-600 flex items-center"
          >
            <HomeOutlined className="mr-1" />
            {t['breadcrumb.home'] || t['nav.map'] || 'Map'}
          </span>
        ),
      },
    ];

    if (activeSection && activeSection !== 'map') {
      // Add main section
      const sectionKey = `nav.${activeSection}`;
      const sectionTitle = t[sectionKey] || activeSection.charAt(0).toUpperCase() + activeSection.slice(1);
      
      items.push({
        key: activeSection,
        title: (
          <span 
            onClick={() => navigate(`/${activeSection}`)} 
            className="cursor-pointer hover:text-blue-600"
          >
            {sectionTitle}
          </span>
        ),
      });

      // Add child section if exists
      if (activeChild) {
        const childKey = `nav.${activeChild}`;
        const childTitle = t[childKey] || activeChild.charAt(0).toUpperCase() + activeChild.slice(1);
        
        items.push({
          key: activeChild,
          title: (
            <span 
              onClick={() => navigate(`/${activeSection}/${activeChild}`)} 
              className="cursor-pointer hover:text-blue-600"
            >
              {childTitle}
            </span>
          ),
        });

        // Add unit if exists (specifically for chemistry units)
        if (activeUnit && activeSection === 'inputs' && activeChild === 'chemistry') {
          const unitKey = `nav.${camelCase(activeUnit)}`;
          const unitTitle = t[unitKey] || formatUnitName(activeUnit);
          
          items.push({
            key: activeUnit,
            title: (
              <span className="text-gray-600">
                {unitTitle}
              </span>
            ),
          });
        }
      }
    }

    return items;
  };

  // Helper function to convert kebab-case to camelCase for translation keys
  const camelCase = (str: string) => {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  };

  // Helper function to format unit names for display
  const formatUnitName = (unitName: string) => {
    return unitName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const items = buildBreadcrumbItems();

  return (
    <div className="py-2">
      <AntdBreadcrumb 
        items={items}
        separator=">"
        className="text-sm"
      />
    </div>
  );
};

export default Breadcrumb;
