import { graphQLRequest, authenticatedGraphQLRequest } from "./util/graphql";

export async function newSubmission(title, text, extraInfo, imgIds, magazineSection, issueNumber, userId, jwt) {

    // console.log(title, text, extraInfo, imgIds, magazineSection, issueNumber, userId, jwt);
    console.log(title)
    console.log(text)
    console.log(extraInfo)
    console.log(imgIds)
    console.log(magazineSection)
    console.log(issueNumber)
    console.log(userId)
    console.log(jwt)
    let ImgIdsIntArray = [];
    if (imgIds.length !== 0) {
        ImgIdsIntArray = imgIds.map(id => parseInt(id));
    }

    const graphqlQuery = `
    mutation NewSubmissionAsset($title: String, $image: [Int], $text: String, $extraInfo: String, $magazineSection: [Int], $issueNumber: Number, $authorId: ID) {
        save_submissions_default_Entry(
            title: $title
            image: $image
            text: $text
            extraInfo: $extraInfo
            magazineSection: $magazineSection
            issueNumber: $issueNumber
            authorId: $authorId
        ) {
            id
        }
    }
    `;

    if (jwt === null) {
        const submission = (await graphQLRequest(
            graphqlQuery,
            { title: title, image: ImgIdsIntArray, text: text, extraInfo: extraInfo, issueNumber: issueNumber, magazineSection: parseInt(magazineSection), authorId: userId }
        )).data.save_submissions_default_Entry;
        console.log(submission);
        return submission;
    }
    else {
        const submission = (await authenticatedGraphQLRequest(
            graphqlQuery,
            { title: title, image: ImgIdsIntArray, text: text, extraInfo: extraInfo, issueNumber: issueNumber, magazineSection: parseInt(magazineSection), authorId: userId },
            jwt
        )).data.save_submissions_default_Entry;
        console.log(submission);
        return submission;
    }

}

export async function newPollSubmission(title, text, magazineSection, issueNumber) {

    console.log(title, text, magazineSection, issueNumber);
    const graphqlQuery = `
    mutation NewPollSubmission($title: String, $text: String, $magazineSection: [Int], $issueNumber: Number) {
        save_submissions_default_Entry(
            title: $title
            text: $text
            magazineSection: $magazineSection
            authorId: 1
            issueNumber: $issueNumber
        ) {
            id
        }
    }
    `;

    const submission = (await graphQLRequest(
        graphqlQuery,
        { title: title, text: text, magazineSection: parseInt(magazineSection), issueNumber: parseInt(issueNumber) }
    )).data.save_submissions_default_Entry;
    console.log(submission);
    return submission;
}

export async function newImageAsset(filename, base64String) {
    const graphqlQuery = `
    mutation NewSubmissionAsset($fileData: String, $fileName: String) {
            save_submissions_Asset(_file: {fileData: $fileData, filename: $fileName}) {
                id
            }
        }
    `;
    const imgAsset = (await graphQLRequest(
        graphqlQuery,
        { fileName: filename, fileData: base64String }
    )).data.save_submissions_Asset;
    console.log(imgAsset);
    return imgAsset;
}

export async function getMagazineSectionByTitle(categoryTitle) {
    const graphqlQuery = `
    query GetMagazineSections($categoryTitle: [String]) {
        categories(title: $categoryTitle) {
            id
        }
    }`;
    const magazineSections = (await graphQLRequest(graphqlQuery, { categoryTitle: categoryTitle })).data.categories;
    console.log(magazineSections);
    return magazineSections;
}

export async function getAllMagazineSections() {
    const graphqlQuery = `
    query getAllMagazineSections {
    categories {
            ... on sections_Category {
                id
                title
                text
                time
                sectionGroup
                slug
            }
        }
    }
    `;
    const magazineSections = (await graphQLRequest(graphqlQuery)).data.categories;
    console.log(magazineSections);
    return magazineSections;
}

export async function getCurrentFeaturedSubmissions(issueNumber) {
    const graphqlQuery = `
    query getCurrentFeaturedSubmissions($issueNumber: [QueryArgument]) {
        submissionsEntries(featured: true, issueNumber: $issueNumber, limit: 3) {
            ... on submissions_default_Entry {
            id
            title
            text
            image {
                id
                path
            }
            pageNumber
            }
        }
    }
    `;
    const featuredSubmissions = (await graphQLRequest(graphqlQuery, { issueNumber: issueNumber })).data.submissionsEntries;
    console.log(featuredSubmissions);
    return featuredSubmissions;
}

export async function getApprovedSubmissions(issueNumber) {
    const graphqlQuery = `
    query MyQuery($issueNumber: [QueryArgument]) {
        submissionsEntries(approvalStatus: "approved", issueNumber: $issueNumber) {
            ... on submissions_default_Entry {
            id
            }
        }
    }
    `;
    const approvedSubmissions = (await graphQLRequest(graphqlQuery, { issueNumber: issueNumber })).data.submissionsEntries;
    console.log(approvedSubmissions);
    return approvedSubmissions;
}

export async function getAllSubmissions() {
    const graphqlQuery = `
    query getAllMagazineSections {
        submissionsEntries {
            ... on submissions_default_Entry {
            id
            }
        }
    }
    `;
    const allSubmissions = (await graphQLRequest(graphqlQuery)).data.submissionsEntries;
    console.log(allSubmissions);
    return allSubmissions;
}

export async function getSubmissonsByUserId(userId) {
    const graphqlQuery = `
    query getSubmissionsById($userId: [QueryArgument]) {
        submissionsEntries(authorId: $userId) {
            ... on submissions_default_Entry {
            id
            title
            magazineSection {
                title
            }
            dateCreated
            text
            image {
                id
                path
            }
            approvalStatus
            issueNumber
            }
        }
    }
    `;
    const submissions = (await graphQLRequest(graphqlQuery, { userId: userId })).data.submissionsEntries;
    console.log(submissions);
    return submissions;
}

export async function getOpenIssue() {
    const graphqlQuery = `
    query getOpenIssueNumber {
        globalSet {
            ... on openIssueNumber_GlobalSet {
            issueNumber
            issueDate
            } 
        }
    }
    `;
    const openIssue = (await graphQLRequest(graphqlQuery)).data.globalSet;
    console.log(openIssue);
    return openIssue;
}





