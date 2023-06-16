import { Form} from 'react-router-dom';

export default function Poll({ votedState, submissionPostedState, optionVotedFor, optionOne, optionTwo, optionOneVotes, optionTwoVotes, totalVotes, handleVote, handleSubmit }) {
    return (
        <div className="would-you-rather">
            <div className="would-you-rather__title">
                <svg className="would-you-rather__title--doodle" width="347" height="332" viewBox="0 0 347 332" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_843_1198)">
                        <path d="M212.5 241.5C212.5 241.5 222.72 282.545 219.813 282.883C216.906 283.222 192.653 250.519 190.944 249.046C189.235 247.573 193.47 304.394 191.297 303.233C189.125 302.072 172.042 257.139 163.553 251.453C155.064 245.767 130.531 282.447 119.443 273.855C108.354 265.263 141.646 240.878 140.174 233.644C138.702 226.41 78.3318 261.246 72.5617 254.307C66.7916 247.367 110.619 198.969 106.685 192.138C102.752 185.307 36.9097 195.086 33.451 191.205C29.9923 187.323 79.3093 164.669 77.4406 162.456C75.5718 160.243 32.2599 162.822 32.9175 155.555C33.575 148.288 124.331 133.467 124.311 128.316C124.291 123.165 76.3386 118.143 78.1416 116.229C79.9446 114.315 138.178 112.076 137.791 110.442C137.404 108.809 105.96 72.8622 105.301 67.2539C104.643 61.6455 133.12 83.1669 140.104 85.6892C147.088 88.2115 118.921 29.3759 118.921 29.3759C121.061 22.8964 179.191 98.3396 184.934 99.4024C190.678 100.465 222.1 48.9149 230.974 52.1441C239.848 55.3733 206.673 117.165 215.609 119.956C224.545 122.748 297.671 95.6368 296.617 103.827L227.5 137" stroke="#DFFF17" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <defs>
                        <clipPath id="clip0_843_1198">
                            <rect width="281.963" height="259.432" fill="white" transform="translate(77.3555) rotate(17.3477)" />
                        </clipPath>
                    </defs>
                </svg>
                <h2 className="would-you-rather__title--text title--style2">Would you rather...</h2>
            </div>

            {votedState ? (
                <div>
                    <div className="poll-options">
                        <div className={`poll-option--voted ${optionVotedFor === optionOne.optionName ? 'selected' : ''}`}>
                            <p className="poll-option__title">{optionOne.optionName}</p>
                            <p className="poll-option__votes">{(optionOneVotes / totalVotes * 100).toFixed(0)}%</p>
                        </div>
                        <div className={`poll-option--voted ${optionVotedFor === optionTwo.optionName ? 'selected' : ''}`}>
                            <p className="poll-option__title">{optionTwo.optionName}</p>
                            <p className="poll-option__votes">{(optionTwoVotes / totalVotes * 100).toFixed(0)}%</p>
                        </div>
                    </div>

                    {submissionPostedState ? (
                        <p className="poll-form__conformation">Thanks for your submission!</p>
                    ) : (
                        <div className="poll-form__wrapper">
                            <Form method="post" className="poll-form" onSubmit={handleSubmit}>
                                <label htmlFor="text">
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        name="text"
                                        placeholder="Tell us why...?"
                                        required
                                        style={{ resize: "none" }}
                                    />
                                </label>
                                <button type="submit">Submit your answer</button>
                            </Form>
                        </div>
                    )}
                </div>
            ) : (
                <div className="poll-options">
                    <a href="1" onClick={handleVote} className="poll-option">
                        {optionOne.optionName}
                    </a>
                    <a href="2" onClick={handleVote} className="poll-option">
                        {optionTwo.optionName}
                    </a>
                </div>
            )}
        </div>
    );
}