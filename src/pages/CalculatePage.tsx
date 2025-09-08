import React from 'react';
import { Card, Button, Progress, Alert } from 'antd';
import { CalculatorOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import NotFoundPage from './NotFoundPage';

const CalculatePage: React.FC = () => {
  const { child } = useParams<{ child?: string }>();
  const t = useSelector((state: RootState) => state.translations.translations);

  // Handle child routes
  if (child) {
    const childContent = {
      'models': t['nav.calculate.models'] || 'Calculation Models',
      'batch': t['nav.calculate.batch'] || 'Batch Processing',
      'realtime': t['nav.calculate.realtime'] || 'Real-time Analysis',
      'optimization': t['nav.calculate.optimization'] || 'Optimization',
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
      <Card title={t['nav.calculate'] || 'Calculate'} className="w-full">
        <div className="max-w-4xl mx-auto">
          <Alert
            message={t['calculate.engineMessage'] || 'Calculation Engine'}
            description={t['calculate.engineDescription'] || 'Process all input parameters through the water treatment calculation models to generate system outputs and recommendations.'}
            type="info"
            className="mb-6"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card size="small" title={t['calculate.systemStatus'] || 'System Status'} className="text-center">
              <div className="py-4">
                <div className="text-3xl text-green-500 mb-2">✓</div>
                <p className="text-sm text-gray-600">{t['calculate.allParametersLoaded'] || 'All input parameters loaded'}</p>
                <p className="text-lg font-semibold">{t['calculate.readyForCalculation'] || 'Ready for Calculation'}</p>
              </div>
            </Card>
            
            <Card size="small" title={t['calculate.lastCalculation'] || 'Last Calculation'} className="text-center">
              <div className="py-4">
                <div className="text-3xl text-blue-500 mb-2">📊</div>
                <p className="text-sm text-gray-600">{t['calculate.neverCalculated'] || 'Never calculated'}</p>
                <p className="text-lg font-semibold">{t['calculate.noPreviousResults'] || 'No Previous Results'}</p>
              </div>
            </Card>
          </div>

          <div className="text-center mb-8">
            <Button
              type="primary"
              size="large"
              icon={<PlayCircleOutlined />}
              className="px-8 py-4 h-auto text-lg"
            >
              {t['calculate.startProcess'] || 'Start Calculation Process'}
            </Button>
          </div>

          <Card title={t['calculate.progress'] || 'Calculation Progress'} className="mb-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t['calculate.inputValidation'] || 'Input Validation'}</span>
                  <span>100%</span>
                </div>
                <Progress percent={100} size="small" status="success" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t['calculate.chemicalBalance'] || 'Chemical Balance Calculations'}</span>
                  <span>0%</span>
                </div>
                <Progress percent={0} size="small" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t['calculate.flowRate'] || 'Flow Rate Optimization'}</span>
                  <span>0%</span>
                </div>
                <Progress percent={0} size="small" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t['calculate.compliance'] || 'Compliance Verification'}</span>
                  <span>0%</span>
                </div>
                <Progress percent={0} size="small" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t['calculate.reportGeneration'] || 'Report Generation'}</span>
                  <span>0%</span>
                </div>
                <Progress percent={0} size="small" />
              </div>
            </div>
          </Card>

          <Card title={t['calculate.models'] || 'Calculation Models'} size="small">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-medium flex items-center mb-2">
                  <CalculatorOutlined className="mr-2" />
                  {t['calculate.chemicalTreatment'] || 'Chemical Treatment Model'}
                </h4>
                <p className="text-sm text-gray-600">
                  {t['calculate.chemicalDesc'] || 'Calculates optimal chemical dosing based on water quality parameters'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-medium flex items-center mb-2">
                  <CalculatorOutlined className="mr-2" />
                  {t['calculate.flowDynamics'] || 'Flow Dynamics Model'}
                </h4>
                <p className="text-sm text-gray-600">
                  {t['calculate.flowDesc'] || 'Optimizes flow rates and pressure distributions'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-medium flex items-center mb-2">
                  <CalculatorOutlined className="mr-2" />
                  {t['calculate.efficiency'] || 'Efficiency Model'}
                </h4>
                <p className="text-sm text-gray-600">
                  {t['calculate.efficiencyDesc'] || 'Analyzes system efficiency and energy consumption'}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded">
                <h4 className="font-medium flex items-center mb-2">
                  <CalculatorOutlined className="mr-2" />
                  {t['calculate.complianceModel'] || 'Compliance Model'}
                </h4>
                <p className="text-sm text-gray-600">
                  {t['calculate.complianceDesc'] || 'Ensures outputs meet regulatory requirements'}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default CalculatePage;
