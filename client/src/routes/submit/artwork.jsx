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
        const category = await getMagazineSectionByTitle('Artworks');
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
                title={'Submit your artwork / design'}
                submissionTips={'Here you can submit your artworks: digital designs, illustrations, concept art, graphic work - you name it! Make sure it’s high quality - we’re more likely to publish it then :-) Feel free to write a little intro about yourself too!'}
                formTitlePlaceholder={'My amazing concept art'}
                formTextLabel={'Description'}
                formTextPlaceholder={'This piece of art has been designed by me for a school project with a theme “armour knights”. I’ve been a freelance artist for 2 years. Btw, I’m available for hire, contact me here...'}
                reply={false}
                includeImages={true}
                handleFileInputChange={handleFileInputChange}
            />

        </main>
    );
}