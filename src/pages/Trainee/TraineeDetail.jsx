import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { getFormattedDate } from '../../helpers/helpers';

const TraineeDetail = ({ location }) => {
  console.log(location);
  const { response } = location.state;
  const { name, email, createdAt } = response;

  return (
    <>
      <Card sx={{ display: 'flex', margin: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <CardMedia
            component="img"
            height="194"
            sx={{ width: 200 }}
            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
            alt="Thumbnail"
          />
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="h4" variant="h4">{name}</Typography>
            <Typography variant="p" component="p">{getFormattedDate(createdAt)}</Typography>
            <Typography component="h6" variant="h6">{email}</Typography>
          </CardContent>
        </Box>
      </Card>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/"><Button variant="contained" sx={{ marginTop: '10px', background: '#ccc' }}>Back</Button></Link>
      </Box>
    </>
  );
};

TraineeDetail.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default TraineeDetail;
