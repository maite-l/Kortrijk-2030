import { Form, redirect, useLoaderData } from 'react-router-dom';

import { getMagazineSectionByTitle, newSubmission } from "../../submissions";
import { getCurrentIssue } from "../../magazines";

import SubmitForm from '../../components/SubmitForm';

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
        const { article, text, info } = Object.fromEntries(formData);
        const title = `Reply to: ${article}`;

        //create submission
        const submission = await newSubmission(title, text, info, [], magazineSection);
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
            <main>
                <h1>Reply to an article</h1>
                <p>There are currently no articles to reply to.</p>
            </main>
            :
            <main>
                <SubmitForm
                    title={'Reply to an article / interview'}
                    submissionTips={'We would love to know your opinion about what we publish in klinkt.! Just don’t be too harsh on us...'}
                    formTitlePlaceholder={'My new favourite restaurant (probably)'}
                    formTextLabel={'Your answer'}
                    formTextPlaceholder={'I totally agree with you!!! I went there last week and I definitely recommend...'}
                    reply={true}
                    articlesToReplyTo={articlesToReplyTo}
                    includeText={true}
                    includeImages={false}
                />
            </main>
    );

}