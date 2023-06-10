import { graphQLRequest } from "./util/graphql";

export async function getCurrentIssue() {
    const graphqlQuery = `
    query MyQuery {
        magazinesEntries(limit: 1, orderBy: "dateCreated", inReverse: true) {
            ... on magazines_default_Entry {
            id
            issueNumber
            magazine {
                path
            }
            }
        }
    }`;
    const magazines = (await graphQLRequest(graphqlQuery)).data.magazinesEntries;
    console.log(magazines);
    return magazines;
}
