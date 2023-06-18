import { Form } from 'react-router-dom';


export default function SubmitForm({
    title,
    submissionTips,
    formTitlePlaceholder,
    formTextLabel,
    formTextPlaceholder,
    includeText,
    requireText,
    includeImages,
    requireImages,
    reply,
    articlesToReplyTo,
    includeNotesForEditor,
    notesForEditorPlaceholder,
    handleFileInputChange,
    handleSubmit,
    titleValue,
    textValue,
    notesForEditorValue,
    handleTitleChange,
    handleTextChange,
    handleNotesForEditorChange
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
                    {reply ? (
                        <label htmlFor="article">
                            <span>Choose an article / interview</span>
                            <select name="title" id="title" value={titleValue.replace(/^Reply to /i, '')} onChange={handleTitleChange}>
                                {articlesToReplyTo.map((article) => (
                                    <option key={article.id} value={article.articleTitle}>
                                        {article.articleTitle}
                                    </option>
                                ))}
                            </select>
                        </label>
                    ) : (
                        <label htmlFor="title">
                            <span>Title</span>
                            <input
                                type="text"
                                name="title"
                                placeholder={formTitlePlaceholder}
                                required
                                value={titleValue}
                                onChange={handleTitleChange}
                            />
                        </label>
                    )}

                    {includeText ? (
                        <label htmlFor="text">
                            <span>{formTextLabel} (Max. 1000 characters)</span>
                            <textarea
                                rows="4"
                                cols="50"
                                name="text"
                                placeholder={formTextPlaceholder}
                                required={requireText}
                                style={{ resize: "none" }}
                                value={textValue}
                                onChange={handleTextChange}
                            />
                        </label>
                    ) : null}
                    {includeNotesForEditor ? (
                        <label htmlFor="info">
                            <span>Notes for the editor? (Max. 400 characters) </span>
                            <textarea
                                rows="4"
                                cols="50"
                                name="info"
                                placeholder={notesForEditorPlaceholder}
                                style={{ resize: "none" }}
                                value={notesForEditorValue}
                                onChange={handleNotesForEditorChange}
                            />
                        </label>
                    ) : null}
                    {includeImages ? (
                        <label htmlFor="image">
                            <span>Choose files (up to 15MB, max 5 files)</span>
                            <input
                                type="file"
                                name="image"
                                required={requireImages}
                                accept="image/png, image/jpeg, image/jpg"
                                multiple
                                onChange={(event) => handleFileInputChange(event)}
                            />
                        </label>
                    ) : null}
                    <button className='submission-button' type='submit'>Go to overview</button>
                </Form>
            </div>
            <svg className='scribble scribble1' width="98" height="56" viewBox="0 0 98 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M92.5047 11.1217C85.146 21.0206 78.4787 32.5246 69.1512 40.769C68.3206 41.5031 69.3641 33.6141 69.4445 32.86C70.3081 24.7608 71.1518 16.6912 72.2641 8.64572C72.4242 7.48769 73.9809 4.97136 72.7995 5.18491C71.6621 5.39053 69.929 9.11252 69.4969 9.80439C62.7501 20.6095 56.3779 31.6672 49.1786 42.1758C47.5336 44.577 45.7923 46.9079 44.0565 49.243C43.6747 49.7565 43.1528 50.8911 43.5232 49.6067C45.9539 41.1784 42.5387 30.6641 39.7953 22.1329C39.515 21.2611 34.1008 7.99218 34.0015 8.09104C32.8202 9.26615 32.1754 12.5858 31.5621 14.0246C29.8342 18.0788 28.1813 22.1674 26.4666 26.2276C25.4251 28.6938 22.8035 36.1567 22.9065 33.4036C23.0468 29.6514 22.6247 25.7349 21.5755 21.9777C20.0951 16.6766 17.2138 26.272 16.8041 25.1252C15.0409 20.1901 13.7411 15.379 10.6436 10.8693C7.96346 6.9673 7.57865 10.2046 5.90364 13.0463" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
            </svg>

            <svg className='scribble scribble2' width="155" height="187" viewBox="0 0 155 187" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.732 5C72.732 6.15513 72.085 7.19986 71.573 8.20585C67.313 16.5749 61.7423 24.3561 56.1623 31.8864C48.6406 42.0371 40.5995 51.634 32.1448 61.0168C27.2728 66.4236 22.6832 72.0872 18.5156 78.0506C14.9668 83.1284 11.1663 87.5609 6.75368 91.8571C6.39064 92.2105 4.35163 94.167 5.20832 94.9347C6.30289 95.9156 11.8402 92.4149 12.5917 92.0281C18.8072 88.8286 24.48 84.9473 29.977 80.658C30.5357 80.222 39.6542 72.1355 40.5799 74.7165C41.3912 76.9786 39.5839 80.5921 38.7984 82.5388C34.2653 93.7733 28.6152 104.627 23.3663 115.538C16.6227 129.556 7.00236 144.063 5.59466 159.949C5.47623 161.286 5.23222 163.081 5.53027 164.416C5.6304 164.865 6.30178 164.513 6.58197 164.737C6.87164 164.967 6.97773 165.403 7.37612 165.1C14.2634 159.856 22.0159 155.661 29.7194 151.742C39.6671 146.682 49.911 141.559 60.5193 138C60.6257 137.964 65.6394 136.318 65.3057 136.953C65.0166 137.502 64.2177 138.122 63.8247 138.513C60.8544 141.471 58.2364 144.634 55.7974 148.045C49.3925 157.003 43.2835 166.236 37.1458 175.38C36.829 175.852 32.9688 180.849 33.5614 181.557C34.0847 182.182 35.4411 181.963 36.1155 181.963C47.9095 181.963 59.6033 180.401 71.2725 178.8C88.8062 176.393 106.428 173.843 123.428 168.797C128.536 167.281 133.697 165.905 138.71 164.096C142.53 162.717 146.046 161.328 150 160.419" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
            </svg>

        </div>
    );
}
