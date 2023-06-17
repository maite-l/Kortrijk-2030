import { redirect } from 'react-router-dom';

import { getMagazineSectionByTitle, getOpenIssue, newSubmission } from "../../submissions";

import SubmitForm from '../../components/SubmitForm';

export async function action({ request }) {
    try {
        // Submitting state
        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.innerHTML = "Submitting...";
        submitButton.disabled = true;
        const inputFields = document.querySelectorAll('input, textarea');
        inputFields.forEach((inputField) => (inputField.disabled = true));

        // Get magazine section
        const category = await getMagazineSectionByTitle('Gossip');
        const magazineSection = category[0].id;

        // Get form data
        const formData = await request.formData();
        console.log(Object.fromEntries(formData));
        const { title, text, info } = Object.fromEntries(formData);

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

        // Create submission
        const submission = await newSubmission(title, text, info, [], magazineSection, issueNumber, userId, jwt);
        console.log(submission);

        return redirect("/submit");
    } catch (error) {
        console.error(error);
        // Handle the error or display an error message to the user
    }
}

export default function Gossip() {
    return (
        <main>

            <SubmitForm
                title={'Submit your gossip'}
                submissionTips={'Make sure what you submit is indeed a local gossip. Bonus points if it’s cultural. And please don’t be mean, we won’t publish it anyway...'}
                formTitlePlaceholder={'My new favourite restaurant (probably)'}
                formTextLabel={'Content'}
                formTextPlaceholder={'Apparently they’re opening a new croquette place on the Grote Markt...'}
                reply={false}
                includeText={true}
                includeImages={false}
            />

        </main>
    );
}