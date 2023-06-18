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
                <svg className="scribble scribble1" width="237" height="271" viewBox="0 0 237 271" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.7115 5C11.2112 10.0553 8.29421 15.0034 7.01636 19.9265C4.6829 28.9163 4.96737 38.2114 5.06446 47.4338C5.20067 60.3724 6.67204 73.4666 15.7208 83.4173C27.0855 95.9148 43.7934 98.0393 59.3485 93.2794C77.8556 87.6162 94.9556 75.6344 110.784 64.7059C114.968 61.8172 129.459 53.9246 129.459 47.2206C129.459 38.7183 100.779 44.8756 96.804 46.8474C84.0391 53.1797 82.8546 62.4787 90.3152 73.875C106.295 98.2846 125.122 118.454 150.983 132.088C165.491 139.737 180.404 145.788 195.824 151.279C205.8 154.833 218.999 157.403 227.107 164.873C232.307 169.664 232.275 178.336 231.802 184.864C231.036 195.443 226.801 204.258 221.251 213.224C209.072 232.9 193.826 248.72 178.837 266" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
                </svg>
                <svg className="scribble scribble2" width="276" height="122" viewBox="0 0 276 122" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M81.1775 53.0601C80.8613 51.9488 73.7266 56.3345 73.658 56.3746C57.5788 65.7618 42.4895 77.3742 28.449 89.5808C27.6338 90.2896 1.0875 114.253 5.49303 116.465C9.15635 118.304 18.2295 114.887 21.388 113.948C50.2542 105.371 76.7143 90.1565 102.238 74.4815C123.515 61.4152 144.209 47.3775 165.91 35.0145C171.759 31.6821 178.627 26.8237 185.534 26.0531C187.647 25.8174 187.103 26.4358 185.717 27.5262C177.585 33.9258 169.007 39.5542 161.203 46.4311C154.215 52.5883 146.865 59.2953 142.19 67.4842C141.451 68.7779 137.806 75.6744 140.203 76.9981C141.339 77.6256 143.447 77.2425 144.574 77.1208C149.31 76.6095 154.022 75.709 158.665 74.6656C178.561 70.195 198.444 63.4046 216.59 54.0421C238.516 42.7295 258.482 26.545 271 5" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
                </svg>
                <svg className="scribble scribble3" width="74" height="78" viewBox="0 0 74 78" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M68.576 69.6507C56.2911 70.7548 43.2693 73.4435 30.9072 71.977C29.8064 71.8464 36.386 67.3704 37.002 66.9281C43.6186 62.178 50.1997 57.4326 56.9419 52.9038C57.9123 52.2519 60.8261 51.7371 59.88 50.9981C58.969 50.2866 55.0384 51.4728 54.2346 51.6114C41.6812 53.7754 29.1889 56.387 16.5554 58.0161C13.6687 58.3883 10.7703 58.6419 7.87231 58.9023C7.23504 58.9596 6.04106 59.326 7.24588 58.7468C15.1516 54.9463 20.7198 45.396 25.2562 37.6676C25.7198 36.8778 32.0113 24.0017 31.8714 23.9935C30.2081 23.895 27.3024 25.625 25.8207 26.1259C21.6458 27.5372 17.4951 29.0274 13.3245 30.4526C10.7912 31.3183 3.47842 34.3334 5.6006 32.5765C8.4929 30.1821 11.1331 27.2587 13.2369 23.9736C16.2051 19.3388 7.12861 23.5804 7.71114 22.511C10.218 17.9088 12.941 13.7348 14.2418 8.42077C15.3673 3.82274 12.6963 5.69182 9.46099 6.33511" stroke="#547AA5" stroke-width="10" stroke-linecap="round" />
                </svg>

            </div>
        </div>

    );
}
