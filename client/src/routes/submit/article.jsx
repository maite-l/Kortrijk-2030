import { redirect } from 'react-router-dom';
import { useContext } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission, getOpenIssue } from "../../submissions";

import { fileInputChange } from '../../util/util';

import "../../css/submit-form.css";
import SubmitForm from '../../components/SubmitForm';

//variables
let imgNamesResult = [];
let imgStringsResult = [];

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
        console.log(formData);
        const { title, text, info } = Object.fromEntries(formData);
        console.log(title, text, info);

        //get magazine section
        const category = await getMagazineSectionByTitle('Articles');
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
        return redirect("/submit");
    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Article() {

    //global context
    const { maxImgCount, maxImgSizeInMb } = useContext(GlobalContext);

    //update variables every time files are uploaded
    const handleFileInputChange = (event) => {
        const fileInputResult = fileInputChange(event, maxImgCount, maxImgSizeInMb);
        const imgNames = fileInputResult ? fileInputResult.imgNames : [];
        const imgStrings = fileInputResult ? fileInputResult.imgStrings : [];
        imgNamesResult = imgNames;
        imgStringsResult = imgStrings;
    };

    return (
        <main>

            <SubmitForm
                title={'Submit your article'}
                submissionTips={'Did you discover an amazing place in Kortrijk? Something that fascinates you about living here? Any cultural differences? Delve deep into them and describe them in an article! Make sure to keep it clean with the language;-)'}
                formTitlePlaceholder={'Cornershop of Daydreams: Where Imagination Takes Center Stage'}
                formTextLabel={'Content'}
                formTextPlaceholder={'Located at the junction of Budastraat and Kapucijnenstraat, this unassuming door opens up a world of whimsy and wonder. We see ourselves as a group of creative individuals, more like agency custodians rather than owners, offering our skills to the city and its diverse...'}
                reply={false}
                includeText={true}
                includeImages={true}
                handleFileInputChange={handleFileInputChange}
                includeNotesForEditor={true}
                notesForEditorPlaceholder={'I’m trying to get spotted as a newspaper copywriter. Can you put my email and portfolio together with my article?'}
            />

        </main>
    );
}