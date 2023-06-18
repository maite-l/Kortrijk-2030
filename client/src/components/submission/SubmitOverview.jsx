import { Form } from 'react-router-dom';

export default function SumbitOverview({ imgStringsResult, imgNamesResult, formTitle, formText, notesForEditor, setSubmitState }) {
    return (
        <div className='submit-overview'>
            <h1>Submission preview</h1>
            <div className='submission__overview'>
                {imgStringsResult && imgStringsResult.length > 0 && (
                    <div className='submission__overview--images'>
                        {imgStringsResult.map((imgString, index) => (
                            <img key={index} src={imgString} alt={imgNamesResult[index]} className='submission__overview--image' />
                        ))}
                    </div>
                )}
                <div className='submission__overview--info'>
                    {formTitle && (
                        <p className='submission__overview--title'>{formTitle}</p>
                    )}
                    {formText && (
                        <p className='submission__overiew--text'>{formText.slice(0, 200)}{formText.length > 200 ? "..." : ""}</p>
                    )}
                </div>

                {notesForEditor && (
                    <div className='notes-for-editor'>
                        <p className='notes-for-editor__title'>Notes for the editor</p>
                        <p>{notesForEditor}</p>
                    </div>
                )}
            </div>

            <div className='overview-buttons'>
                <button onClick={() => setSubmitState('form')}>Edit</button>
                <Form method='post'>
                    {/* hidden fields to carry over data */}
                    {formTitle && (
                        <input type="hidden" name="title" value={formTitle} />
                    )}
                    {formText && (
                        <input type="hidden" name="text" value={formText} />
                    )}
                    {notesForEditor && (
                        <input type="hidden" name="info" value={notesForEditor} />
                    )}
                    <button type="submit">Submit</button>
                </Form>
            </div>


        </div>
    );
}