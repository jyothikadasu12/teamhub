
import type { Employee } from "../../types/employee";
import GenericList from "../ui/GenericList";
import EmployeeCard from "./EmployeeCard";

interface EmployeeListProps {
  employees: Employee[];
  onView: (employee: Employee) => void;
}

function EmployeeList({ employees, onView }: EmployeeListProps) {
  return (
    <GenericList
      items={employees}
      getKey={(employee) => employee.id}
      emptyMessage="No employees match your search."
      renderItem={(employee) => (
        <EmployeeCard
          employee={employee}
          onView={onView}
        />
      )}
    />
  );
}

export default EmployeeList;
