
import { useMemo, useState } from "react";
import Button from "../components/ui/Button";
import EmployeeList from "../components/employees/EmployeeList";
import EmployeeSearch from "../components/employees/EmployeeSearch";
import useDebounce from "../hooks/useDebounce";
import { useEmployees } from "../hooks/useEmployee";
import type { Employee, EmployeeStatus } from "../types/employee";

type EmployeeStatusFilter = "All" | EmployeeStatus;

function EmployeesPage() {
  const { employees, status, error, retry } = useEmployees();

  const [search, setSearch] = useState("");
  const [employeeStatus, setEmployeeStatus] =
    useState<EmployeeStatusFilter>("All");

  const debouncedSearch = useDebounce(search, 300);

  const filteredEmployees = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch = [
        employee.name,
        employee.role,
        employee.department,
        employee.location,
        employee.email,
      ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        employeeStatus === "All" ||
        employee.status === employeeStatus;

      return matchesSearch && matchesStatus;
    });
  }, [employees, debouncedSearch, employeeStatus]);

  function handleResetFilters() {
    setSearch("");
    setEmployeeStatus("All");
  }

  function handleView(employee: Employee) {
    window.alert(
      `Employee: ${employee.name}\n` +
      `Role: ${employee.role}\n` +
      `Department: ${employee.department}\n` +
      `Email: ${employee.email}`
    );
  }

  return (
    <section className="employees-page">
      <div className="employees-page__heading">
        <div>
          <p className="eyebrow">PEOPLE DIRECTORY</p>
          <h1>Employees</h1>
          <p className="employees-page__description">
            Find your colleagues and explore their team profiles.
          </p>
        </div>

        <span className="employee-count">
          {status === "success"
            ? `${filteredEmployees.length} employees`
            : "Employee directory"}
        </span>
      </div>

      <EmployeeSearch
        value={search}
    
        status={employeeStatus}
        onChange={setSearch}
        onStatusChange={setEmployeeStatus}
        onClear={handleResetFilters}
      />

      {status === "loading" && (
        <div
          className="employee-skeleton-grid"
          aria-label="Loading employees"
          role="status"
        >
          {Array.from({ length: 6 }, (_, index) => (
            <div
              className="employee-skeleton"
              key={index}
              aria-hidden="true"
            >
              <div className="skeleton-avatar" />
              <div className="skeleton-line skeleton-line--wide" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-line--short" />
            </div>
          ))}
          <span className="sr-only">Loading employees...</span>
        </div>
      )}

      {status === "error" && (
        <div className="employee-error" role="alert">
          <h2>We couldn't load the employees</h2>
          <p>{error}</p>
          <Button onClick={retry}>Try again</Button>
        </div>
      )}

      {status === "success" && (
        <>
          <p className="employee-results" aria-live="polite">
            Showing {filteredEmployees.length} of {employees.length} employees
          </p>

          <EmployeeList
            employees={filteredEmployees}
            onView={handleView}
          />
        </>
      )}
    </section>
  );
}

export default EmployeesPage;
