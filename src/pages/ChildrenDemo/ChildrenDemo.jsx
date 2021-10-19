import React from 'react';
import { Typography } from '@material-ui/core';
import { Math } from '../../components';

const ChildrenDemo = () => (
  <div>
    <p>
      <Math first={7} second={4} operator="+" />
    </p>
    <p>
      <Math first={7} second={3} operator="-" />
    </p>
    <p>
      <Math first={7} second={0} operator="*" />
    </p>
    <p>
      <Math first={7} second={8} operator="/" />
    </p>
    <p>
      <Math first={1} second={0} operator="/" />
    </p>
    <p>
      <Math first={1} second={0} operator="anything" />
    </p>
    <Math first={1} second={4} operator="+">
      {
        ({ first, second, result }) => (
          <Typography variant="h6">
            {`Sum of ${first} and ${second} is ${result}`}
          </Typography>
        )
      }
    </Math>
  </div>
);

export default ChildrenDemo;
