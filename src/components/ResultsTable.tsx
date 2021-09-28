import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";
import { Prisma } from ".prisma/client";
import React from "react";

function ResultsTable({ feedback }) {
  const data = React.useMemo(() => feedback, [feedback]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
      },
      {
        Header: "Score",
        accessor: "score",
      },
      {
        Header: "Comment",
        accessor: "comment",
      },
      {
        Header: "Username",
        accessor: "username",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th
                key={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default ResultsTable;
