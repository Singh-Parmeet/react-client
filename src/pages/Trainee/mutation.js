import { gql } from '@apollo/client';

const CREATE_USER = gql`
mutation Create_User($name: String!, $email: String!, $role: String!) {
  createUser(payload: {name: $name, email: $email, role:$role}) {
    message
  }
}
`;
const UPDATE_USER = gql`
mutation UpdateUser($originalId: String!, $editedName: String!, $editedEmail: String!, $role: String!){
  updateUser(payload: {originalId: $originalId, name: $editedName, email: $editedEmail, role: $role}){
        message,
        status
    }
}
`;

const DELETE_USER = gql`
mutation DeleteUser($deletedOriginalId: String!){
    deleteUser(payload: {originalId: $deletedOriginalId}){
        message,
        status
    }
}
`;
export { CREATE_USER, UPDATE_USER, DELETE_USER };
