import HTMLFlipBook from "react-pageflip";


export default function MagazinePreview({ pages }) {

    return (
        <HTMLFlipBook className="magazine-flipbook"
            width={0.65 * 595}
            height={0.65 * 842}
            showCover={true}
            maxShadowOpacity={0.4}
            flippingTime={450}
        >
            {pages.map((page, index) => {
                return (
                    <img className="magazine-page" key={index} src={page} alt="" />
                )
            }
            )}
        </HTMLFlipBook>
    );
}
