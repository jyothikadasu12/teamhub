
import { useMemo } from "react";
import { useEmployees } from "../hooks/useEmployee";
import Button from "../components/ui/Button";
import "../styles/reports.css";

function ReportsPage() {
  const { employees, status, error, retry } = useEmployees();

  const report = useMemo(() => {
    const departments = new Map<string, number>();

    employees.forEach((employee) => {
      const department = employee.department || "Unassigned";
      departments.set(
        department,
        (departments.get(department) ?? 0) + 1
      );
    });

    const activeEmployees = employees.filter(
      (employee) => employee.status === "Active"
    ).length;

    const employeesOnLeave = employees.filter(
      (employee) => employee.status === "On Leave"
    ).length;

    const departmentEntries = Array.from(departments.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    return {
      total: employees.length,
      active: activeEmployees,
      onLeave: employeesOnLeave,
      departments: departmentEntries,
    };
  }, [employees]);

  if (status === "loading") {
    return (
      <main className="reports-page" aria-busy="true">
        <p className="eyebrow">TEAMHUB / ANALYTICS</p>
        <h1>Reports</h1>
        <p className="page-description">Loading employee reports...</p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="reports-page">
        <p className="eyebrow">TEAMHUB / ANALYTICS</p>
        <h1>Reports</h1>

        <div className="reports-error" role="alert">
          <h2>Unable to load reports</h2>
          <p>{error || "Employee data could not be loaded."}</p>
          <Button onClick={retry}>Try again</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="reports-page">
      <header className="reports-header">
        <div>
          <p className="eyebrow">TEAMHUB / ANALYTICS</p>
          <h1>Reports</h1>
          <p className="page-description">
            An overview of your employee directory and team distribution.
          </p>
        </div>

        <span className="reports-live-label">
          Based on loaded employee data
        </span>
      </header>

      <section className="reports-stats" aria-label="Employee summary">
        <article className="report-stat-card">
          <span className="report-stat-card__label">
            Total employees
          </span>
          <strong>{report.total}</strong>
          <span className="report-stat-card__note">
            Employees currently loaded
          </span>
        </article>

        <article className="report-stat-card">
          <span className="report-stat-card__label">
            Active employees
          </span>
          <strong>{report.active}</strong>
          <span className="report-stat-card__note">
            Marked as active
          </span>
        </article>

        <article className="report-stat-card">
          <span className="report-stat-card__label">
            On leave
          </span>
          <strong>{report.onLeave}</strong>
          <span className="report-stat-card__note">
            Marked as on leave
          </span>
        </article>

        <article className="report-stat-card">
          <span className="report-stat-card__label">
            Departments
          </span>
          <strong>{report.departments.length}</strong>
          <span className="report-stat-card__note">
            Distinct departments in loaded data
          </span>
        </article>
      </section>

      <section className="reports-panel">
        <div className="reports-panel__header">
          <div>
            <h2>Department distribution</h2>
            <p>Employees grouped by department</p>
          </div>
        </div>

        {report.departments.length === 0 ? (
          <p className="reports-empty">
            No employee data is available to report.
          </p>
        ) : (
          <div className="department-report-list">
            {report.departments.map((department) => {
              const percentage =
                report.total > 0
                  ? (department.count / report.total) * 100
                  : 0;

              return (
                <article
                  className="department-report"
                  key={department.name}
                >
                  <div className="department-report__details">
                    <span>{department.name}</span>
                    <strong>
                      {department.count}{" "}
                      {department.count === 1 ? "employee" : "employees"}
                    </strong>
                  </div>

                  <div
                    className="department-report__track"
                    role="progressbar"
                    aria-label={`${department.name} employee distribution`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(percentage)}
                  >
                    <div
                      className="department-report__bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="department-report__percentage">
                    {percentage.toFixed(1)}%
                  </span>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="reports-footnote">
        Note: These figures reflect the employee records returned by the
        current data source. They are not company-wide totals unless the
        complete employee dataset has been loaded.
      </p>
    </main>
  );
}

export default ReportsPage;
