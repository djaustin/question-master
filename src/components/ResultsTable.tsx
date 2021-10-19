import { Feedback } from ".prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
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
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { default as React, useMemo, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import useSWR from "swr";
import { Response } from "../models/response";
import { ScoreCard } from "./ScoreCard";
import GlobalTableFilter from "./tableFilters/GlobalTableFilter";
import NumberRangeColumnFilter from "./tableFilters/NumberRangeColumnFilter";
import TextFilter from "./tableFilters/TextFilter";
import fetcher from "../integrations/jsonFetcher";

export type ColumnTitle = "Date" | "Score" | "Comment" | "Username" | "Address";

export type ResultsTableProps = {
  canFilter?: boolean;
  globalFilter?: boolean;
  hiddenColumns?: ColumnTitle[];
  count: number;
  dateRange?: [Date, Date];
} & SpacerProps;

const scoreMap: { [key: number]: Response } = {
  1: "very unhappy",
  2: "unhappy",
  3: "neutral",
  4: "happy",
  5: "very happy",
};

function ResultsTable({
  canFilter,
  globalFilter,
  hiddenColumns,
  count,
  dateRange,
  ...spacerProps
}: ResultsTableProps) {

  let isoRange: string[];
  let dateRangeParam = "";
  if(dateRange){
    isoRange = dateRange.map((date) => date?.toISOString());
    dateRangeParam = `?dateRange=${isoRange.join(",")}/`;
  }

  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [skipUrl, setSkipUrl] = useState("0");

  const { data: paginatedData, error } = useSWR(`/api/feedback/${dateRangeParam}?skip=${skipUrl}`, fetcher);

  console.log(data);

  useEffect(() => {
    if(paginatedData){
      // const memoData = React.useMemo(() => paginatedData, [paginatedData]);
      setData(paginatedData);
    }
  }, [paginatedData]);

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
              display="inline-flex"
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
      {
        Header: "Address",
        accessor: "device.ip",
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
    rows,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, defaultColumn, initialState: { pageIndex: 0 }, manualPagination: true, pageCount: Math.ceil(count / 5)},
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  useEffect(() => {
    setSkipUrl(`${pageIndex * 5}`);
  }, [pageIndex]);

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
      <HStack justifyContent="flex-end" mt={1}>
        <Tooltip label="Previous Page">
          <IconButton
            aria-label="previous page"
            onClick={() => previousPage()}       
            isDisabled={!canPreviousPage}
            icon={<ChevronLeftIcon h={6} w={6} />}
          />
        </Tooltip>
        <Text>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {pageIndex + 1}{" "}
          </Text>
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageOptions.length}
          </Text>
        </Text>
        <Tooltip label="Next Page">
            <IconButton
              aria-label="next page"
              onClick={() => nextPage()}              
              isDisabled={!canNextPage}
              icon={<ChevronRightIcon h={6} w={6} />}
            />
        </Tooltip>
      </HStack>
    </Box>
  );
}

export default ResultsTable;
