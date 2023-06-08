import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ChevronRight from "@mui/icons-material/ChevronRight";
import DrawerComponent from "./DrawerComponent";
import PolicyDetailDrawerChildren from "../pages/PortfolioItem/DrawerChildren/PolicyDetailDrawerChildren";

export type Column = {
  header: string;
  accessor: string;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  cell?: (row: any) => JSX.Element;
  style?: React.CSSProperties; // Add this line
};

export type GenericTableProps = {
  tableContent: any[];
  columns: Column[];
};

const GenericTable = ({ tableContent, columns }: GenericTableProps) => {
  return (
    <TableContainer sx={{ width: "100%" }} data-testid="policy-list">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ height: "3rem" }}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                padding="none"
                sx={{ fontWeight: "600" }}
                align={
                  column.align ||
                  (index === columns.length - 1 ? "right" : "left")
                }
                data-testid={column.header.toLowerCase()}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableContent?.map((content: any) => (
            <TableRow
              key={content.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  padding="none"
                  component="th"
                  scope="row"
                  align={
                    column.align ||
                    (index === columns.length - 1 ? "right" : "left")
                  }
                  sx={{ py: "0.5rem" }}
                  data-testid={`${column.header.toLowerCase()}-row`}
                >
                  {column.cell
                    ? column.cell(content)
                    : content[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GenericTable;
