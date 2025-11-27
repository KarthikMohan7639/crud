import { Form, Input, Modal } from 'antd'
import { useEffect } from 'react'

export default function CrudModal({ open, mode, onCancel, onSave, record, fields = [] }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (record) form.setFieldsValue(record)
    else form.resetFields()
  }, [record, form, open])

  const submit = () => {
    form.validateFields().then(values => {
      onSave(values)
      form.resetFields()
    })
  }

  return (
    <Modal
      title={mode === 'add' ? 'Add' : mode === 'edit' ? 'Edit' : 'View'}
      open={open}
      onCancel={onCancel}
      onOk={mode === 'view' ? onCancel : submit}
      okText={mode === 'view' ? 'Close' : 'Save'}
    >
      <Form form={form} layout="vertical">
        {fields.map(f => (
          <Form.Item key={f.name} name={f.name} label={f.label} rules={f.rules}>
            <Input disabled={mode === 'view'} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  )
}