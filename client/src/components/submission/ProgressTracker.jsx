export default function ProgressTracker({ submitState }) {

    return(
        <div className='progress-tracker'>
            <div className="progress-tracker__item progress-tracker__item--completed">
                <div className='progress-tracker__item__number'>1</div>
                <div className='progress-tracker__item__text'>Your submission</div>
            </div>
            <div className={`progress-tracker__item${submitState === 'overview' ? ' progress-tracker__item--completed' : ''}`}>
                <div className='progress-tracker__item__number'>2</div>
                <div className='progress-tracker__item__text'>Confirm</div>
            </div>
        </div>
    );
}
