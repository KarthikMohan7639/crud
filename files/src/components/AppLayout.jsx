import React, { useState } from 'react'
import { Layout, Menu, Input, Button } from 'antd'
import { ShoppingCartOutlined, UserOutlined, PlusOutlined } from '@ant-design/icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const active = pathname.startsWith('/customers') ? 'customers' : 'orders'
  const [search, setSearch] = useState('')

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 64, margin: 16, color: '#fff', fontWeight: 700, display:'flex',alignItems:'center',justifyContent:'center' }}>
          CRM
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[active]}
          onClick={({ key }) => navigate(`/${key}`)}
          items={[
            { key: 'orders', icon: <ShoppingCartOutlined />, label: 'Orders' },
            { key: 'customers', icon: <UserOutlined />, label: 'Customers' },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: 'lightgreen', padding: '8px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
          <Input.Search placeholder="Search..." allowClear value={search} onChange={(e) => setSearch(e.target.value)} style={{ maxWidth: 360 }} />
          <div style={{ flex: 1 }} />
          {/* We pass search via Outlet context */}
          <Button type="primary" icon={<PlusOutlined />} onClick={() => window.dispatchEvent(new CustomEvent('global-add'))}>
            Add New
          </Button>
        </Header>

        <Content style={{ margin: 16 }}>
          <Outlet context={{ search }} />
        </Content>
      </Layout>
    </Layout>
  )
}