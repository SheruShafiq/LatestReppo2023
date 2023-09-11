import ShowChangesTable, { ShowChangesTableProps } from "./ShowChangesTable";
import { fireEvent, render, screen } from "@testing-library/react";

import RelationDetails from "./RelationDetails";
import { debug } from "vitest-preview";
import matchers from "@testing-library/jest-dom";

expect.extend(matchers);

describe("ShowChangesTable", () => {
  const mockOldData = {
    name: "John Doe",
    age: "30",
    email: "john@example.com",
  };

  const mockNewData = {
    name: "Jane Smith",
    age: "32",
    email: "jane@example.com",
  };
  it("renders without crashing", () => {
    const { getByText } = render(
      <ShowChangesTable newData={mockNewData} oldData={mockOldData} />
    );
    expect(getByText("Oudegegevens")).toBeInTheDocument();
    expect(getByText("Nieuwegegevens")).toBeInTheDocument();
  });

  it("displays side labels correctly", () => {
    const sideLabels = ["name", "age", "email"];
    const { getByText } = render(
      <ShowChangesTable
        sideLabels={sideLabels}
        newData={mockNewData}
        oldData={mockOldData}
      />
    );
    debug();
    expect(getByText("name")).toBeInTheDocument();
    expect(getByText("age")).toBeInTheDocument();
    expect(getByText("email")).toBeInTheDocument();
  });
});
