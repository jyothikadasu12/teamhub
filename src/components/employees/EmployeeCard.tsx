
import type { Employee } from "../../types/employee";
import Card from "../ui/card";
import Button from "../ui/Button";

interface EmployeeCardProps {
  employee: Employee;
  onView: (employee: Employee) => void;
}

function EmployeeCard({ employee, onView }: EmployeeCardProps) {
  const statusClass =
    employee.status === "Active" ? "active" : "on-leave";

  return (
    <Card className="employee-card">
      <div className="employee-card__top">
        <img
          className="employee-card__avatar"
          src={employee.avatar}
          alt={`${employee.name}'s profile`}
          loading="lazy"
        />

        <span className={`employee-status ${statusClass}`}>
          <span className="status-dot" aria-hidden="true" />
          {employee.status}
        </span>
      </div>

      <div className="employee-card__identity">
        <h2>{employee.name}</h2>
        <p>{employee.role}</p>
      </div>

      <dl className="employee-card__details">
        <div>
          <dt>Department</dt>
          <dd>{employee.department}</dd>
        </div>

        <div>
          <dt>Location</dt>
          <dd>{employee.location}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${employee.email}`}>
              {employee.email}
            </a>
          </dd>
        </div>
      </dl>

      <Button
        variant="secondary"
        className="employee-card__button "
        onClick={() => onView(employee)}
      >
        View employee <span aria-hidden="true">→</span>
      </Button>
    </Card>
  );
}

export default EmployeeCard;
