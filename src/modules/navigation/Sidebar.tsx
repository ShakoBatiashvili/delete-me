import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
  EnvironmentOutlined as MapOutlined, 
  FileTextOutlined as InputOutlined, 
  CalculatorOutlined, 
  FileOutlined as OutputOutlined,
  SettingOutlined,
  ExperimentOutlined,
  NodeExpandOutlined as DeploymentUnitOutlined,
  ReloadOutlined as RecyclingOutlined,
  MenuOutlined,
  EnvironmentOutlined,
  NodeExpandOutlined,
  AlertOutlined,
  FunctionOutlined,
  PlayCircleOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  BarChartOutlined,
  DownloadOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onCollapse, isMobile = false }) => {
  const navigate = useNavigate();
  const { activeSection, activeChild } = useSelector((state: RootState) => state.navigation);
  const t = useSelector((state: RootState) => state.translations.translations);

  const getSelectedKeys = () => {
    if (activeChild) {
      return [`${activeSection}-${activeChild}`];
    }
    return [activeSection];
  };

  const getOpenKeys = () => {
    if (activeSection === 'map' || activeSection === 'inputs' || activeSection === 'calculate' || activeSection === 'outputs') {
      return [activeSection];
    }
    return [];
  };

  const handleMenuClick = ({ key }: { key: string }) => {
      if (key.includes('-')) {
      const [section, child] = key.split('-');
      navigate(`/${section}/${child}`);
    } else {
      navigate(`/${key}`);
    }
    
    // Close mobile drawer after navigation
    if (isMobile) {
      onCollapse(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    // Handle Escape key to close mobile drawer
    if (event.key === 'Escape' && isMobile && !collapsed) {
      onCollapse(true);
    }
  };

  const menuItems = [
    {
      key: 'map',
      icon: <MapOutlined />,
      label: t['nav.map'] || 'Map',
      children: [
        {
          key: 'map-overview',
          icon: <EnvironmentOutlined />,
          label: t['nav.map.overview'] || 'System Overview',
        },
        {
          key: 'map-flowchart',
          icon: <NodeExpandOutlined />,
          label: t['nav.map.flowchart'] || 'Process Flow',
        },
        {
          key: 'map-monitoring',
          icon: <ExperimentOutlined />,
          label: t['nav.map.monitoring'] || 'Monitoring Points',
        },
        {
          key: 'map-alerts',
          icon: <AlertOutlined />,
          label: t['nav.map.alerts'] || 'System Alerts',
        },
      ],
    },
    {
      key: 'inputs',
      icon: <InputOutlined />,
      label: t['nav.inputs'] || 'Inputs',
      children: [
        {
          key: 'inputs-general',
          icon: <SettingOutlined />,
          label: t['nav.general'] || 'General',
        },
        {
          key: 'inputs-consumption',
          icon: <DeploymentUnitOutlined />,
          label: t['nav.consumption'] || 'Consumption',
        },
        {
          key: 'inputs-pipes',
          icon: <DeploymentUnitOutlined />,
          label: t['nav.pipes'] || 'Pipes',
        },
        {
          key: 'inputs-chemistry',
          icon: <ExperimentOutlined />,
          label: t['nav.chemistry'] || 'Chemistry',
        },
        {
          key: 'inputs-reuse',
          icon: <RecyclingOutlined />,
          label: t['nav.reuse'] || 'Reuse',
        },
      ],
    },
    {
      key: 'calculate',
      icon: <CalculatorOutlined />,
      label: t['nav.calculate'] || 'Calculate',
      children: [
        {
          key: 'calculate-models',
          icon: <FunctionOutlined />,
          label: t['nav.calculate.models'] || 'Calculation Models',
        },
        {
          key: 'calculate-batch',
          icon: <PlayCircleOutlined />,
          label: t['nav.calculate.batch'] || 'Batch Processing',
        },
        {
          key: 'calculate-realtime',
          icon: <ClockCircleOutlined />,
          label: t['nav.calculate.realtime'] || 'Real-time Analysis',
        },
        {
          key: 'calculate-optimization',
          icon: <ThunderboltOutlined />,
          label: t['nav.calculate.optimization'] || 'Optimization',
        },
      ],
    },
    {
      key: 'outputs',
      icon: <OutputOutlined />,
      label: t['nav.outputs'] || 'Outputs',
      children: [
        {
          key: 'outputs-reports',
          icon: <FileTextOutlined />,
          label: t['nav.outputs.reports'] || 'Generated Reports',
        },
        {
          key: 'outputs-analytics',
          icon: <BarChartOutlined />,
          label: t['nav.outputs.analytics'] || 'Analytics Dashboard',
        },
        {
          key: 'outputs-exports',
          icon: <DownloadOutlined />,
          label: t['nav.outputs.exports'] || 'Data Exports',
        },
        {
          key: 'outputs-compliance',
          icon: <SafetyCertificateOutlined />,
          label: t['nav.outputs.compliance'] || 'Compliance Reports',
        },
      ],
    },
  ];

  const siderContent = (
    <div className={collapsed ? 'collapsed-menu' : ''}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        openKeys={collapsed ? [] : getOpenKeys()}
        items={menuItems}
        onClick={handleMenuClick}
        style={{ height: '100%', borderRight: 0 }}
        triggerSubMenuAction={collapsed ? 'click' : 'hover'}
        onOpenChange={(openKeys) => {
          // Don't handle submenu open/close when collapsed to avoid navigation issues
          if (collapsed) {
            return;
          }
          
          // Handle submenu open/close - navigate to section when opening submenu
          if (openKeys.length === 0) {
            navigate(`/${activeSection}`);
          }
          if (openKeys.length > 0) {
            const openKey = openKeys[openKeys.length - 1];
            if (openKey && openKey !== activeSection) {
              navigate(`/${openKey}`);
            }
          }
        }}
      />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer
        title={
          <div className="flex items-center">
            <MenuOutlined className="mr-2" />
            <span>{t['drawer.navigationTitle'] || 'Navigation'}</span>
          </div>
        }
        placement="left"
        closable={true}
        onClose={() => onCollapse(true)}
        open={!collapsed}
        bodyStyle={{ padding: 0 }}
        width={256}
        onKeyDown={handleKeyDown}
        aria-label={t['aria.mainNavigation'] || 'Main navigation'}
      >
        <div style={{ height: '100%', backgroundColor: '#001529' }}>
          {siderContent}
        </div>
      </Drawer>
    );
  }

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onClick={() => collapsed && onCollapse(false)}
      width={256}
      style={{
        overflow: 'hidden',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="h-8 m-4 bg-gray-700 rounded flex items-center justify-center">
        {!collapsed && <span className="text-white font-bold text-md">🧪 {t['general.labSystemManager'] || 'Lab System Manager'}</span>}
        {collapsed && <ExperimentOutlined className="text-white text-lg" />}
      </div>
      {siderContent}
    </Sider>
  );
};

export default Sidebar;
