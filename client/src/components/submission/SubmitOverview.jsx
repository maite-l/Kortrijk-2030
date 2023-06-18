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
                <Form method='post' onSubmit={() => setSubmitState('confirmation')}>
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

            <svg className='scribble scribble1' width="57" height="97" viewBox="0 0 57 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M37.2908 91.6377C28.5497 82.9353 18.1211 74.6867 11.2999 64.2731C10.6925 63.3458 18.3502 65.5101 19.0849 65.6978C26.9765 67.7143 34.8417 69.7067 42.6444 71.9616C43.7675 72.2861 46.0345 74.1876 45.9926 72.9879C45.9523 71.8327 42.5174 69.5836 41.8947 69.0568C32.1691 60.8299 22.1397 52.9374 12.7725 44.3053C10.632 42.3329 8.57504 40.2753 6.51307 38.2224C6.05964 37.771 5.01159 37.0917 6.22963 37.6425C14.2221 41.2569 25.1175 39.3853 33.954 37.894C34.857 37.7416 48.7653 34.2867 48.6817 34.1742C47.6882 32.8366 44.4954 31.7222 43.1594 30.9089C39.395 28.6174 35.5858 26.3951 31.8135 24.1157C29.5222 22.7312 22.5125 19.0663 25.2224 19.5631C28.9157 20.2402 32.8522 20.3842 36.7211 19.8848C42.1796 19.1801 33.0968 14.9522 34.2905 14.7112C39.4275 13.6742 44.3753 13.0779 49.2826 10.6593C53.5287 8.56661 50.3801 7.72143 47.808 5.65613" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
            </svg>
            <svg className='scribble scribble2' width="192" height="167" viewBox="0 0 192 167" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M186.498 52.1087C185.37 52.3601 184.21 51.956 183.116 51.6751C174.021 49.3386 165.214 45.5946 156.65 41.7871C145.105 36.6546 133.989 30.8948 122.991 24.6846C116.653 21.106 110.127 17.8589 103.399 15.0889C97.6708 12.7302 92.5175 9.9853 87.364 6.61341C86.94 6.336 84.5868 4.77161 84.0238 5.77484C83.3046 7.05665 87.9265 11.6995 88.4676 12.3487C92.943 17.719 97.9658 22.4112 103.349 26.843C103.896 27.2935 113.773 34.4336 111.455 35.8988C109.424 37.183 105.504 36.2054 103.433 35.8623C91.4808 33.8827 79.658 30.7298 67.8662 27.9812C52.7166 24.4499 36.4634 18.2171 20.6515 20.3003C19.3213 20.4756 17.5164 20.628 16.2777 21.2096C15.8616 21.4049 16.3506 21.9838 16.1937 22.3058C16.0315 22.6388 15.6291 22.8372 16.0119 23.16C22.6294 28.7409 28.4104 35.3948 33.9118 42.061C41.0157 50.6689 48.2448 59.5526 54.0275 69.1321C54.0854 69.2281 56.783 73.7634 56.0912 73.5758C55.4921 73.4133 54.7136 72.7683 54.2462 72.4698C50.713 70.2144 47.0559 68.3475 43.1956 66.7093C33.0585 62.4073 22.7173 58.454 12.4566 54.4533C11.9272 54.2469 6.21019 51.5665 5.64804 52.299C5.1516 52.9458 5.66077 54.2221 5.80752 54.8803C8.37412 66.3916 12.4428 77.4654 16.5456 88.5063C22.7105 105.096 29.0337 121.741 37.6583 137.236C40.2495 141.891 42.7161 146.629 45.5731 151.128C47.7501 154.556 49.8705 157.685 51.6179 161.347" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
            </svg>

        </div>
    );
}