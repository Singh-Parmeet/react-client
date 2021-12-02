import { gql } from '@apollo/client';

const LOGIN_USER = gql`
mutation LoginUser($email: String!, $password: String!) {
  loginUser(payload: {email:$email, password:$password}){
    data {
      token
    }
  }
}
`;
export {
  LOGIN_USER,
};
