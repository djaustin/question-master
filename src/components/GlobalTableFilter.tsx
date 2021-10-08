import {
  Input,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";

export type GlobalTableFilterProps = {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
  preGlobalFilteredRows: any[];
};

const GlobalTableFilter: React.FC<GlobalTableFilterProps> = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  const count = preGlobalFilteredRows.length;
  return (
    <InputGroup>
      <InputLeftAddon>
        <FiSearch />
      </InputLeftAddon>
      <Input
        aria-label="search all columns"
        value={globalFilter || ""}
        onChange={(e) => {
          setGlobalFilter(e.target.value || undefined);
        }}
        placeholder={`Search ${count} results...`}
      />
    </InputGroup>
  );
};

export default GlobalTableFilter;
