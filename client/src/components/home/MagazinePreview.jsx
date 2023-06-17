import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HTMLFlipBook from 'react-pageflip';
import CustomButton from '../CustomButton';

export default function MagazinePreview({ pages, date }) {
    const flipbookWrapperRef = useRef(null);
    const flipbookRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const flipbookWrapper = flipbookWrapperRef.current;
        const flipbook = flipbookRef.current;

        ScrollTrigger.create({
            trigger: flipbookWrapper,
            start: 'top 15%',
            onEnter: function () {
                flipbook.pageFlip().flipNext();
            },
            onLeaveBack: function () {
                flipbook.pageFlip().flipPrev();
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [flipbookRef]);

    return (
        <div className="magazine-preview">
            <p>
                Pssst... {date.split(' ')[0]}'s <span className="italic">klinkt.</span> issue is out!{' '}
            </p>
            <div ref={flipbookWrapperRef} className="magazine-flipbook__container">
                <CustomButton href={''} text={'download as pdf'} icon={"download"} />
                <HTMLFlipBook
                    className="magazine-flipbook"
                    ref={flipbookRef}
                    width={0.65 * 595}
                    height={0.65 * 842}
                    showCover={true}
                    maxShadowOpacity={0.4}
                    flippingTime={450}
                    useMouseEvents={false}
                >
                    {pages.map((page, index) => (
                        <img className="magazine-page" key={index} src={page} alt="" />
                    ))}
                </HTMLFlipBook>
            </div>
        </div>
    );
}
