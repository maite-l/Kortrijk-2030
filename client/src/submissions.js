import { graphQLRequest } from "./util/graphql";

// export async function getSubmissions() {
//     const graphqlQuery = `
//     query MyQuery {
//     submissionsEntries {
//         ... on submissions_mixedSubmission_Entry {
//         id
//         title
//         text
//         image {
//             path
//         }
//         }
//     }
//     }`;
//     const submissions = (await graphQLRequest(graphqlQuery)).data.submissionsEntries;
//     console.log(submissions);
//     return submissions;
// }

// export async function getMagazines() {
//     const graphqlQuery = `
//     query MyQuery {
//         magazinesEntries {
//             ... on magazines_default_Entry {
//             id
//             magazine {
//                 path
//             }
//             }
//         }
//     }`;
//     const magazines = (await graphQLRequest(graphqlQuery)).data.magazinesEntries;
//     console.log(magazines);
//     return magazines;
// }



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


// edit authorId when we have a user system
export async function newTextSubmission(title, text, magazineSection) {
    console.log(title, text, magazineSection);
    const graphqlQuery = `
    mutation NewTextSubmission($title: String, $text: String, $magazineSection: [Int]) {
        save_submissions_textSubmission_Entry(
            title: $title
            text: $text
            magazineSection: $magazineSection
            authorId: 1
        ) {
            id
        }
    }`;

    const submission = (await graphQLRequest(
        graphqlQuery,
        { title: title, text: text, magazineSection: parseInt(magazineSection) }
    )).data.save_submissions_textSubmission_Entry;
    console.log(submission);
    return submission;
}

export async function newPollSubmission(title, text, magazineSection, issueNumber) {
    console.log(issueNumber)
    console.log(title, text, magazineSection, issueNumber);
    const graphqlQuery = `
    mutation NewPollSubmission($title: String, $text: String, $magazineSection: [Int], $issueNumber: Number) {
        save_submissions_textSubmission_Entry(
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
    )).data.save_submissions_textSubmission_Entry;
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

export async function newImageSubmission(title, imgIds, magazineSection) {
    const ImgIdsIntArray = imgIds.map(id => parseInt(id));

    const graphqlQuery = `
    mutation NewImgSubmission($title: String, $image: [Int], $magazineSection: [Int]) {
        save_submissions_imageSubmission_Entry(
            title: $title
            image: $image
            magazineSection: $magazineSection
            authorId: 1
        ) {
            id
        }
        }
    `;
    const submission = (await graphQLRequest(
        graphqlQuery,
        { title: title, image: ImgIdsIntArray, magazineSection: parseInt(magazineSection) }
    )).data.save_submissions_imageSubmission_Entry;
    console.log(submission);
    return submission;
}


export async function newMixedSubmission(title, text, imgIds, magazineSection) {
    const ImgIdsIntArray = imgIds.map(id => parseInt(id));

    const graphqlQuery = `
    mutation NewSubmissionAsset($title: String, $image: [Int], $text: String, $magazineSection: [Int]) {
        save_submissions_mixedSubmission_Entry(
            title: $title
            image: $image
            text: $text
            magazineSection: $magazineSection
            authorId: 1
        ) {
            id
        }
    }
    `;
    const submission = (await graphQLRequest(
        graphqlQuery,
        { title: title, image: ImgIdsIntArray, text: text, magazineSection: parseInt(magazineSection) }
    )).data.save_submissions_mixedSubmission_Entry;
    console.log(submission);
    return submission;
}

