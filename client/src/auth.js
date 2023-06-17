import { graphQLRequest } from './util/graphql';

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