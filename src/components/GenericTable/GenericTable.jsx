import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const GenericTable = (props) => {
  const {
    id, columns, data, columnHeadingColor,
  } = props;
  return (
    <TableContainer component={Paper} margin={5}>
      <Table>
        <TableHead>
          <TableRow key={id}>
            {columns.map((column) => (
              <TableCell
                sx={{ color: columnHeadingColor }}
                key={column.field}
                align={column.align}
              >
                {column.label ? column.label : column.field}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => {
                const value = row[column.field];
                return (
                  <TableCell key={row.id} align={column.align}>
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

GenericTable.defaultProps = {
  columnHeadingColor: '#000',
};

GenericTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnHeadingColor: PropTypes.string,
};

export default GenericTable;
