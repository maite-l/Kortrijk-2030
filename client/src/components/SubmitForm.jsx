import { Form } from 'react-router-dom';


export default function SubmitForm({ title, submissionTips, formTitlePlaceholder, formTextLabel, formTextPlaceholder, includeImages, reply, articlesToReplyTo, handleFileInputChange }) {
    
    return (
        <div className='submit-form__wrapper'>
            <h1>{title}</h1>
            <div className='submit-form'>
                <div className='submission-tips'>
                    <h2 className='submission-tips__title'>Submission tips</h2>
                    <p className='submission-tips__text'>{submissionTips}</p>
                </div>
                <Form method="post">
                    {reply ?
                        <label htmlFor="article">
                            <span>Choose an article / interview</span>
                            <select name="article" id="article">
                                {articlesToReplyTo.map((article) => (
                                    <option key={article.id} value={article.articleTitle}>
                                        {article.articleTitle}
                                    </option>
                                ))}
                            </select>
                        </label>
                        : null}
                    <label htmlFor="title">
                        <span>Title</span>
                        <input
                            type="text"
                            name="title"
                            placeholder={formTitlePlaceholder}
                            required
                        />
                    </label>
                    <label htmlFor="text">
                        <span>{formTextLabel}</span>
                        <textarea
                            rows="4"
                            cols="50"
                            name="text"
                            placeholder={formTextPlaceholder}
                            required
                            style={{ resize: "none" }}
                        />
                    </label>
                    {includeImages ?
                        <label htmlFor="image">
                            <span>Choose a file (up to 15MB)</span>
                            <input
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg, image/jpg"
                                multiple
                                onChange={(event) => handleFileInputChange(event)}
                            />
                        </label>
                        : null}
                    <label htmlFor="info">
                        <span>Any notes for the editor?</span>
                        <textarea
                            rows="4"
                            cols="50"
                            name="info"
                            placeholder="Can you include my social handles somewhere? They are this and this. Also, here are some captions for each image..."
                            required
                            style={{ resize: "none" }}
                        />
                    </label>
                    <button type='submit'>Submit</button>
                </Form>
            </div>
        </div>
    )
}