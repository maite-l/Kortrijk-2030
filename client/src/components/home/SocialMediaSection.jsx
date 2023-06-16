import insta1 from "../../assets/img/insta/insta1.png";
import insta2 from "../../assets/img/insta/insta2.png";
import insta3 from "../../assets/img/insta/insta3.png";
import insta4 from "../../assets/img/insta/insta4.png";
import insta5 from "../../assets/img/insta/insta5.png";
import insta6 from "../../assets/img/insta/insta6.png";
import insta7 from "../../assets/img/insta/insta7.png";
import insta8 from "../../assets/img/insta/insta8.png";

import tiktok from "../../assets/img/tiktok.png";

export default function SocialMediaSection() {

    const instaFeedImgPaths = [
        insta1,
        insta2,
        insta3,
        insta4,
        insta5,
        insta6,
        insta7,
        insta8,
    ];

    return (
        <div className="social-media">
            <div className="instagram">
                <h2>Tag us on Instagram</h2>
                <p className="hashtag">#klinktkortrijk</p>
                <div className="instagram-content">
                    {instaFeedImgPaths.map((imgPath, index) => (
                        <img key={index} src={imgPath} alt={`Instagram Post ${index + 1}`} />
                    ))}
                </div>
            </div>

            <div className="tiktok">
                <div className="tiktok-title">
                    <h2 className="title--style2 tiktok-title__1">Find us on Tiktok</h2>
                    <h2 className="title--style2 tiktok-title__2">Find us on Tiktok</h2>
                    <h2 className="title--style2 tiktok-title__3">Find us on Tiktok</h2>
                </div>
                <img className="tiktok-gif" src={tiktok} alt="Tiktok Post" />
            </div>
        </div>

    );
}
