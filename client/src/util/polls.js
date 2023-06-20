import { graphQLRequest } from "./graphql";

export async function getCurrentPoll() {
    const graphqlQuery = `
    query getCurrentPoll {
        pollsEntries(limit: 1, orderBy: "dateCreated", inReverse: true) {
            ... on polls_default_Entry {
            id
            pollOptions {
                ... on pollOptions_option1_BlockType {
                optionName
                voteAmount
                id
                }
                ... on pollOptions_option2_BlockType {
                optionName
                voteAmount
                id
                }
            }
            issueDate
            issueNumber
            }
        }
    }`;
    const poll = (await graphQLRequest(graphqlQuery)).data.pollsEntries[0];
    console.log(poll);
    return poll;
}

export async function updateVoteAmountOne(pollId, voteAmount, optionId) {
    const graphqlQuery = `
    mutation updateVoteAmountOne($id: ID, $voteAmountOne: Number, $optionOneId: ID) {
        save_polls_default_Entry(
            id: $id
            pollOptions: {blocks: {option1: {voteAmount: $voteAmountOne, id: $optionOneId}}}
        ) {
            id
        }
    }
    `;
    const poll = (await graphQLRequest(
        graphqlQuery,
        { id: pollId, voteAmountOne: voteAmount, optionOneId: optionId }
    )).data.save_polls_default_Entry;
    console.log(poll);
    return poll;
}

export async function updateVoteAmountTwo(pollId, voteAmount, optionId) {
    const graphqlQuery = `
    mutation updateVoteAmountTwo($id: ID, $voteAmountTwo: Number, $optionTwoId: ID) {
        save_polls_default_Entry(
            id: $id
            pollOptions: {
            blocks: {
                option2: {
                voteAmount: $voteAmountTwo, 
                id: $optionTwoId
                }
            }
            }) 
        {
            id
        }
    }
    `;
    const poll = (await graphQLRequest(
        graphqlQuery,
        { id: pollId, voteAmountTwo: voteAmount, optionTwoId: optionId }
    )).data.save_polls_default_Entry;
    console.log(poll);
    return poll;
}