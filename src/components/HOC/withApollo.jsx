/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { ApolloConsumer } from '@apollo/client';

export default (Component) => (props) => {
  <ApolloConsumer>
    {(client) => <Component client={client} {...props} />}
  </ApolloConsumer>;
};
