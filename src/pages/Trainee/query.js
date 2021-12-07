import { gql } from '@apollo/client';

const GET_ALL_USER = gql`
query GetAllUser($skip: Int!, $limit: Int!) {
  getAllUser(skip: $skip, limit: $limit) {
   total
   data {
     name
     email
     createdAt
     originalId
   }
  }
}
`;
export {
  GET_ALL_USER,
};
