
import type { ReactNode } from "react";

interface GenericListProps<T> {
  items: T[];
  getKey: (item: T) => string | number;
  renderItem: (item: T) => ReactNode;
  emptyMessage?: string;
}

function GenericList<T>({
  items,
  getKey,
  renderItem,
  emptyMessage = "No items found.",
}: GenericListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="empty-state" role="status">
        <h2>{emptyMessage}</h2>
      </div>
    );
  }

  return (
    <div className="employee-grid">
      {items.map((item) => (
        <div key={getKey(item)} className="employee-grid__item">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default GenericList;
    