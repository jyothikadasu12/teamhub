
import type { EmployeeStatus } from "../../types/employee";
import Button from "../ui/Button";

type EmployeeStatusFilter = "All" | EmployeeStatus;

interface EmployeeSearchProps {
  value: string;
  status: EmployeeStatusFilter;
  onChange: (value: string) => void;
  onStatusChange: (status: EmployeeStatusFilter) => void;
  onClear: () => void;
}

function EmployeeSearch({
  value,
  status,
  onChange,
  onStatusChange,
  onClear,
}: EmployeeSearchProps) {
  return (
    <div className="employee-search">
      <label className="employee-search__field">
        <span aria-hidden="true">⌕</span>

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search name, role, department, or location..."
          aria-label="Search employees"
        />
      </label>

      <label className="employee-search__status">
        <span>Status</span>

        <select
          value={status}
          onChange={(event) =>
            onStatusChange(event.target.value as EmployeeStatusFilter)
          }
          aria-label="Filter employees by status"
        >
          <option value="All">All statuses</option>
          <option value="Active">Active</option>
          <option value="On Leave">On Leave</option>
        </select>
      </label>

      {(value.trim() !== "" || status !== "All") && (
        <Button onClick={onClear}>
          Reset filters
        </Button>
      )}
    </div>
  );
}

export default EmployeeSearch;
