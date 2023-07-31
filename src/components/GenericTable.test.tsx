import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom";
import GenericTable from "../components/GenericTable";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DrawerComponent from "../components/DrawerComponent";
import PolicyDetails from "../pages/Portfolio/Customer/PolicyDetails";
import { debug } from "vitest-preview";
expect.extend(matchers);

const sampleData = {
  columns: [
    {
      header: "Polisnummer",
      accessor: "external_number",
      align: "left" as const,
    },
    {
      header: "Productnaam",
      accessor: "product_name",
      align: "left" as const,
    },
    {
      header: "Einddatum",
      accessor: "premium_enddate",
      align: "right" as const,
      cell: (row: any) => {
        const [open, setOpen] = useState(false); // local state for the drawer's open state

        return (
          <>
            <IconButton onClick={() => vi.fn()} data-testid="chevron-right">
              <ChevronRight />
            </IconButton>
          </>
        );
      },
    },
  ],
  tableContent: [
    {
      id: 1,
      external_number: "12345",
      product_name: "Product A",
      premium_enddate: "2022-12-31",
      status: "Active",
      premium: "1000",
      coverage: "Basic",
    },
    {
      id: 2,
      external_number: "12346",
      product_name: "Product B",
      premium_enddate: "2022-12-31",
      status: "Active",
      premium: "1000",
      coverage: "Basic",
    },
    //... other rows
  ],
};

describe("GenericTable test", () => {
  it("should render the table with correct headers", () => {
    render(<GenericTable {...sampleData} />);
    debug();
    sampleData.columns.forEach((column) => {
      expect(
        screen.getByTestId(`${column.header.toLowerCase().replace(" ", "-")}`)
      ).toBeDefined();
    });
    expect(screen).toMatchSnapshot();
  });
});
