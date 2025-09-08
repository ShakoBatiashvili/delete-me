import React, { useState } from 'react';
import { Card } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ParametersTable from '../modules/tables/ParametersTable';
import AddParameterModal from '../modules/modals/AddParameterModal';
import EditGroupModal from '../modules/modals/EditGroupModal';
import UnitNavigation from '../modules/navigation/UnitNavigation';

const InputsPage: React.FC = () => {
  const { activeChild, activeUnit } = useSelector((state: RootState) => state.navigation);
  const t = useSelector((state: RootState) => state.translations.translations);
  
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const handleAddParameter = () => {
    setSelectedGroupId('general'); // Default to general group
    setAddModalVisible(true);
  };

  const handleEditGroup = (groupId: string) => {
    setSelectedGroupId(groupId);
    setEditModalVisible(true);
  };

  const renderChemistryContent = () => {
    if (!activeUnit) {
      return (
        <div className="p-6">
          <Card title={t['nav.chemistry'] || 'Chemistry'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['nav.chemistry'] || 'Chemistry'}
              </h3>
              <p className="text-gray-500">
                {t['inputs.chemistry.selectUnit'] || 'Select a unit from the navigation above to configure chemistry parameters.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    // Unit sections
    if (activeUnit === 'ion-exchange') {
      return (
        <div className="p-6">
          <Card title={t['nav.ionExchange'] || 'Ion Exchange - WMA'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['unit.ionExchange'] || 'Ion Exchange - WMA Unit'}
              </h3>
              <p className="text-gray-500">
                {t['unit.ionExchangeDesc'] || 'Configure ion exchange parameters and water management area settings.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeUnit === 'reactor') {
      return (
        <div className="p-6">
          <Card title={t['nav.reactor'] || 'Reactor'} className="w-full">
            <ParametersTable
              onAddParameter={handleAddParameter}
              onEditGroup={handleEditGroup}
            />
          </Card>
        </div>
      );
    }

    if (activeUnit === 'cooling-towers') {
      return (
        <div className="p-6">
          <Card title={t['nav.coolingTowers'] || 'Cooling Towers'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['unit.coolingTowers'] || 'Cooling Towers Unit'}
              </h3>
              <p className="text-gray-500">
                {t['unit.coolingTowersDesc'] || 'Configure cooling tower operating limits and parameters.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeUnit === 'compliance-points') {
      return (
        <div className="p-6">
          <Card title={t['nav.compliancePoints'] || 'Compliance Points'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['unit.compliancePoints'] || 'Compliance Points'}
              </h3>
              <p className="text-gray-500">
                {t['unit.compliancePointsDesc'] || 'Monitor and manage environmental compliance parameters.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    // Flow Chemistry sections
    if (activeUnit === 'incoming-water') {
      return (
        <div className="p-6">
          <Card title={t['nav.incomingWater'] || 'Incoming Water Source Lab Inputs'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['nav.incomingWater'] || 'Incoming Water Source Lab Inputs'}
              </h3>
              <p className="text-gray-500">
                {t['unit.incomingWaterDesc'] || 'Configure parameters for incoming water source lab inputs.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeUnit === 'autoci-lab') {
      return (
        <div className="p-6">
          <Card title={t['nav.autociLab'] || 'AutoCI Lab Inputs'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['nav.autociLab'] || 'AutoCI Lab Inputs'}
              </h3>
              <p className="text-gray-500">
                {t['unit.autociLabDesc'] || 'Configure parameters for AutoCI lab inputs.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeUnit === 'chemical-injection') {
      return (
        <div className="p-6">
          <Card title={t['nav.chemicalInjection'] || 'Chemical Injection Inputs'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['nav.chemicalInjection'] || 'Chemical Injection Inputs'}
              </h3>
              <p className="text-gray-500">
                {t['unit.chemicalInjectionDesc'] || 'Configure parameters for chemical injection inputs.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeUnit === 'clear-chemistry') {
      return (
        <div className="p-6">
          <Card title={t['nav.clearChemistry'] || 'Clear Chemistry'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['nav.clearChemistry'] || 'Clear Chemistry'}
              </h3>
              <p className="text-gray-500">
                {t['unit.clearChemistryDesc'] || 'Configure parameters for clear chemistry.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    return null;
  };

  const renderContent = () => {
    if (activeChild === 'chemistry') {
      return (
        <>
          <UnitNavigation />
          {renderChemistryContent()}
        </>
      );
    }

    if (activeChild === 'general') {
      return (
        <div className="p-6">
          <Card title={t['nav.general'] || 'General'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['inputs.general.title'] || 'General System Parameters'}
              </h3>
              <p className="text-gray-500">
                {t['inputs.general.description'] || 'Configure basic system parameters and general settings for the water treatment facility.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeChild === 'consumption') {
      return (
        <div className="p-6">
          <Card title={t['nav.consumption'] || 'Consumption'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['inputs.consumption.title'] || 'Water Consumption Analysis'}
              </h3>
              <p className="text-gray-500">
                {t['inputs.consumption.description'] || 'Configure water consumption parameters and monitoring settings.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeChild === 'pipes') {
      return (
        <div className="p-6">
          <Card title={t['nav.pipes'] || 'Pipes'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['inputs.pipes.title'] || 'Pipe System Configuration'}
              </h3>
              <p className="text-gray-500">
                {t['inputs.pipes.description'] || 'Manage pipe network parameters, flow rates, and pressure settings.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    if (activeChild === 'reuse') {
      return (
        <div className="p-6">
          <Card title={t['nav.reuse'] || 'Reuse'} className="w-full">
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                {t['inputs.reuse.title'] || 'Water Reuse System'}
              </h3>
              <p className="text-gray-500">
                {t['inputs.reuse.description'] || 'Configure water reuse parameters and recycling processes.'}
              </p>
            </div>
          </Card>
        </div>
      );
    }

    // Default inputs page
    return (
      <div className="p-6">
        <Card title={t['nav.inputs'] || 'Inputs'} className="w-full">
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              {t['inputs.parameterTitle'] || 'Input Parameters'}
            </h3>
            <p className="text-gray-500 mb-6">
              {t['inputs.selectCategory'] || 'Select a category from the navigation menu to configure specific input parameters.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              <Card size="small" className="text-center">
                <h4 className="font-medium">{t['nav.general'] || 'General'}</h4>
                <p className="text-sm text-gray-500">{t['inputs.basicParameters'] || 'Basic system parameters'}</p>
              </Card>
              <Card size="small" className="text-center">
                <h4 className="font-medium">{t['nav.consumption'] || 'Consumption'}</h4>
                <p className="text-sm text-gray-500">{t['inputs.waterUsage'] || 'Water usage metrics'}</p>
              </Card>
              <Card size="small" className="text-center">
                <h4 className="font-medium">{t['nav.pipes'] || 'Pipes'}</h4>
                <p className="text-sm text-gray-500">{t['inputs.pipeNetwork'] || 'Pipe network settings'}</p>
              </Card>
              <Card size="small" className="text-center">
                <h4 className="font-medium">{t['nav.chemistry'] || 'Chemistry'}</h4>
                <p className="text-sm text-gray-500">{t['inputs.chemicalAnalysis'] || 'Chemical analysis data'}</p>
              </Card>
              <Card size="small" className="text-center">
                <h4 className="font-medium">{t['nav.reuse'] || 'Reuse'}</h4>
                <p className="text-sm text-gray-500">{t['inputs.waterRecycling'] || 'Water recycling parameters'}</p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      
      <AddParameterModal
        visible={addModalVisible}
        onCancel={() => setAddModalVisible(false)}
        groupId={selectedGroupId}
      />
      
      <EditGroupModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        groupId={selectedGroupId}
      />
    </>
  );
};

export default InputsPage;
