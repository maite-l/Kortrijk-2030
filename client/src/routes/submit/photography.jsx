import { redirect } from 'react-router-dom';
import { useContext } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission } from "../../submissions";

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
        const category = await getMagazineSectionByTitle('Photography');
        const magazineSection = category[0].id;
        console.log(magazineSection);

        //create submission
        const submission = await newSubmission(title, text, info, imgIds, magazineSection);
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
                title={'Submit your photography'}
                submissionTips={'Here you can submit your amazing photography: personal project, portrait photoshoot, commercial work -it’s up to you (maybe nothing NSFW though). Make sure it’s high quality - we’re more likely to publish it then :-) Feel free to write a little intro about yourself too and / or the project too!'}
                formTitlePlaceholder={'My amazing photoshoot'}
                formTextLabel={'Description'}
                formTextPlaceholder={'This was a professional project I did for my portfolio when I was starting with photography...'}
                reply={false}
                includeText={true}
                includeImages={true}
                handleFileInputChange={handleFileInputChange}
                includeNotesForEditor={true}
                notesForEditorPlaceholder={'Hi, is it possible to have this specific layout for my pictures on the page:...'}
            />

        </main>
    );
}