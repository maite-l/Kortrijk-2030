export default function Confirmation({ typeOfSubmission, openIssueDate }) {
    return (
        <div className='confirmation'>
            <div style={{ width: '480px' }}>
                <iframe
                    allow="fullscreen"
                    height="320"
                    src="https://giphy.com/embed/0j1lyc4cqsnfZTXcIR/video"
                    width="480"
                ></iframe>
            </div>
            <h1>Yipeee! Your {typeOfSubmission} has been submitted! 🥳</h1>
            <div className='confirmation__info'>
                <p>What now?</p>
                <ol>
                    <li>Did you make an account? Check your inbox - we sent you an email confirming your submission.</li>
                    <li>We will update you through email when your submission gets approved or rejected. You can also check your profile for any updates (if you have one).</li>
                    <li>If it gets approved, you’ll see it published in the next <span className='italic'>klinkt.</span> issue in the beginning of {openIssueDate}!</li>
                </ol>
            </div>
            <a className="new-input__button" href="/submit">Submit new input</a>


        </div>
    );
}