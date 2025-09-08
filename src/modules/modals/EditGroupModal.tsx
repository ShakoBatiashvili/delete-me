import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { updateGroupDescription } from '../../redux/slices/parametersSlice';

const { TextArea } = Input;

interface EditGroupModalProps {
  visible: boolean;
  onCancel: () => void;
  groupId: string;
}

const EditGroupModal: React.FC<EditGroupModalProps> = ({ visible, onCancel, groupId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { groups } = useSelector((state: RootState) => state.parameters);
  const t = useSelector((state: RootState) => state.translations.translations);

  const currentGroup = groups.find(group => group.id === groupId);

  useEffect(() => {
    if (visible && currentGroup) {
      form.setFieldsValue({
        description: currentGroup.description,
      });
    }
  }, [visible, currentGroup, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      dispatch(updateGroupDescription({
        groupId,
        description: values.description,
      }));

      message.success(t['message.groupUpdated'] || 'Group description updated successfully');
      onCancel();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  if (!currentGroup) {
    return null;
  }

  return (
    <Modal
      title={`${t['modal.editGroup'] || 'Edit Group'}: ${currentGroup.name}`}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={t['modal.save'] || 'Save'}
      cancelText={t['modal.cancel'] || 'Cancel'}
      okButtonProps={{ 'data-testid': 'save-group-btn' }}
      cancelButtonProps={{ 'data-testid': 'cancel-group-btn' }}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        name="editGroupForm"
        requiredMark={false}
      >
        <Form.Item
          name="description"
          label={t['modal.groupDescription'] || 'Group Description'}
          rules={[
            {
              required: true,
              message: t['validation.required'] || 'This field is required',
            },
            {
              min: 10,
              message: t['validation.minDescription'] || 'Description must be at least 10 characters long',
            },
          ]}
        >
          <TextArea
            rows={4}
            placeholder={t['placeholder.groupDescription'] || 'Enter a detailed description for this parameter group...'}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGroupModal;
