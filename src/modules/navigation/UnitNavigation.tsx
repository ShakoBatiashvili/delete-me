import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const UnitNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { activeSection, activeChild, activeUnit } = useSelector((state: RootState) => state.navigation);
  const t = useSelector((state: RootState) => state.translations.translations);
  // Determine which tab section is active
  const [activeUnitTab, setActiveUnitTab] = useState(activeUnit);
  // Only show unit navigation for Chemistry under Inputs

  useEffect(() => {
    setActiveUnitTab(activeUnit);
  }, [activeUnit]);

  if (activeSection !== 'inputs' || activeChild !== 'chemistry') {
    return null;
  }

  const handleUnitChange = (key: string) => {
    setActiveUnitTab(key);
    navigate(`/inputs/chemistry/${key}`);
  };

  const handleFlowChemistryChange = (key: string) => {
    setActiveUnitTab(key);
    navigate(`/inputs/chemistry/${key}`);
  };

  const unitTabs = [
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

  const flowChemistryTabs = [
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

  // const isUnitActive = unitTabs.some(tab => tab.key === activeUnit);
  // const isFlowChemistryActive = flowChemistryTabs.some(tab => tab.key === activeUnit);

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-0">
        <h3 className="text-md font-semibold mb-4">{t['unit.units'] || 'Units'}</h3>
        <Tabs activeKey={activeUnitTab} onChange={handleUnitChange} items={unitTabs} size="small" type="card" />
      </div>

      <div className="px-4 py-0">
        <h3 className="text-md font-semibold mb-4">{t['nav.flowChemistry'] || 'Flow Chemistry'}</h3>
        <Tabs activeKey={activeUnitTab} onChange={handleFlowChemistryChange} items={flowChemistryTabs} size="small" type="card" />
      </div>
    </div>
  );
};

export default UnitNavigation;
