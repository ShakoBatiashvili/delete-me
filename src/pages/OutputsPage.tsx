import React from 'react';
import { Card, Table, Tag, Button, Space } from 'antd';
import { DownloadOutlined, PrinterOutlined, FileTextOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import NotFoundPage from './NotFoundPage';

const OutputsPage: React.FC = () => {
  const { child } = useParams<{ child?: string }>();
  const t = useSelector((state: RootState) => state.translations.translations);

  // Handle child routes
  if (child) {
    const childContent = {
      'reports': t['nav.outputs.reports'] || 'Generated Reports',
      'analytics': t['nav.outputs.analytics'] || 'Analytics Dashboard',
      'exports': t['nav.outputs.exports'] || 'Data Exports',
      'compliance': t['nav.outputs.compliance'] || 'Compliance Reports',
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

  // Mock output data
  const outputData = [
    {
      key: '1',
      parameter: 'Total Water Flow Rate',
      value: '125.5',
      unit: 'L/min',
      status: 'optimal',
      target: '120.0',
    },
    {
      key: '2',
      parameter: 'Chemical Efficiency',
      value: '94.2',
      unit: '%',
      status: 'good',
      target: '90.0',
    },
    {
      key: '3',
      parameter: 'Energy Consumption',
      value: '2.8',
      unit: 'kWh',
      status: 'warning',
      target: '2.5',
    },
    {
      key: '4',
      parameter: 'pH Level (Output)',
      value: '7.1',
      unit: '',
      status: 'optimal',
      target: '7.0',
    },
    {
      key: '5',
      parameter: 'Chlorine Residual',
      value: '1.8',
      unit: 'mg/L',
      status: 'good',
      target: '2.0',
    },
  ];

  const columns = [
    {
      title: t['outputs.outputParameter'] || 'Output Parameter',
      dataIndex: 'parameter',
      key: 'parameter',
      width: '30%',
    },
    {
      title: t['outputs.calculatedValue'] || 'Calculated Value',
      dataIndex: 'value',
      key: 'value',
      width: '15%',
      render: (value: string) => (
        <span className="font-mono font-semibold">{value}</span>
      ),
    },
    {
      title: t['table.unit'] || 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
    },
    {
      title: t['outputs.target'] || 'Target',
      dataIndex: 'target',
      key: 'target',
      width: '15%',
      render: (target: string) => (
        <span className="text-gray-600 font-mono">{target}</span>
      ),
    },
    {
      title: t['outputs.status'] || 'Status',
      key: 'status',
      width: '15%',
      render: (_: unknown, record: any) => {
        const statusConfig = {
          optimal: { color: 'green', text: t['outputs.optimal'] || 'Optimal' },
          good: { color: 'blue', text: t['outputs.good'] || 'Good' },
          warning: { color: 'orange', text: t['outputs.warning'] || 'Warning' },
          critical: { color: 'red', text: t['outputs.critical'] || 'Critical' },
        };
        const config = statusConfig[record.status as keyof typeof statusConfig];
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: t['outputs.variance'] || 'Variance',
      key: 'variance',
      width: '15%',
      render: (_: unknown, record: any) => {
        const current = parseFloat(record.value);
        const target = parseFloat(record.target);
        const variance = ((current - target) / target * 100).toFixed(1);
        const isPositive = current >= target;
        return (
          <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
            {isPositive ? '+' : ''}{variance}%
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <Card title={t['nav.outputs'] || 'Outputs'} className="w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{t['outputs.calculationResults'] || 'Calculation Results'}</h3>
              <p className="text-gray-600">{t['outputs.generatedFrom'] || 'Generated from latest input parameters'}</p>
            </div>
            <Space>
              <Button type="primary" icon={<DownloadOutlined />}>
                {t['outputs.exportData'] || 'Export Data'}
              </Button>
              <Button icon={<PrinterOutlined />}>
                {t['outputs.printReport'] || 'Print Report'}
              </Button>
              <Button icon={<FileTextOutlined />}>
                {t['outputs.generatePdf'] || 'Generate PDF'}
              </Button>
            </Space>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-green-600">95.2%</div>
              <div className="text-sm text-gray-600">{t['outputs.overallEfficiency'] || 'Overall Efficiency'}</div>
            </Card>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.1</div>
              <div className="text-sm text-gray-600">{t['outputs.performanceIndex'] || 'Performance Index'}</div>
            </Card>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-gray-600">{t['outputs.warnings'] || 'Warnings'}</div>
            </Card>
            <Card size="small" className="text-center">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <div className="text-sm text-gray-600">{t['outputs.compliance'] || 'Compliance'}</div>
            </Card>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={outputData}
          pagination={false}
          size="middle"
          className="mb-6"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title={t['outputs.recommendations'] || 'Recommendations'} size="small">
            <div className="space-y-3">
              <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400">
                <p className="text-sm">
                  <strong>{t['outputs.energyOptimization'] || 'Energy Optimization:'}</strong> {t['outputs.energyOptimizationDesc'] || 'Consider reducing pump speed during off-peak hours to decrease energy consumption.'}
                </p>
              </div>
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400">
                <p className="text-sm">
                  <strong>{t['outputs.chemicalDosing'] || 'Chemical Dosing:'}</strong> {t['outputs.chemicalDosingDesc'] || 'Current efficiency is excellent. Maintain current chlorine injection rates.'}
                </p>
              </div>
              <div className="p-3 bg-green-50 border-l-4 border-green-400">
                <p className="text-sm">
                  <strong>{t['outputs.systemPerformance'] || 'System Performance:'}</strong> {t['outputs.systemPerformanceDesc'] || 'All parameters within acceptable ranges. System operating optimally.'}
                </p>
              </div>
            </div>
          </Card>

          <Card title={t['outputs.nextSteps'] || 'Next Steps'} size="small">
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">1</div>
                <div>
                  <p className="text-sm font-medium">{t['outputs.reviewWarning'] || 'Review Warning Parameters'}</p>
                  <p className="text-xs text-gray-600">{t['outputs.reviewWarningDesc'] || 'Check energy consumption trends'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">2</div>
                <div>
                  <p className="text-sm font-medium">{t['outputs.updateInputs'] || 'Update Input Parameters'}</p>
                  <p className="text-xs text-gray-600">{t['outputs.updateInputsDesc'] || 'Incorporate latest lab results'}</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold mt-0.5">3</div>
                <div>
                  <p className="text-sm font-medium">{t['outputs.scheduleMaintenance'] || 'Schedule Maintenance'}</p>
                  <p className="text-xs text-gray-600">{t['outputs.scheduleMaintenanceDesc'] || 'Plan routine system checks'}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default OutputsPage;
