import { Form, redirect } from 'react-router-dom';
import { useState } from 'react';

import { getMagazineSectionByTitle, newImageAsset, newMixedSubmission } from "../../submissions";

let imgName;
let imgString;

export async function action({ request }) {
    const category = await getMagazineSectionByTitle('meme');
    const magazineSection = category[0].id;
    console.log(magazineSection);

    const imgAsset = await newImageAsset(imgName, imgString);
    const imgId = imgAsset.id;
    console.log(imgId);

    const formData = await request.formData();
    const { title, text } = Object.fromEntries(formData);
    console.log(title, text);

    const submission = await newMixedSubmission(title, text, imgId, magazineSection);
    console.log(submission);
    throw redirect("/submit");
}

export default function Meme() {

    const [base64String, setBase64String] = useState('');
    const [filename, setFilename] = useState('');

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader(); // -> web api

        reader.onloadend = () => {
            const base64String = reader.result;
            setBase64String(base64String);
            const filename = event.target.files[0].name;
            setFilename(filename);

            console.log(base64String);
            console.log(filename);

            imgName = filename;
            imgString = base64String;
        };

        reader.readAsDataURL(file);
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