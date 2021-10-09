import { Feedback } from ".prisma/client";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  HStack,
  SpacerProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { default as React, useMemo } from "react";
import { FiUser } from "react-icons/fi";
import { useFilters, useGlobalFilter, useSortBy, useTable } from "react-table";
import { Response } from "../models/response";
import { ScoreCard } from "./ScoreCard";
import GlobalTableFilter from "./tableFilters/GlobalTableFilter";
import NumberRangeColumnFilter from "./tableFilters/NumberRangeColumnFilter";
import TextFilter from "./tableFilters/TextFilter";

export type ColumnTitle = "Date" | "Score" | "Comment" | "Username";

export type ResultsTableProps = {
  feedback: Feedback[];
  canFilter?: boolean;
  globalFilter?: boolean;
  hiddenColumns?: ColumnTitle[];
} & SpacerProps;

const scoreMap: { [key: number]: Response } = {
  1: "very unhappy",
  2: "unhappy",
  3: "neutral",
  4: "happy",
  5: "very happy",
};

function ResultsTable({
  feedback,
  canFilter,
  globalFilter,
  hiddenColumns,
  ...spacerProps
}: ResultsTableProps) {
  const data = React.useMemo(() => feedback, [feedback]);

  const columns = React.useMemo(() => {
    const columns = [
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
        Cell: ({ value }) => (
          <ScoreCard variant={scoreMap[value]}>{value}</ScoreCard>
        ),
      },
      {
        Header: "Comment",
        accessor: "comment",
        Cell: ({ value }) => (
          <Box maxW="500px" maxH="60px" overflow="auto">
            {value}
          </Box>
        ),
      },
      {
        Header: "Username",
        accessor: "username",
        Cell: ({ value }) =>
          value && (
            <HStack
              justifyContent="center"
              bg={useColorModeValue("blue.600", "blue.400")}
              px="2"
              borderRadius="md"
              color={useColorModeValue("white", "black")}
            >
              <FiUser />
              <Text fontWeight="bold">{value}</Text>
            </HStack>
          ),
      },
    ];
    if (!hiddenColumns) return columns;
    else
      return columns.filter(
        (col) => !hiddenColumns?.includes(col.Header as ColumnTitle)
      );
  }, [hiddenColumns]);

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
    <Box {...spacerProps}>
      {canFilter && globalFilter && (
        <GlobalTableFilter
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
          preGlobalFilteredRows={preGlobalFilteredRows}
        />
      )}
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
                      {canFilter && column.canFilter
                        ? column.render("Filter")
                        : null}
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
    </Box>
  );
}

export default ResultsTable;
