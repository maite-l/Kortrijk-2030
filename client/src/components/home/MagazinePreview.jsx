import { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HTMLFlipBook from "react-pageflip";

import CustomButton from '../CustomButton';

export default function MagazinePreview({ pages, date }) {

    //flip to next page on scroll

    // const flipbookWrapperRef = useRef(null);
    // const flipbookRef = useRef(null);

    // useEffect(() => {
    //     gsap.registerPlugin(ScrollTrigger);

    //     const flipbookElement = flipbookWrapperRef.current;

    //     // Animate flipbook element when it enters the viewport
    //     ScrollTrigger.create({
    //         trigger: flipbookElement,
    //         start: "60% 15%",
    //         markers: true,
    //         onEnter: function () {
    //             // flipping animation to the first page + disabling the flipbook
    //             console.log('enter');
    //         },
    //         onLeaveBack: function () {
    //             // flipping animation to the last page
    //             console.log('leave');
    //         }
    //     });
    // }, []);


    return (
        <div className="magazine-preview">
            <p>Pssst... {date.split(' ')[0]}’s <span className='italic'>klinkt.</span> issue is out! </p>
            <div
                // ref={flipbookWrapperRef}
                className='magazine-flipbook__container'
            >

                <CustomButton href={''} text={'download as pdf'} />
                <HTMLFlipBook
                    className="magazine-flipbook"
                    // ref={flipbookRef}
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
            </div>
        </div>
    );
}
