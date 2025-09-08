import React from 'react';
import { Card, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const t = useSelector((state: RootState) => state.translations.translations);

  return (
    <div className="p-6 flex items-center justify-center min-h-96">
      <Card className="w-full max-w-md text-center">
        <div className="py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            {t['notFound.title'] || 'Page Under Development'}
          </h2>
          <p className="text-gray-500 mb-6">
            {t['notFound.description'] || 'This section is currently being developed. Please check back soon for updates.'}
          </p>
          <Button 
            type="primary" 
            icon={<HomeOutlined />}
            onClick={() => navigate('/map')}
            size="large"
          >
            {t['notFound.backToMap'] || 'Back to Map'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
