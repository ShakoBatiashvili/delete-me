import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const PageFooter: React.FC = () => {
  const navigate = useNavigate();
  const { activeSection, activeChild, activeUnit } = useSelector((state: RootState) => state.navigation);
  const t = useSelector((state: RootState) => state.translations.translations);
  const [activeUnitTab, setActiveUnitTab] = useState(activeUnit);

  useEffect(() => {
    setActiveUnitTab(activeUnit);
  }, [activeUnit]);

  // Unit navigation functionality - same as UnitNavigation
  const handleUnitChange = (key: string) => {
    setActiveUnitTab(key);
    navigate(`/inputs/chemistry/${key}`);
  };

  const handleDropdownChange = (value: string) => {
    setActiveUnitTab(value);
    navigate(`/inputs/chemistry/${value}`);
  };

  // All units available for navigation
  const allUnits = [
    {
      key: 'ion-exchange',
      label: t['nav.ionExchange'] || 'Ion Exchange - WMA',
    },
    {
      key: 'reactor',
      label: t['nav.reactor'] || 'Reactor',
    },
    {
      key: 'cooling-towers',
      label: t['nav.coolingTowers'] || 'Cooling Towers',
    },
    {
      key: 'compliance-points',
      label: t['nav.compliancePoints'] || 'Compliance Points',
    },
  ];

  const flowChemistryUnits = [
    {
      key: 'incoming-water',
      label: t['nav.incomingWater'] || 'Incoming Water Source Lab Inputs',
    },
    {
      key: 'autoci-lab',
      label: t['nav.autociLab'] || 'AutoCI Lab Inputs',
    },
    {
      key: 'chemical-injection',
      label: t['nav.chemicalInjection'] || 'Chemical Injection Inputs',
    },
    {
      key: 'clear-chemistry',
      label: t['nav.clearChemistry'] || 'Clear Chemistry',
    },
  ];

  // Units for dropdown (all except reactor and cooling-towers)
  const dropdownUnits = [...allUnits.filter(unit => unit.key !== 'reactor' && unit.key !== 'cooling-towers'), ...flowChemistryUnits];

  // Get current dropdown value
  const getCurrentDropdownValue = () => {
    if (activeUnitTab === 'reactor' || activeUnitTab === 'cooling-towers') {
      return undefined;
    }
    return activeUnitTab;
  };

  const getContentTabs = () => {
    // Dynamic content tabs based on current navigation
    if (activeSection === 'inputs' && activeChild === 'chemistry') {
      if (activeUnit === 'reactor') {
        return [
          {
            key: 'effluent-ph',
            label: 'pH Control',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">pH Control Parameters</h4>
                <p className="text-gray-600">Monitor and adjust pH levels in the effluent stream.</p>
              </div>
            ),
          },
          {
            key: 'effluent-flow',
            label: 'Flow Rate',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">Flow Rate Monitoring</h4>
                <p className="text-gray-600">Track effluent flow rates and adjust as needed.</p>
              </div>
            ),
          },
          {
            key: 'effluent-quality',
            label: 'Quality Metrics',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">Effluent Quality Parameters</h4>
                <p className="text-gray-600">Monitor water quality parameters in the effluent.</p>
              </div>
            ),
          },
        ];
      }

      if (activeUnit === 'cooling-towers') {
        return [
          {
            key: 'operating-temp',
            label: 'Temperature',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">Temperature Limits</h4>
                <p className="text-gray-600">Monitor and control cooling tower operating temperatures.</p>
              </div>
            ),
          },
          {
            key: 'operating-pressure',
            label: 'Pressure',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">Pressure Limits</h4>
                <p className="text-gray-600">Monitor system pressure within operating limits.</p>
              </div>
            ),
          },
          {
            key: 'operating-flow',
            label: 'Flow Control',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">Flow Rate Control</h4>
                <p className="text-gray-600">Optimize flow rates for efficient cooling operation.</p>
              </div>
            ),
          },
        ];
      }

      // Other chemistry units - placeholder sections
      if (activeUnit) {
        return [
          {
            key: 'parameters',
            label: t['footer.parameters'] || 'Parameters',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">{t['footer.parametersTitle'] || 'System Parameters'}</h4>
                <p className="text-gray-600">{t['footer.parametersDesc'] || 'Configure and monitor system parameters for this unit.'}</p>
              </div>
            ),
          },
          {
            key: 'monitoring',
            label: t['footer.monitoring'] || 'Monitoring',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">{t['footer.monitoringTitle'] || 'Real-time Monitoring'}</h4>
                <p className="text-gray-600">{t['footer.monitoringDesc'] || 'Monitor real-time data and system performance.'}</p>
              </div>
            ),
          },
          {
            key: 'controls',
            label: t['footer.controls'] || 'Controls',
            children: (
              <div className="p-4">
                <h4 className="text-md font-semibold mb-2">{t['footer.controlsTitle'] || 'System Controls'}</h4>
                <p className="text-gray-600">{t['footer.controlsDesc'] || 'Access system controls and adjustment settings.'}</p>
              </div>
            ),
          },
        ];
      }
    }

    // Default tabs for other pages
    if (activeSection === 'map') {
      return [
        {
          key: 'overview',
          label: t['footer.overview'] || 'Overview',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.overviewTitle'] || 'System Overview'}</h4>
              <p className="text-gray-600">{t['footer.overviewDesc'] || 'View comprehensive system overview and status.'}</p>
            </div>
          ),
        },
        {
          key: 'alerts',
          label: t['footer.alerts'] || 'Alerts',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.alertsTitle'] || 'System Alerts'}</h4>
              <p className="text-gray-600">{t['footer.alertsDesc'] || 'Monitor system alerts and notifications.'}</p>
            </div>
          ),
        },
      ];
    }

    if (activeSection === 'calculate') {
      return [
        {
          key: 'models',
          label: t['footer.models'] || 'Models',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.modelsTitle'] || 'Calculation Models'}</h4>
              <p className="text-gray-600">{t['footer.modelsDesc'] || 'Select and configure calculation models.'}</p>
            </div>
          ),
        },
        {
          key: 'results',
          label: t['footer.results'] || 'Results',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.resultsTitle'] || 'Calculation Results'}</h4>
              <p className="text-gray-600">{t['footer.resultsDesc'] || 'View and analyze calculation results.'}</p>
            </div>
          ),
        },
      ];
    }

    if (activeSection === 'outputs') {
      return [
        {
          key: 'reports',
          label: t['footer.reports'] || 'Reports',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.reportsTitle'] || 'Generated Reports'}</h4>
              <p className="text-gray-600">{t['footer.reportsDesc'] || 'Access and download generated reports.'}</p>
            </div>
          ),
        },
        {
          key: 'exports',
          label: t['footer.exports'] || 'Exports',
          children: (
            <div className="p-4">
              <h4 className="text-md font-semibold mb-2">{t['footer.exportsTitle'] || 'Data Exports'}</h4>
              <p className="text-gray-600">{t['footer.exportsDesc'] || 'Export data in various formats.'}</p>
            </div>
          ),
        },
      ];
    }

    // Default fallback tabs
    return [
      {
        key: 'info',
        label: t['footer.info'] || 'Information',
        children: (
          <div className="p-4">
            <h4 className="text-md font-semibold mb-2">{t['footer.infoTitle'] || 'System Information'}</h4>
            <p className="text-gray-600">{t['footer.infoDesc'] || 'General system information and status.'}</p>
          </div>
        ),
      },
    ];
  };

  const contentTabs = getContentTabs();

  if (!contentTabs.length) {
    return null;
  }

  return (
    <div className="bg-white border-t shadow-sm py-4">
      {/* Unit Navigation - Only show for inputs/chemistry */}
      {activeSection === 'inputs' && activeChild === 'chemistry' && (
        <div className="border-b bg-gray-50 px-4 py-2">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">{t['unit.units'] || 'Units'}:</span>
            
            {/* Direct tabs for Reactor and Cooling Towers */}
            <div className="flex gap-2">
              <button
                onClick={() => handleUnitChange('reactor')}
                className={`px-3 py-1 text-sm rounded ${
                  activeUnitTab === 'reactor'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                }`}
              >
                {t['nav.reactor'] || 'Reactor'}
              </button>
              <button
                onClick={() => handleUnitChange('cooling-towers')}
                className={`px-3 py-1 text-sm rounded ${
                  activeUnitTab === 'cooling-towers'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                }`}
              >
                {t['nav.coolingTowers'] || 'Cooling Towers'}
              </button>
            </div>

            {/* Dropdown for other units */}
            <Select
              value={getCurrentDropdownValue()}
              onChange={handleDropdownChange}
              placeholder="Other Units..."
              style={{ width: 200 }}
              size="small"
              options={dropdownUnits.map(unit => ({
                value: unit.key,
                label: unit.label
              }))}
            />
          </div>
        </div>
      )}

      {/*
      <div className="max-w-full">
        <Tabs
          defaultActiveKey={contentTabs[0]?.key}
          items={contentTabs}
          size="small"
          className="px-4"
          tabBarStyle={{
            marginBottom: 0,
            borderBottom: '1px solid #f0f0f0'
          }}
        />
      </div> */}
    </div>
  );
};

export default PageFooter;
