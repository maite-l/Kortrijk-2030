import { graphQLRequest } from "./util/graphql";

export async function getSubmissions() {
    console.log("getSubmissions");
    const graphqlQuery = `
    query MyQuery {
    submissionsEntries {
        ... on submissions_mixedSubmission_Entry {
        id
        title
        text
        image {
            path
        }
        }
    }
    }`;
    const submissions = (await graphQLRequest(graphqlQuery)).data.submissionsEntries;
    console.log(submissions);
    return submissions;
}

export async function getMagazines() {
    const graphqlQuery = `
    query MyQuery {
        magazinesEntries {
            ... on magazines_default_Entry {
            id
            magazine {
                path
            }
            }
        }
    }`;
    const magazines = (await graphQLRequest(graphqlQuery)).data.magazinesEntries;
    return magazines;
}