import { gql } from '@apollo/client';

const TRAINEE_UPDATED_SUBSCRIPTION = gql`
  subscription {
    userUpdated {
      message
      data {
        originalId
        name
        email
        role
      }
      status
    }
  }
`;

const TRAINEE_DELETED_SUBSCRIPTION = gql`
  subscription {
    userDeleted {
      message
      originalId
      status
  }
}
`;
export
{ TRAINEE_UPDATED_SUBSCRIPTION, TRAINEE_DELETED_SUBSCRIPTION };
