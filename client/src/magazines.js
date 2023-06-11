import { graphQLRequest } from "./util/graphql";

export async function getCurrentIssue() {
    const graphqlQuery = `
    query getCurrentIssue {
        magazinesEntries(limit: 1, orderBy: "dateCreated", inReverse: true) {
                ... on magazines_default_Entry {
                id
                issueNumber
                magazine {
                    path
                }
                articlesToReplyTo {
                    ... on articlesToReplyTo_article_BlockType {
                    id
                    articleTitle
                    }
                }
            }
        }
    }
    `;
    const magazines = (await graphQLRequest(graphqlQuery)).data.magazinesEntries;
    console.log(magazines);
    return magazines;
}
