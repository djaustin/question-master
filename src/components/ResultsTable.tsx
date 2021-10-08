import { Feedback } from ".prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  SpacerProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { default as React, useMemo } from "react";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import GlobalTableFilter from "./tableFilters/GlobalTableFilter";
import NumberRangeColumnFilter from "./tableFilters/NumberRangeColumnFilter";
import TextFilter from "./tableFilters/TextFilter";

export type ResultsTableProps = {
  feedback: Feedback[];
} & SpacerProps;

function ResultsTable({ feedback, ...spacerProps }: ResultsTableProps) {
  const data = React.useMemo(() => feedback, [feedback]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => dayjs(value).format("DD-MM-YYYY HH:mm:ss"),
      },
      {
        Header: "Score",
        accessor: "score",
        Filter: NumberRangeColumnFilter,
        filter: "between",
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

  const defaultColumn = useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <GlobalTableFilter
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
        preGlobalFilteredRows={preGlobalFilteredRows}
      />
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th
                  verticalAlign="top"
                  fontSize="medium"
                  key={column.id}
                  {...column.getHeaderProps()}
                >
                  <VStack align="start" justify="start">
                    <Box {...column.getSortByToggleProps()}>
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
                    </Box>
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </VStack>
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
    </>
  );
}

export default ResultsTable;
