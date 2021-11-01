import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { StyledTableRow } from './style';

const GenericTable = (props) => {
  const {
    id, columns, data, columnHeadingColor, orderBy, sort, order, select,
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
                <TableSortLabel
                  active={orderBy === column.field}
                  direction={order}
                  onClick={() => sort(column.field)}
                >
                  {column.label ? column.label : column.field}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              {columns.map((column) => {
                const value = row[column.field];
                return (
                  <TableCell key={`${row.id}${column.field}`} onClick={() => select(row.id)} align={column.align}>
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

GenericTable.defaultProps = {
  columnHeadingColor: '#000',
  orderBy: '',
  order: 'asc',
};

GenericTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnHeadingColor: PropTypes.string,
  orderBy: PropTypes.string,
  sort: PropTypes.func.isRequired,
  order: PropTypes.string,
  select: PropTypes.func.isRequired,
};

export default GenericTable;
