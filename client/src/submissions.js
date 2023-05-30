import { graphQLRequest } from "./util/graphql";

export async function getSubmissions() {
    console.log("getSubmissions");
    const graphqlQuery = `
    query getSubmissions {
        submissionsEntries {
            ... on submissions_default_Entry {
                id
                title
            }
        }
    }`;
    const submissions = (await graphQLRequest(graphqlQuery)).data.submissionsEntries;
    console.log(submissions);
    return submissions;
}