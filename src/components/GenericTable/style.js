import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

export const StyledTableHeading = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.grey[500],
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({

  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '& thead th': {
    color: '#928d8d',
  },
  '&': {
    cursor: 'pointer',
  },
}));
