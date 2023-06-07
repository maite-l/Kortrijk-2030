import { graphQLRequest } from "./util/graphql";

export async function getSubmissions() {
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
    console.log(magazines);
    return magazines;
}


// edit authorId when we have a user system
export async function newTextSubmission(title, text) {
    console.log(title, text);
    const graphqlQuery = `
    mutation NewTextSubmission($title: String, $text: String) {
        save_submissions_textSubmission_Entry(
            title: $title
            text: $text

            authorId: 1
        ) {
            title
            text
        }
    }`;

    const submission = (await graphQLRequest(
        graphqlQuery,
        { title: title, text: text }
    )).data.save_submissions_textSubmission_Entry;
    console.log(submission);
    return submission;
}


// magazineSection: $magazineSection