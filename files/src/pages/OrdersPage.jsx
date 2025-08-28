import { Button, Card, Popconfirm, Space, Table, message } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import CrudModal from '../components/CrudModal'
import { KEY, load, save } from '../utils/storage'

const fields = [
  { name: 'orderDate', label: 'Order Date', rules: [{ required: true }] },
  { name: 'appellantNumber', label: 'Appellant Number', rules: [{ required: true }] },
  { name: 'appealYear', label: 'Appeal Year', rules: [{ required: true }] },
  { name: 'appellantName', label: 'Appellant Name', rules: [{ required: true }] },
]

export default function OrdersPage() {
  const { search } = useOutletContext()
  const [rows, setRows] = useState(() => load(KEY.ORDERS, [
    { key: '1', orderDate: '07/07/2025', appellantNumber: 'A-001', appealYear: '2025', appellantName: 'Sample A' }
  ]))

  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('add')
  const [current, setCurrent] = useState(null)

  useEffect(() => save(KEY.ORDERS, rows), [rows])

  // listen global add from header
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
    { title: 'ORDER DATE', dataIndex: 'orderDate' },
    { title: 'APPELLANT NUMBER', dataIndex: 'appellantNumber' },
    { title: 'APPEAL YEAR', dataIndex: 'appealYear' },
    { title: 'APPELLANT NAME', dataIndex: 'appellantName' },
    {
      title: 'ACTION',
      key: 'action',
      render: (_, r) => (
        <Space>
          <Button onClick={() => { setMode('view'); setCurrent(r); setOpen(true) }}>View</Button>
          <Button onClick={() => { setMode('edit'); setCurrent(r); setOpen(true) }}>Update</Button>
          <Popconfirm
            title="Delete order"
            description={`Are you sure to delete ${r.appellantNumber}?`}
            okText="Yes"
            okButtonProps={{ danger: true }}
            onConfirm={() => {
              setRows(prev => prev.filter(x => x.key !== r.key))
              message.success('Order deleted')
            }}
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  function handleSave(values) {
    if (mode === 'add') {
      setRows(prev => [...prev, { key: Date.now().toString(), ...values }])
      message.success('Order added')
    } else if (mode === 'edit' && current) {
      setRows(prev => prev.map(x => x.key === current.key ? { ...x, ...values } : x))
      message.success('Order updated')
    }
    setOpen(false)
  }

  return (
    <Card title="Orders">
      <Table className="tab" columns={columns} dataSource={filtered} rowKey="key" pagination={{ pageSize: 6 }} />
      <CrudModal open={open} mode={mode} onCancel={() => setOpen(false)} onSave={handleSave} record={current} fields={fields} />
    </Card>
  )
}