import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import matchers from "@testing-library/jest-dom";
import GenericTable from "../components/GenericTable";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { IconButton } from "@mui/material";
import { useState } from "react";
import DrawerComponent from "../components/DrawerComponent";
import PolicyDetailDrawerChildren from "../pages/PortfolioItem/DrawerChildren/PolicyDetailDrawerChildren";
expect.extend(matchers);

const sampleData = {
  columns: [
    {
      header: "Polisnummer",
      accessor: "external_number",
      align: "left" as const,
    },
    //... other columns
    {
      header: "",
      accessor: "",
      align: "right" as const,
      cell: (row: any) => {
        const [open, setOpen] = useState(false);

        return (
          <>
            <IconButton
              onClick={() => setOpen(!open)}
              data-testid="chevron-right"
            >
              <ChevronRight />
            </IconButton>
            <DrawerComponent
              width={0}
              open={open}
              setOpen={setOpen}
              title="PolicyDetailDrawer"
            >
              {PolicyDetailDrawerChildren(row, name)}
            </DrawerComponent>
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
    //... other rows
  ],
};

describe("GenericTable test", () => {
  it("should render the table with correct headers", () => {
    render(<GenericTable {...sampleData} />);

    sampleData.columns.forEach((column) => {
      expect(
        screen.getByTestId(`${column.header.toLowerCase().replace(" ", "-")}`)
      ).toBeDefined();
    });
  });
});
