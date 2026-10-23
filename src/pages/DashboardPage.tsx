
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useEmployees } from "../hooks/useEmployee";
import Button from "../components/ui/Button";
import "../styles/dashboard.css";

function DashboardPage() {
  const { employees, status, error, retry } = useEmployees();

  const stats = useMemo(() => {
    const departments = new Set(
      employees.map((employee) => employee.department)
    );

    return {
      total: employees.length,
      active: employees.filter(
        (employee) => employee.status === "Active"
      ).length,
      onLeave: employees.filter(
        (employee) => employee.status === "On Leave"
      ).length,
      inactive: employees.filter(
        (employee) => employee.status === "Inactive"
      ).length,
      departments: departments.size,
    };
  }, [employees]);

  const departmentStats = useMemo(() => {
    const counts = new Map<string, number>();

    employees.forEach((employee) => {
      counts.set(
        employee.department,
        (counts.get(employee.department) ?? 0) + 1
      );
    });

    return Array.from(counts.entries())
      .map(([department, count]) => ({
        department,
        count,
        percentage:
          employees.length > 0
            ? Math.round((count / employees.length) * 100)
            : 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [employees]);

  const employeePreview = useMemo(
    () => employees.slice(0, 5),
    [employees]
  );

  const isLoading = status === "loading";
  const hasError = status === "error";

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-eyebrow">TEAMHUB / OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="dashboard-description">
            Monitor your employee directory and workforce status.
          </p>
        </div>

        <Link to="/employees" className="dashboard-primary-link">
          View employees <span aria-hidden="true">→</span>
        </Link>
      </header>

      <section className="dashboard-welcome">
        <div className="dashboard-welcome__content">
          <span className="dashboard-welcome__label">
            YOUR WORKSPACE
          </span>
          <h2>Welcome to TeamHub</h2>
          <p>
            Get a clear overview of your team, employee status,
            and department distribution in one place.
          </p>

          <Link to="/employees" className="dashboard-welcome__button">
            Explore employees
          </Link>
        </div>

        <div className="dashboard-welcome__decoration" aria-hidden="true">
          <div className="dashboard-orbit dashboard-orbit--one" />
          <div className="dashboard-orbit dashboard-orbit--two" />
          <div className="dashboard-welcome__symbol">T</div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section-heading">
          <div>
            <h2>Workforce overview</h2>
            <p>Employee counts based on the records currently loaded.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="dashboard-message" role="status">
            <span className="dashboard-spinner" />
            Loading employee statistics...
          </div>
        ) : hasError ? (
          <div className="dashboard-message dashboard-message--error">
            <div>
              <h3>Unable to load employee data</h3>
            </div>
            <Button onClick={retry}>Try again</Button>
          </div>
        ) : (
          <div className="dashboard-stats">
            <article className="dashboard-stat-card">
              <div className="dashboard-stat-card__top">
                <span>Total employees</span>
                <span className="dashboard-stat-icon dashboard-stat-icon--blue">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="10" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </span>
              </div>
              <strong>{stats.total}</strong>
              <p>Loaded employee records</p>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-card__top">
                <span>Active employees</span>
                <span className="dashboard-stat-icon dashboard-stat-icon--green">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>
              </div>
              <strong>{stats.active}</strong>
              <p>Currently active</p>
              <span className="dashboard-status-label dashboard-status-label--active">
                Active
              </span>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-card__top">
                <span>On leave</span>
                <span className="dashboard-stat-icon dashboard-stat-icon--amber">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
              </div>
              <strong>{stats.onLeave}</strong>
              <p>Currently on leave</p>
              <span className="dashboard-status-label dashboard-status-label--leave">
                On Leave
              </span>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-card__top">
                <span>Inactive employees</span>
                <span className="dashboard-stat-icon dashboard-stat-icon--red">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8 12h8" />
                  </svg>
                </span>
              </div>
              <strong>{stats.inactive}</strong>
              <p>Currently inactive</p>
              <span className="dashboard-status-label dashboard-status-label--inactive">
                Inactive
              </span>
            </article>

            <article className="dashboard-stat-card">
              <div className="dashboard-stat-card__top">
                <span>Departments</span>
                <span className="dashboard-stat-icon dashboard-stat-icon--purple">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                  </svg>
                </span>
              </div>
              <strong>{stats.departments}</strong>
              <p>Unique departments</p>
            </article>
          </div>
        )}
      </section>

      <div className="dashboard-content-grid">
        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h2>Department distribution</h2>
              <p>Employees grouped by department</p>
            </div>
            <span className="dashboard-panel__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </span>
          </div>

          {isLoading ? (
            <p className="dashboard-empty">Loading departments...</p>
          ) : hasError ? (
            <p className="dashboard-empty">
              Department information is unavailable.
            </p>
          ) : departmentStats.length === 0 ? (
            <p className="dashboard-empty">
              No department data available yet.
            </p>
          ) : (
            <div className="dashboard-department-list">
              {departmentStats.map((item) => (
                <div
                  className="dashboard-department"
                  key={item.department}
                >
                  <div className="dashboard-department__details">
                    <span>{item.department}</span>
                    <span>
                      {item.count} {item.count === 1 ? "employee" : "employees"}
                    </span>
                  </div>
                  <div
                    className="dashboard-progress"
                    role="progressbar"
                    aria-label={`${item.department} employee share`}
                    aria-valuenow={item.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <span style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link to="/employees" className="dashboard-text-link">
            View all employees <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className="dashboard-panel">
          <div className="dashboard-panel__header">
            <div>
              <h2>Employee status</h2>
              <p>Breakdown of loaded records</p>
            </div>
            <span className="dashboard-panel__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M4 19V5M4 19h16" />
                <path d="m7 15 4-4 3 2 5-7" />
              </svg>
            </span>
          </div>

          {isLoading ? (
            <p className="dashboard-empty">Loading status data...</p>
          ) : hasError ? (
            <p className="dashboard-empty">
              Employee status information is unavailable.
            </p>
          ) : (
            <div className="dashboard-status-breakdown">
              <div className="dashboard-status-row">
                <span className="dashboard-status-dot dashboard-status-dot--active" />
                <span>Active</span>
                <strong>{stats.active}</strong>
              </div>
              <div className="dashboard-status-row">
                <span className="dashboard-status-dot dashboard-status-dot--leave" />
                <span>On Leave</span>
                <strong>{stats.onLeave}</strong>
              </div>
              <div className="dashboard-status-row">
                <span className="dashboard-status-dot dashboard-status-dot--inactive" />
                <span>Inactive</span>
                <strong>{stats.inactive}</strong>
              </div>

              <div
                className="dashboard-status-bar"
                aria-label="Employee status distribution"
              >
                <span
                  className="dashboard-status-bar__active"
                  style={{
                    width: `${stats.total ? (stats.active / stats.total) * 100 : 0}%`,
                  }}
                />
                <span
                  className="dashboard-status-bar__leave"
                  style={{
                    width: `${stats.total ? (stats.onLeave / stats.total) * 100 : 0}%`,
                  }}
                />
                <span
                  className="dashboard-status-bar__inactive"
                  style={{
                    width: `${stats.total ? (stats.inactive / stats.total) * 100 : 0}%`,
                  }}
                />
              </div>

              <p className="dashboard-status-note">
                Status totals reflect the employee records currently loaded.
              </p>
            </div>
          )}

          <Link to="/employees" className="dashboard-text-link">
            Manage employee directory <span aria-hidden="true">→</span>
          </Link>
        </section>
      </div>

      <section className="dashboard-panel dashboard-employee-panel">
        <div className="dashboard-panel__header">
          <div>
            <h2>Employee directory preview</h2>
            <p>A preview of the employee records currently loaded</p>
          </div>
          <Link to="/employees" className="dashboard-text-link">
            View all <span aria-hidden="true">→</span>
          </Link>
        </div>

        {isLoading ? (
          <div className="dashboard-message" role="status">
            <span className="dashboard-spinner" />
            Loading employees...
          </div>
        ) : hasError ? (
          <div className="dashboard-message dashboard-message--error">
            <p>Employee records could not be loaded.</p>
            <Button onClick={retry}>Try again</Button>
          </div>
        ) : employeePreview.length === 0 ? (
          <p className="dashboard-empty">
            No employees found. Employee records will appear here when available.
          </p>
        ) : (
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employeePreview.map((employee) => (
                  <tr key={employee.id}>
                    <td>
                      <div className="dashboard-employee">
                        {employee.avatar ? (
                          <img
                            src={employee.avatar}
                            alt=""
                            className="dashboard-employee__avatar"
                          />
                        ) : (
                          <span className="dashboard-employee__avatar dashboard-employee__initials">
                            {employee.name
                              .split(" ")
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </span>
                        )}
                        <div>
                          <strong>{employee.name}</strong>
                          <span>{employee.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{employee.department}</td>
                    <td>{employee.location}</td>
                    <td>
                      <span
                        className={`dashboard-status-badge dashboard-status-badge--${employee.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <span />
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="dashboard-table-footer">
          <span>
            Showing {isLoading || hasError ? 0 : employeePreview.length} of{" "}
            {isLoading || hasError ? 0 : stats.total} loaded records
          </span>
          <Link to="/employees" className="dashboard-text-link">
            Open directory <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="dashboard-footer">
        <span>TeamHub workforce overview</span>
        <span>Statistics are calculated from loaded employee records.</span>
      </footer>
    </main>
  );
}

export default DashboardPage;
