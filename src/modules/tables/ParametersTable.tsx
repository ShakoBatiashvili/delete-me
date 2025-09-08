import React, { useState } from 'react';
import { Table, Input, Button, Space, Tooltip, message, Divider, Typography } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateParameter, removeParameter } from '../../redux/slices/parametersSlice';
import type { Parameter, ParameterGroup } from '../../redux/slices/parametersSlice';
import { useTableColumns } from '../../hooks/useTableColumns';

const { Title } = Typography;

interface EditableCellProps {
  value: number;
  onSave: (value: number) => void;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  translations: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value,
  onSave,
  editing,
  onEdit,
  onCancel,
  translations: t,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleSave = () => {
    const numValue = parseFloat(inputValue);
    if (isNaN(numValue)) {
      message.error(t['message.validNumber'] || 'Please enter a valid number');
      return;
    }
    if (numValue < 0) {
      message.error(t['validation.noNegatives'] || 'Value cannot be negative');
      return;
    }
    onSave(numValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  if (editing) {
    return (
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        style={{ width: '100%' }}
        autoFocus
      />
    );
  }

  return (
    <Tooltip title={`${t['tooltip.rawValue'] || 'Raw value'}: ${value}`} placement="top">
      <div
        className="editable-cell-value-wrap cursor-pointer hover:bg-gray-50 p-2 rounded"
        onClick={onEdit}
      >
        {value.toFixed(2)}
      </div>
    </Tooltip>
  );
};

interface ParametersTableProps {
  onAddParameter: () => void;
  onEditGroup: (groupId: string) => void;
}

const ParametersTable: React.FC<ParametersTableProps> = ({ onAddParameter, onEditGroup }) => {
  const dispatch = useDispatch();
  const { groups } = useSelector((state: RootState) => state.parameters);
  const t = useSelector((state: RootState) => state.translations.translations);
  
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: Parameter) => record.id === editingKey;

  const edit = (record: Parameter) => {
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = (groupId: string, parameterId: string, value: number) => {
    dispatch(updateParameter({ groupId, parameterId, value }));
    setEditingKey('');
  };

  const handleDelete = (groupId: string, parameterId: string) => {
    dispatch(removeParameter({ groupId, parameterId }));
    message.success(t['message.parameterRemoved'] || 'Parameter removed successfully');
  };

  const columns = useTableColumns({
    translations: t,
    isEditing,
    onEdit: edit,
    onSave: save,
    onCancel: cancel,
    onDelete: handleDelete,
    EditableCell,
  });

  return (
    <div className="p-6">
      {groups.map((group: ParameterGroup, index: number) => (
        <div key={group.id} className="mb-8">
          {index > 0 && <Divider />}
          <div className="flex items-center justify-between mb-4">
            <div>
              <Title level={4} className="mb-1">{group.name}</Title>
              <p className="text-gray-600 mb-0">{group.description}</p>
            </div>
            <Space className="flex-wrap">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onAddParameter}
                size="small"
                data-testid="add-parameter-btn"
              >
                {t['button.addParameter'] || 'Add Parameter'}
              </Button>
              <Button
                type="default"
                icon={<SettingOutlined />}
                onClick={() => onEditGroup(group.id)}
                size="small"
                data-testid="edit-group-btn"
              >
                {t['button.editGroup'] || 'Edit Group'}
              </Button>
            </Space>
          </div>
          
          <Table
            columns={columns}
            dataSource={group.parameters}
            rowKey="id"
            pagination={false}
            size="small"
            className="mb-4"
            rowClassName={(record) => isEditing(record) ? 'editable-row' : ''}
            locale={{
              emptyText: t['table.emptyText'] || 'No parameters in this group',
            }}
          />
        </div>
      ))}
      
      {groups.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">{t['table.noGroups'] || 'No parameter groups available'}</p>
          <Button type="primary" icon={<PlusOutlined />} onClick={onAddParameter}>
            {t['button.addFirstParameter'] || 'Add First Parameter'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ParametersTable;
