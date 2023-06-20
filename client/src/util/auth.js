import { graphQLRequest } from './graphql';

export async function authenticate(email, password) {
  const { data, errors } = await graphQLRequest(`
    mutation AuthenticateMutation($email: String!, $password: String!) {
        authenticate(email: $email, password: $password) {
            jwt
            user {
                id
                email
            }
        }
    }
    `, {
    email,
    password,
  }
  );
  console.log(data);
  console.log(errors);
  return data.authenticate;
}

export async function register(email, username, password) {
  const { data } = await graphQLRequest(`
    mutation Register($email: String!, $username: String!, $password: String!) {
      register(email: $email, fullName: $username, password: $password) {
        user {
          id
        }
        jwt
      }
    }
  `, {
    email,
    username,
    password,
  });

  return data.register;
}

export async function getUserInfoByUserId(id) {
  const graphqlQuery = `
  query getUserInfoByUserId($userId: [QueryArgument]) {
    user(id: $userId) {
      fullName
      email
    }
  }
  `;
  const user = (await graphQLRequest(
    graphqlQuery,
    { userId: id }
  )).data.user;
  console.log(user);
  return user;
}

