import { useState, useEffect } from 'react';


export default function ProgressBar({ date, progressBarPercentage }) {

    let progressBar;


    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 860;
    useEffect(() => {
        const handleResizeWindow = () => setWidth(window.innerWidth);
        // subscribe to window resize event "onComponentDidMount"
        window.addEventListener("resize", handleResizeWindow);
        return () => {
            // unsubscribe "onComponentDestroy"
            window.removeEventListener("resize", handleResizeWindow);
        };
    }, []);


    if (width > breakpoint) {
        if (progressBarPercentage >= 0 && progressBarPercentage < 15) {
            progressBar = (
                <div className="progress">
                    <div className="progress-bar">
                        <div className="progress-bar__bar--wrapper">
                            <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}></div>
                            <div className="progress-bar__info small">
                                <div className="progress-bar__info--wrapper">
                                    <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                    <div className="progress-bar__text">completed</div>
                                </div>
                            </div>
                        </div>
                        <div className="progress-bar__cta">
                            <div className="progress-bar__cta--wrapper">
                                <p className="progress-bar__issue">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                                <a className="progress-bar__contribute" href="/submit">contribute now</a>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (progressBarPercentage >= 15 && progressBarPercentage <= 80) {
            progressBar = (
                <div className="progress">
                    <div className="progress-bar">
                        <div className="progress-bar__cta">
                            <div className="progress-bar__cta--wrapper">
                                <p className="progress-bar__issue">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                                <a className="progress-bar__contribute" href="/submit">contribute now</a>
                            </div>
                        </div>
                        <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}>
                            <div className="progress-bar__info">
                                <div className="progress-bar__info--wrapper">
                                    <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                    <div className="progress-bar__text">completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            progressBar = (
                <div className="progress">
                    <p className="progress-bar__issue big">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                    <div className="progress-bar">
                        <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}>
                            <div className="progress-bar__info">
                                <div className="progress-bar__info--wrapper">
                                    <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                    <div className="progress-bar__text">completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="progress-bar__contribute big" href="/submit">contribute now</a>
                </div>
            );
        }
    } else {
        if (progressBarPercentage >= 0 && progressBarPercentage < 50) {
            progressBar = (
                <div className="progress">
                    <p className="progress-bar__issue big">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                    <div className="progress-bar">
                        <div className="progress-bar__bar--wrapper">
                            <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}></div>
                            <div className="progress-bar__info small">
                                <div className="progress-bar__info--wrapper">
                                    <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                    <div className="progress-bar__text">completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="progress-bar__contribute big" href="/submit">contribute now</a>
                </div>
            );
        } else if (progressBarPercentage >= 50 && progressBarPercentage) {
            progressBar = (
                <div className="progress">
                    <p className="progress-bar__issue big">{date.split(' ')[0]} <span className="italic-semibold">klinkt.</span> issue</p>
                    <div className="progress-bar">
                        <div className="progress-bar__bar" style={{ width: `${progressBarPercentage}%` }}>
                            <div className="progress-bar__info">
                                <div className="progress-bar__info--wrapper">
                                    <div className="progress-bar__percentage">{progressBarPercentage}%</div>
                                    <div className="progress-bar__text">completed</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a className="progress-bar__contribute big" href="/submit">contribute now</a>
                </div>
            );
        }
    }

    return progressBar;

}

