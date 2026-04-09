export interface MenuItem {
  id: number
  menuName: string
  menuUrl: string
  parentId: number | null
  orderNum: number
  icon: string | null
  perms: string | null
  type: number
  createTime: string
  updateTime: string
  status: number
  children: MenuItem[]
}
