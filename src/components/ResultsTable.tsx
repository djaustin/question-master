import { Feedback } from ".prisma/client";
import {
  Box,
  HStack,
  SpacerProps,
  Text,
  useColorModeValue,
  Tooltip,
  IconButton,
  Table,
  Thead,
  VStack,
  Th,
  Tr,
  chakra,
  Tbody,
  Td,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { default as React, useMemo, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from "react-table";
import useSWR from "swr";
import { Response } from "../models/response";
import { ScoreCard } from "./ScoreCard";
import NumberRangeColumnFilter from "./tableFilters/NumberRangeColumnFilter";
import TextFilter from "./tableFilters/TextFilter";
import fetcher from "../integrations/jsonFetcher";
import { ChevronLeftIcon, ChevronRightIcon, TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import GlobalTableFilter from "./tableFilters/GlobalTableFilter";

export type ColumnTitle = "Date" | "Score" | "Comment" | "Username" | "Address";

export type ResultsTableProps = {
  canFilter?: boolean;
  globalFilter?: boolean;
  hiddenColumns?: ColumnTitle[];
  dateRange?: string;
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
  dateRange,
  ...spacerProps
}: ResultsTableProps) {

  const [data, setData] = useState<Feedback[]>([]);
  const [count, setCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);

  const { data: paginatedData, error } = useSWR(`/api/feedback/?skip=${(pageIndex -1) * 5}${dateRange ? `&${dateRange}` : ""}`, fetcher);

  useEffect(() => {
    if(paginatedData){
      setData(paginatedData);
    }
  }, [paginatedData]);
  
  const { data: pCount, error: pCountError } = useSWR(`/api/count${dateRange ? `/?${dateRange}` : ""}`, fetcher);

  useEffect(() => {
    if(pCount){
      setCount(pCount);
    }
  }, [pCount]);

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
    pageOptions,
  } = useTable(
    { columns, data, defaultColumn, manualPagination: true, pageCount: Math.ceil(count / 5)},
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
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
      {data ? <Tbody {...getTableBodyProps()}>
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
        </Tbody> : <Text>Loading...</Text>}
    </Table>
     <HStack justifyContent="flex-end" mt={1}>
    <Tooltip label="Previous Page">
      <IconButton
        aria-label="previous page"
        onClick={() => setPageIndex(pageIndex - 1)}       
        isDisabled={pageIndex === 1}
        icon={<ChevronLeftIcon h={6} w={6} />}
      />
    </Tooltip>
    <Text aria-label="page-range-available">
      Page{" "}
      <Text fontWeight="bold" as="span">
        {pageIndex}{" "}
      </Text>
      of{" "}
      <Text fontWeight="bold" as="span">
        {pageOptions.length}
      </Text>
    </Text>
    <Tooltip label="Next Page">
        <IconButton
          aria-label="next page"
          onClick={() => setPageIndex(pageIndex + 1)}              
          isDisabled={pageIndex === pageOptions.length}
          icon={<ChevronRightIcon h={6} w={6} />}
        />
    </Tooltip>
  </HStack>
  </Box>
  );
}

export default ResultsTable;
