import React, { useMemo } from 'react';
import { Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { Parameter } from '../redux/slices/parametersSlice';

interface EditableCellProps {
  value: number;
  onSave: (value: number) => void;
  editing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  translations: any;
}

interface UseTableColumnsProps {
  translations: any;
  isEditing: (record: Parameter) => boolean;
  onEdit: (record: Parameter) => void;
  onSave: (groupId: string, parameterId: string, value: number) => void;
  onCancel: () => void;
  onDelete: (groupId: string, parameterId: string) => void;
  EditableCell: React.FC<EditableCellProps>;
}

export const useTableColumns = ({
  translations: t,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  EditableCell,
}: UseTableColumnsProps): ColumnsType<Parameter> => {
  return useMemo(() => [
    {
      title: t['table.name'] || 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (text: string) => <span className="font-medium">{text}</span>,
    },
    {
      title: t['table.parameter'] || 'Parameter',
      dataIndex: 'parameter',
      key: 'parameter',
      width: '15%',
      render: (text: string) => <span className="text-gray-700">{text}</span>,
    },
    {
      title: t['table.value'] || 'Value',
      dataIndex: 'value',
      key: 'value',
      width: '15%',
      render: (value: number, record: Parameter) => {
        const editing = isEditing(record);
        return (
          <EditableCell
            value={value}
            editing={editing}
            onSave={(newValue) => onSave(record.group, record.id, newValue)}
            onEdit={() => onEdit(record)}
            onCancel={onCancel}
            translations={t}
          />
        );
      },
    },
    {
      title: t['table.unit'] || 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
      render: (unit: string) => <span className="text-gray-600">{unit || '-'}</span>,
    },
    {
      title: t['table.alarm'] || 'Alarm',
      dataIndex: 'alarm',
      key: 'alarm',
      width: '12%',
      render: (alarm: string) => {
        const getAlarmColor = (alarmStatus: string) => {
          switch (alarmStatus?.toLowerCase()) {
            case 'critical':
              return 'red';
            case 'warning':
              return 'orange';
            case 'normal':
              return 'green';
            default:
              return 'default';
          }
        };
        
        return (
          <Tag color={getAlarmColor(alarm)} className="text-xs">
            {alarm || 'Normal'}
          </Tag>
        );
      },
    },
    {
      title: t['table.description'] || 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '18%',
      render: (description: string) => (
        <span className="text-gray-600 text-sm">{description || '-'}</span>
      ),
    },
    {
      title: t['table.actions'] || 'Actions',
      key: 'actions',
      width: '10%',
      render: (_: unknown, record: Parameter) => (
        <Space size="small">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            disabled={isEditing(record)}
            size="small"
            data-testid="edit-parameter-btn"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.group, record.id)}
            size="small"
            data-testid="delete-parameter-btn"
          />
        </Space>
      ),
    },
  ], [t, isEditing, onEdit, onSave, onCancel, onDelete, EditableCell]);
};
