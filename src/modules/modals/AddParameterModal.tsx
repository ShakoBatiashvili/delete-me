import React, { useState, useEffect } from 'react';
import { Modal, Form, Select, Input, InputNumber, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { addParameter, setAvailableElements, setLoading } from '../../redux/slices/parametersSlice';
import { fetchChemicalElements } from '../../utils/api';
import type { ChemicalElement } from '../../utils/api';

const { Option } = Select;

interface AddParameterModalProps {
  visible: boolean;
  onCancel: () => void;
  groupId: string;
}

const AddParameterModal: React.FC<AddParameterModalProps> = ({ visible, onCancel, groupId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { availableElements, loading } = useSelector((state: RootState) => state.parameters);
  const t = useSelector((state: RootState) => state.translations.translations);
  
  const [selectedElements, setSelectedElements] = useState<string[]>([]);

  useEffect(() => {
    if (visible && availableElements.length === 0) {
      loadElements();
    }
  }, [visible, availableElements.length]);

  const loadElements = async () => {
    dispatch(setLoading(true));
    try {
      const elements = await fetchChemicalElements();
      dispatch(setAvailableElements(elements));
    } catch (error) {
      message.error(t['message.loadElementsFailed'] || 'Failed to load chemical elements');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      // Find the selected element details
      const selectedElement = availableElements.find(el => el.value === values.element);
      const parameterName = selectedElement ? selectedElement.label : values.element;
      
      dispatch(addParameter({
        groupId,
        name: parameterName,
        parameter: values.element,
        value: values.value || 0,
        unit: values.unit || '',
      }));

      // Add to selected elements to remove from dropdown
      setSelectedElements(prev => [...prev, values.element]);
      
      message.success(t['message.parameterAdded'] || 'Parameter added successfully');
      form.resetFields();
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const filteredElements = availableElements.filter(
    element => !selectedElements.includes(element.value)
  );

  return (
    <Modal
      title={t['modal.addParameter'] || 'Add Parameter'}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t['modal.save'] || 'Save'}
      cancelText={t['modal.cancel'] || 'Cancel'}
      okButtonProps={{ 'data-testid': 'save-parameter-btn' }}
      cancelButtonProps={{ 'data-testid': 'cancel-parameter-btn' }}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="addParameterForm"
        requiredMark={false}
      >
        <Form.Item
          name="element"
          label={t['modal.selectElement'] || 'Select Chemical Element'}
          rules={[
            {
              required: true,
              message: t['validation.required'] || 'This field is required',
            },
          ]}
        >
          <Select
            placeholder={t['placeholder.chooseElement'] || 'Choose an element...'}
            loading={loading}
            showSearch
            filterOption={(input, option) =>
              option?.label?.toString().toLowerCase().includes(input.toLowerCase()) || false
            }
            notFoundContent={loading ? (t['placeholder.loading'] || 'Loading...') : (t['placeholder.noElements'] || 'No elements found')}
            data-testid="element-select"
          >
            {filteredElements.map((element: ChemicalElement) => (
              <Option key={element.value} value={element.value}>
                {element.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="value"
          label={t['modal.enterValue'] || 'Enter Value'}
          rules={[
            {
              type: 'number',
              min: 0,
              message: t['validation.noNegatives'] || 'Value cannot be negative',
            },
          ]}
        >
          <InputNumber
            placeholder={t['placeholder.value'] || '0.00'}
            precision={2}
            style={{ width: '100%' }}
            min={0}
            data-testid="value-input"
          />
        </Form.Item>

        <Form.Item
          name="unit"
          label={t['label.unitOptional'] || 'Unit (Optional)'}
        >
          <Input placeholder={t['placeholder.unit'] || 'e.g., mg/L, ppm, %'} data-testid="unit-input" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddParameterModal;
