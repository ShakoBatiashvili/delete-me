import React from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import NotFoundPage from './NotFoundPage';

const MapPage: React.FC = () => {
  const { child } = useParams<{ child?: string }>();
  const t = useSelector((state: RootState) => state.translations.translations);

  // Handle child routes
  if (child) {
    const childContent = {
      'overview': t['nav.map.overview'] || 'System Overview',
      'flowchart': t['nav.map.flowchart'] || 'Process Flow',
      'monitoring': t['nav.map.monitoring'] || 'Monitoring Points',
      'alerts': t['nav.map.alerts'] || 'System Alerts',
    };

    if (childContent[child as keyof typeof childContent]) {
      return (
        <div className="p-6">
          <Card title={childContent[child as keyof typeof childContent]} className="w-full">
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {childContent[child as keyof typeof childContent]}
              </h2>
              <p className="text-gray-500">
                {t['page.underDevelopmentLower']?.replace('{name}', childContent[child as keyof typeof childContent].toLowerCase()) || `This ${childContent[child as keyof typeof childContent].toLowerCase()} section is under development.`}
              </p>
            </div>
          </Card>
        </div>
      );
    } else {
      return <NotFoundPage />;
    }
  }

  return (
    <div className="p-6">
      <Card title={t['nav.map'] || 'Map'} className="w-full">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t['map.interactiveTitle'] || 'Interactive System Map'}
          </h2>
          <p className="text-gray-500 mb-6">
            {t['map.description'] || 'This section will display an interactive map of the laboratory system, showing water flow, processing units, and monitoring points.'}
          </p>
          
          {/* Tailwind CSS Test Section */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
            <h3 className="text-white font-bold text-lg mb-2">{t['map.tailwindTest'] || '🎉 Tailwind CSS is Working!'}</h3>
            <p className="text-blue-100">{t['map.tailwindDesc'] || 'This colorful gradient proves Tailwind classes are being applied correctly.'}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow">
              <h4 className="font-semibold text-green-800">{t['map.responsiveGrid'] || '✅ Responsive Grid'}</h4>
              <p className="text-green-600 text-sm">{t['map.responsiveDesc'] || 'This grid adapts to screen size'}</p>
            </div>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
              <h4 className="font-semibold text-yellow-800">{t['map.colorsBorders'] || '🎨 Colors & Borders'}</h4>
              <p className="text-yellow-600 text-sm">{t['map.colorsDesc'] || 'Custom colors and borders work'}</p>
            </div>
            <div className="bg-purple-100 border-l-4 border-purple-500 p-4 rounded shadow">
              <h4 className="font-semibold text-purple-800">{t['map.flexSpacing'] || '📱 Flex & Spacing'}</h4>
              <p className="text-purple-600 text-sm">{t['map.flexDesc'] || 'Flexbox and spacing utilities active'}</p>
            </div>
          </div>
          
          <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-300">
            <span className="text-gray-400 text-lg">{t['map.placeholder'] || 'Map Visualization Placeholder (hover effect works!)'}</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MapPage;
