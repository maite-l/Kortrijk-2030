import { Form } from 'react-router-dom';


export default function SubmitForm({
    title,
    submissionTips,
    formTitlePlaceholder,
    formTextLabel,
    formTextPlaceholder,
    includeText,
    includeImages,
    reply,
    articlesToReplyTo,
    includeNotesForEditor,
    notesForEditorPlaceholder,
    handleFileInputChange,
    handleSubmit
}) {

    return (
        <div className='submit-form__wrapper'>
            <h1>{title}</h1>
            <div className='submit-form'>
                <div className='submission-tips'>
                    <h2 className='submission-tips__title'>Submission tips</h2>
                    <p className='submission-tips__text'>{submissionTips}</p>
                </div>
                <Form method="post" onSubmit={handleSubmit}>
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
                        :
                        <label htmlFor="title">
                            <span>Title</span>
                            <input
                                type="text"
                                name="title"
                                placeholder={formTitlePlaceholder}
                                required
                            />
                        </label>}

                    {includeText ?
                        <label htmlFor="text">
                            <span>{formTextLabel} (Max. 1000 characters)</span>
                            <textarea
                                rows="4"
                                cols="50"
                                name="text"
                                placeholder={formTextPlaceholder}
                                required
                                style={{ resize: "none" }}
                            />

                        </label>
                        : null}
                    {includeNotesForEditor ?
                        <label htmlFor="info">
                            <span>Notes for the editor? (Max. 400 characters) </span>
                            <textarea
                                rows="4"
                                cols="50"
                                name="info"
                                placeholder={notesForEditorPlaceholder}
                                style={{ resize: "none" }}
                            />
                        </label>
                        : null}
                    {includeImages ?
                        <label htmlFor="image">
                            <span>Choose files (up to 15MB, max 5 files)</span>
                            <input
                                type="file"
                                name="image"
                                accept="image/png, image/jpeg, image/jpg"
                                multiple
                                onChange={(event) => handleFileInputChange(event)}
                            />
                        </label>
                        : null}
                    <button className='submission-button' type='submit'>Go to overview</button>
                </Form>
            </div>
        </div>
    )
}