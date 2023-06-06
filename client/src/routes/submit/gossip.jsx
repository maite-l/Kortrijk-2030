import { Form, redirect } from 'react-router-dom';

import { newTextSubmission } from "../../submissions";

export async function action({ request }) {
    const formData = await request.formData();
    console.log(Object.fromEntries(formData));
    const { title, text } = Object.fromEntries(formData);
    const magazineSection = [59];
    console.log(title, text, magazineSection);
    const submission = await newTextSubmission(title, text, magazineSection);
    console.log(submission);
    throw redirect("/submit");
}

export default function Gossip() {
    return (
        <div>
            <h1>Submit a local gossip!</h1>
            <div>
                <h2>Submission tips</h2>
                <p>Make sure what you submit is indeed a local gossip. Bonus points if it's cultural. And please don't be mean, we won't publish it anyway...</p>
            </div>
            <Form method="post">
                <label htmlFor="title">
                    <span>Title</span>
                    <input
                        type="text"
                        name="title"
                        placeholder="My new favourite restaurant (probably)"
                    />
                </label>
                <label htmlFor="text">
                    <span>Your gossip</span>
                    <textarea
                        rows="4" 
                        cols="50"
                        name="text"
                        placeholder="Apparently they're opening a new croquette place on the Grote Markt..."
                        style={{resize: "none"}}
                    />
                </label>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    );
}