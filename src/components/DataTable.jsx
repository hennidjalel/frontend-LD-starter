import PropTypes from 'prop-types';
import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import {CardContent } from "@mui/material";
export default function DataTable({data, columns}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
      <>
        {/* Table Content */}
        <CardContent>
          <TableContainer component={Paper} className="">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                {columns.map((column)=>(
                  <TableCell key={column.key}>{column.header}</TableCell>
                ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                .slice(page*rowsPerPage, (page + 1)*rowsPerPage)
                .map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((column) => (
                            <TableCell key={column.key}>{row[column.key]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
        {/* Table Pagination */}
        <CardContent>
          <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </CardContent>
      </>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
      PropTypes.shape({
          key: PropTypes.string.isRequired,
          header: PropTypes.string.isRequired,
      })
  ).isRequired,
};
