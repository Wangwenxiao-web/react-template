type Operator = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'cn' | 'nc' | 'between'

interface Filter<T> {
  field: string
  op: Operator
  value: T
}

interface ListParams<T> {
  filters: Filter<T>[]
  pageIndex: number
  pageSize: number
}

interface WebApiResponse<T> {
  code: number
  success: boolean
  data: T
  message: string
}
