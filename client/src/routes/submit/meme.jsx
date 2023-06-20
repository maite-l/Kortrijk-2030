import { useLoaderData } from 'react-router-dom';
import { useContext, useState } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission, getOpenIssue } from "../../submissions";

import { fileInputChange } from '../../util/util';
import SubmitForm from '../../components/submission//SubmitForm';
import ProgressTracker from '../../components/submission/ProgressTracker';
import SubmitOverview from '../../components/submission/SubmitOverview';
import Confirmation from '../../components/submission/Confirmation';

//variables
let imgNamesResult = [];
let imgStringsResult = [];

export async function loader() {

    //get open issue date
    const openIssue = await getOpenIssue();
    const openIssueDate = openIssue.issueDate;

    console.log(openIssue);

    return {
        openIssueDate
    };

}

export async function action({ request }) {
    try {
        // Submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        const inputFields = document.querySelectorAll('input, textarea');
        inputFields.forEach(inputField => inputField.disabled = true);

        let imgIds = [];
        //create image assets
        const imageAssetPromises = imgNamesResult.map(async (imgName, index) => {
            console.log(imgName);
            console.log(imgNamesResult[index]);
            const imgAsset = await newImageAsset(imgName, imgStringsResult[index]);
            imgIds.push(imgAsset.id);
            console.log(imgIds);
        });

        //wait for all the assets to be made
        await Promise.all(imageAssetPromises);

        console.log(imgNamesResult);
        console.log(imgStringsResult);

        //get form data
        const formData = await request.formData();
        const { title, text, info } = Object.fromEntries(formData);
        console.log(title, text, info);

        //get magazine section
        const category = await getMagazineSectionByTitle('Memes');
        const magazineSection = category[0].id;
        console.log(magazineSection);

        // get issue number 
        const openIssue = await getOpenIssue();
        const issueNumber = openIssue.issueNumber;
        console.log(issueNumber);

        // Get authentication info
        let userId;
        let jwt;
        if (localStorage.getItem('jwt') === null) {
            userId = 880;
            jwt = null;
        } else {
            jwt = localStorage.getItem('jwt');
            const user = JSON.parse(localStorage.getItem('user'));
            userId = user.id;
        }

        //create submission
        const submission = await newSubmission(title, text, info, imgIds, magazineSection, issueNumber, userId, jwt);
        console.log(submission);
        return submission;
    } catch (error) {
        console.error(error);
        alert('Error submitting article. Please try again.');
    }
}

export default function Meme() {

    //loader variables
    const { openIssueDate } = useLoaderData();

    //global context
    const { maxImgCount, maxImgSizeInMb } = useContext(GlobalContext);

    const [submitState, setSubmitState] = useState('form');

    const [formTitle, setFormTitle] = useState('');

    //update variables every time files are uploaded
    const handleFileInputChange = (event) => {
        const fileInputResult = fileInputChange(event, maxImgCount, maxImgSizeInMb);
        const imgNames = fileInputResult ? fileInputResult.imgNames : [];
        const imgStrings = fileInputResult ? fileInputResult.imgStrings : [];
        imgNamesResult = imgNames;
        imgStringsResult = imgStrings;
    };

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setFormTitle(newTitle);
    };

    const showOverview = (event) => {
        event.preventDefault();

        const { title } = event.target.elements;

        setFormTitle(title.value);

        setSubmitState('overview');
    }

    return (
        <main className={`submitting-page ${submitState === 'confirmation' ? 'confirmation' : ''}`}>

            {/* <ProgressTracker submitState={submitState} /> */}

                {submitState === 'form' && (
                    <SubmitForm
                        title={'Submit your meme'}
                        submissionTips={'Here you can submit your meme(s). Just keep it culture-related and / or local to Kortrijk / Flanders / Belgium. And don’t be too edgy...'}
                        formTitlePlaceholder={'Flemish humour be like...'}
                        reply={false}
                        includeText={false}
                        includeImages={true}
                        requireImages={true}
                        handleFileInputChange={handleFileInputChange}
                        handleSubmit={showOverview}
                        titleValue={formTitle}
                        handleTitleChange={handleTitleChange}
                        submitState={submitState}
                    />
                )}
                {submitState === 'overview' && (
                    <SubmitOverview
                        imgStringsResult={imgStringsResult}
                        imgNamesResult={imgNamesResult}
                        formTitle={formTitle}
                        setSubmitState={setSubmitState}
                        submitState={submitState}
                    />
                )}
                {submitState === 'confirmation' && (
                    <Confirmation typeOfSubmission={'meme'} openIssueDate={openIssueDate} />
                )}


        </main>
    );
}
