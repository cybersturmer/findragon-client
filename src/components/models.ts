export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Portfolio {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Allocation {
  title: string
  portfolio_ratio: number
  category_ratio: number
}
