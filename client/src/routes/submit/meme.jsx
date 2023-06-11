import { Form, redirect } from 'react-router-dom';
import { useContext } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission } from "../../submissions";

import { fileInputChange } from '../../util/util';

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
        const { title, text } = Object.fromEntries(formData);
        console.log(title, text);

        //get magazine section
        const category = await getMagazineSectionByTitle('Memes');
        const magazineSection = category[0].id;
        console.log(magazineSection);

        //create submission
        const submission = await newSubmission(title, text, imgIds, magazineSection);
        console.log(submission);
        return redirect("/submit");
    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Meme() {

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
        <div>
            <h1>Submit your meme/joke</h1>
            <div>
                <h2>Submission tips</h2>
                <p>***submission tips***</p>
            </div>
            <Form method="post">
                <label htmlFor="title">
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="placeholder"
                    />
                </label>
                <label htmlFor="image">
                    <span>Image</span>
                    <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                        multiple
                        onChange={handleFileInputChange}
                    />
                </label>
                <label htmlFor="text">
                    <span>A caption for your meme or just a joke</span>
                    <textarea
                        rows="4"
                        cols="50"
                        name="text"
                        placeholder="placeholder"
                        style={{ resize: "none" }}
                    />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}