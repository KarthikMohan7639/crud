const KEY = {
  ORDERS: 'antd_crm_orders_v1',
  CUSTOMERS: 'antd_crm_customers_v1',
}

export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}
export function load(key, fallback = []) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch (e) {
    return fallback
  }
}

export { KEY }