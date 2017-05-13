export type TodoFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE';

export interface FilterRecord {
  id: TodoFilter;
  title: string;
}
