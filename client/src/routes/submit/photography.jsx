import { Form, redirect } from 'react-router-dom';
import { useContext } from 'react';

import { GlobalContext } from '../root';

import { getMagazineSectionByTitle, newImageAsset, newImageSubmission } from "../../submissions";

let imgNames = [];
let imgStrings = [];

export async function action({ request }) {

    let imgIds = [];
    const imageAssetPromises = imgNames.map(async (imgName, index) => {
        console.log(imgName);
        console.log(imgStrings[index]);
        const imgAsset = await newImageAsset(imgName, imgStrings[index]);
        imgIds.push(imgAsset.id);
        console.log(imgIds);
    });

    await Promise.all(imageAssetPromises);

    console.log(imgNames);
    console.log(imgStrings);

    const formData = await request.formData();
    const { title } = Object.fromEntries(formData);
    console.log(title);

    const category = await getMagazineSectionByTitle('photography');
    const magazineSection = category[0].id;
    console.log(magazineSection);

    const submission = await newImageSubmission(title, imgIds, magazineSection);
    console.log(submission);
    throw redirect("/submit");
}

export default function Gossip() {

    const { maxImgCount, maxImgSizeInMb } = useContext(GlobalContext);

    const handleFileInputChange = (event) => {
        imgNames = [];
        imgStrings = [];

        if (event.target.files.length > maxImgCount) {
            alert(`You can only upload a maximum of ${maxImgCount} images`);
            event.target.value = null;
            return;
        }
        else {
            for (let i = 0; i < event.target.files.length; i++) {
                if (event.target.files[i].size > maxImgSizeInMb*1024*1024) { 
                    alert(`One or more of your images is too large. Please limit your image size to ${maxImgSizeInMb}MB`);
                    return;
                }
                else {
                    const file = event.target.files[i];
                    const reader = new FileReader(); // -> web api

                    reader.onloadend = () => {
                        const base64String = reader.result;
                        const filename = event.target.files[i].name;

                        console.log(base64String);
                        console.log(filename);

                        imgNames.push(filename);
                        imgStrings.push(base64String);

                        console.log(imgNames);
                        console.log(imgStrings);
                    };

                    reader.readAsDataURL(file);
                }
            }
        }



    };

    return (
        <div>
            <h1>Submit your photography</h1>
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
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}