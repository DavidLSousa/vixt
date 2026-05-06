/** @jsx h */
import { h } from '../../core/dom';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, item: any) => any;
}

export interface SimpleTableProps {
  columns: TableColumn[];
  data: any[];
  sortKey?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string) => void;
  className?: string;
  emptyMessage?: string;
}

export const SimpleTable = ({ 
  columns, 
  data, 
  sortKey, 
  sortOrder, 
  onSort, 
  className = '',
  emptyMessage = 'Nenhum dado encontrado'
}: SimpleTableProps) => {
  return (
    <div className={`vixt-table-container ${className}`}>
      <table className="vixt-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th 
                key={col.key}
                className={`${col.sortable ? 'vixt-table__th--sortable' : ''} vixt-table__th--${col.align || 'left'}`}
                onClick={() => col.sortable && onSort && onSort(col.key)}
              >
                <div className="vixt-table__th-content">
                  {col.label}
                  {col.sortable && (
                    <span className={`vixt-table__sort-icon ${sortKey === col.key ? `vixt-table__sort-icon--active vixt-table__sort-icon--${sortOrder}` : ''}`}>
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none">
                        <path d="M7 15l5 5 5-5M7 9l5-5 5 5"></path>
                      </svg>
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map(col => (
                  <td key={col.key} className={`vixt-table__td--${col.align || 'left'}`}>
                    {col.render ? col.render(item[col.key], item) : item[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colspan={columns.length} className="vixt-table__empty">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
