
import { describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import EmployeeSearch from "../../components/employees/EmployeeSearch";

describe("EmployeeSearch component", () => {
  it("renders the search input and status filter", () => {
    render(
      createElement(EmployeeSearch, {
        value: "",
        status: "All",
        onChange: vi.fn(),
        onStatusChange: vi.fn(),
        onClear: vi.fn(),
      })
    );

    expect(
      screen.getByRole("searchbox", {
        name: "Search employees",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: "Filter employees by status",
      })
    ).toBeInTheDocument();
  });

  it("calls onChange when the user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      createElement(EmployeeSearch, {
        value: "",
        status: "All",
        onChange,
        onStatusChange: vi.fn(),
        onClear: vi.fn(),
      })
    );

    await user.type(
      screen.getByRole("searchbox", {
        name: "Search employees",
      }),
      "Alex"
    );

    expect(onChange).toHaveBeenNthCalledWith(1, "A");
    expect(onChange).toHaveBeenLastCalledWith("x");
  });

  it("calls onStatusChange when Active is selected", async () => {
    const user = userEvent.setup();
    const onStatusChange = vi.fn();

    render(
      createElement(EmployeeSearch, {
        value: "",
        status: "All",
        onChange: vi.fn(),
        onStatusChange,
        onClear: vi.fn(),
      })
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: "Filter employees by status",
      }),
      "Active"
    );

    expect(onStatusChange).toHaveBeenCalledWith("Active");
  });

  it("shows Reset filters when a filter is active", () => {
    render(
      createElement(EmployeeSearch, {
        value: "Alex",
        status: "All",
        onChange: vi.fn(),
        onStatusChange: vi.fn(),
        onClear: vi.fn(),
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Reset filters",
      })
    ).toBeInTheDocument();
  });

  it("calls onClear when Reset filters is clicked", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(
      createElement(EmployeeSearch, {
        value: "Alex",
        status: "All",
        onChange: vi.fn(),
        onStatusChange: vi.fn(),
        onClear,
      })
    );

    await user.click(
      screen.getByRole("button", {
        name: "Reset filters",
      })
    );

    expect(onClear).toHaveBeenCalledOnce();
  });

  it("hides Reset filters when no filter is active", () => {
    render(
      createElement(EmployeeSearch, {
        value: "",
        status: "All",
        onChange: vi.fn(),
        onStatusChange: vi.fn(),
        onClear: vi.fn(),
      })
    );

    expect(
      screen.queryByRole("button", {
        name: "Reset filters",
      })
    ).not.toBeInTheDocument();
  });
});
