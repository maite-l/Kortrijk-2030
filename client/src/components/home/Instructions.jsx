import CustomButton from "../CustomButton";

export default function Instructions() {
    return (
        <div className="instructions">
            <h2 className="title--style2">How does it work?</h2>
            <div className="instructions">
                <div className="instructions__steps">
                    <div className="instructions__step">
                        <div>
                            <h3><span>01.</span> Submit your work</h3>
                            <p className="instructions__text">You can contribute to various sections: articles, interviews, local gossip, memes, photography, artworks and open submissions.</p>
                        </div>
                        <CustomButton className="instructions__button" text={"Submit your input"} />
                    </div>
                    <div className="instructions__step">
                        <div>
                            <h3><span>02.</span> Wait for approval</h3>
                            <p className="instructions__text">We manually go through all the submissions and moderate them, so that they fit the curation of the magazine.</p>
                            <p className="instructions__text">You can check the status of your submission if you create an account.</p>
                        </div>
                        <CustomButton className="instructions__button" text={"Make an account"} />
                    </div>
                    <div className="instructions__step">
                        <div>
                            <h3><span>03.</span> Admire your work</h3>
                            <p className="instructions__text">After your submission has been approved, it will be added to the upcoming issue and published in the beginning of next month - both in the digital and printed version of <span className="italic">klinkt.</span></p>
                        </div>
                        <CustomButton className="instructions__button" text={"View recent issue"} />
                    </div>
                </div>
            </div>
        </div>
    );
}