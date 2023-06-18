import { Form, redirect } from 'react-router-dom';
import { useContext, useState } from 'react';

//global context
import { GlobalContext } from '../root';

//submission queries and mutations
import { getMagazineSectionByTitle, newImageAsset, newSubmission, getOpenIssue } from "../../submissions";

import { fileInputChange } from '../../util/util';
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
        return redirect("/submit");
    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Meme() {

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
        <main className='submitting-page'>
            <div className='progress-tracker'>
                <div className="progress-tracker__item progress-tracker__item--completed">
                    <div className='progress-tracker__item__number'>1</div>
                    <div className='progress-tracker__item__text'>Your submission</div>
                </div>
                <div className={`progress-tracker__item${submitState === 'overview' ? ' progress-tracker__item--completed' : ''}`}>
                    <div className='progress-tracker__item__number'>2</div>
                    <div className='progress-tracker__item__text'>Confirm</div>
                </div>
            </div>
            <div className='content'>
                {submitState === 'form' && (
                    <SubmitForm
                        title={'Submit your meme'}
                        submissionTips={'Here you can submit your meme(s). Just keep it culture-related and / or local to Kortrijk / Flanders / Belgium. And don’t be too edgy...'}
                        formTitlePlaceholder={'My amazing concept art'}
                        formTextLabel={'Description'}
                        formTextPlaceholder={'This piece of art has been designed by me for a school project with a theme “armour knights”. I’ve been a freelance artist for 2 years. Btw, I’m available for hire, contact me here...'}
                        reply={false}
                        includeText={false}
                        includeImages={true}
                        handleFileInputChange={handleFileInputChange}
                        handleSubmit={showOverview}
                        titleValue={formTitle}
                        handleTitleChange={handleTitleChange}
                    />
                )}
                {submitState === 'overview' && (
                    <div className='submit-overview'>
                        <h1>Submission preview</h1>
                        <div className='submission__overview'>
                            {imgStringsResult.length > 0 && (
                                <div className='submission__overview--images'>
                                    {imgStringsResult.map((imgString, index) => (
                                        <img key={index} src={imgString} alt={imgNamesResult[index]} className='submission__overview--image' />
                                    ))}
                                </div>
                            )}
                            <div className='submission__overview--info'>
                                {formTitle && (
                                    <p className='submission__overview--title'>{formTitle}</p>
                                )}
                            </div>
                        </div>

                        <div className='overview-buttons'>
                            <button onClick={() => setSubmitState('form')}>Edit</button>
                            <Form method='post'>
                                {/* hidden fields to carry over data */}
                                <input type="hidden" name="title" value={formTitle} />
                                <button type="submit">Submit</button>
                            </Form>
                        </div>


                    </div>
                )}
            </div>

        </main>
    );
}
