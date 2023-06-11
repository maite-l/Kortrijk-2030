import { Form, redirect, useLoaderData } from 'react-router-dom';

import { getMagazineSectionByTitle, newSubmission } from "../../submissions";
import { getCurrentIssue } from "../../magazines";

export async function loader() {
    //get current issue
    const currentIssue = await getCurrentIssue();
    const articlesToReplyTo = currentIssue[0].articlesToReplyTo;
    console.log(articlesToReplyTo);

    return { articlesToReplyTo };
}

export async function action({ request }) {
    try {
        // Submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        const inputFields = document.querySelectorAll('textarea, select');
        inputFields.forEach(inputField => inputField.disabled = true);

        //get magazine section
        const category = await getMagazineSectionByTitle('Reply to an article');
        const magazineSection = category[0].id;
        console.log(magazineSection);

        //get form data
        const formData = await request.formData();
        console.log(Object.fromEntries(formData));
        const { article, text } = Object.fromEntries(formData);
        const title = `Reply to: ${article}`;

        //create submission
        const submission = await newSubmission(title, text, [], magazineSection);
        console.log(submission);
        return redirect("/submit");

    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Reply() {

    //get data from loader
    const { articlesToReplyTo } = useLoaderData();


    return (
        //if there are no articles to reply to, display a message
        articlesToReplyTo.length === 0 ?
            <div>
                <h1>Reply to an article</h1>
                <p>There are currently no articles to reply to.</p>
            </div>
            :
            <div>
                <h1>Reply to an article</h1>
                <div>
                    <h2>Submission tips</h2>
                    <p>tips</p>
                </div>
                <Form method="post">
                    <label htmlFor="article">
                        <span>Select an article to reply to:</span>
                        <select name="article" id="article">
                            {articlesToReplyTo.map((article) => (
                                <option key={article.id} value={article.articleTitle}>
                                    {article.articleTitle}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor="text">
                        <span>Your reply</span>
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