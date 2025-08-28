import { Button, Card, Popconfirm, Space, Table, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CrudModal from '../components/CrudModal'
import { KEY, load, save } from '../utils/storage'

const fields = [
  { name: 'name', label: 'Name', rules: [{ required: true }] },
  { name: 'email', label: 'Email', rules: [{ required: true, type: 'email' }] },
  { name: 'phone', label: 'Phone', rules: [{ required: true }] },
]

export default function CustomersPage() {
  const { search } = useOutletContext()
  const [rows, setRows] = useState(() => load(KEY.CUSTOMERS, [
    { key: 'c1', name: 'John Doe', email: 'john@example.com', phone: '9876543210' }
  ]))

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('add')
  const [current, setCurrent] = useState(null)

  useEffect(() => save(KEY.CUSTOMERS, rows), [rows])

  // global add
  useEffect(() => {
    function h() { setMode('add'); setCurrent(null); setOpen(true) }
    window.addEventListener('global-add', h)
    return () => window.removeEventListener('global-add', h)
  }, [])

  const filtered = useMemo(() => {
    const q = (search || '').toLowerCase()
    if (!q) return rows
    return rows.filter(r => Object.values(r).join(' ').toLowerCase().includes(q))
  }, [rows, search])

  const columns = [
    { title: 'NAME', dataIndex: 'name', onHeaderCell: () => ({ style: { backgroundColor: 'lightblue', color: 'black' } }) },
    { title: 'EMAIL', dataIndex: 'email', onHeaderCell: () => ({ style: { backgroundColor: 'lightblue', color: 'black' } }) },
    { title: 'PHONE', dataIndex: 'phone', onHeaderCell: () => ({ style: { backgroundColor: 'lightblue', color: 'black' } }) },
    {
      title: 'ACTION', key: 'action', onHeaderCell: () => ({ style: { backgroundColor: 'lightblue', color: 'black' } }), render: (_, r) => (
        <Space>
          <Button onClick={() => { setMode('view'); setCurrent(r); setOpen(true) }}>View</Button>
          <Button onClick={() => { setMode('edit'); setCurrent(r); setOpen(true) }}>Update</Button>
          <Popconfirm
            title="Delete customer"
            description={`Are you sure to delete ${r.name}?`}
            okText="Yes"
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              setRows(prev => prev.filter(x => x.key !== r.key))
              message.success('Customer deleted')
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  function handleSave(values) {
    if (mode === 'add') {
      setRows(prev => [...prev, { key: Date.now().toString(), ...values }])
      message.success('Customer added')
    } else if (mode === 'edit' && current) {
      setRows(prev => prev.map(x => x.key === current.key ? { ...x, ...values } : x))
      message.success('Customer updated')
    }
    setOpen(false)
  }

  return (
    <Card title="Customers">
      <Table columns={columns} dataSource={filtered} rowKey="key" pagination={{ pageSize: 6 }} scroll={{ x: true }} />
      <CrudModal open={open} mode={mode} onCancel={() => setOpen(false)} onSave={handleSave} record={current} fields={fields} />
    </Card>
  )
}