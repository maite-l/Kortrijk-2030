import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import HTMLFlipBook from 'react-pageflip';

import '../css/magazine-popup.css'

Modal.setAppElement('#root');

import pdfToImgSrc from '../util/pdfToImgSrc';

export default function MagazinePopUp({ isOpen, closeModal, pdfPath }) {
    const [isLoading, setIsLoading] = useState(true);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        const loadPages = async () => {
            const loadedPages = await pdfToImgSrc(pdfPath);
            setPages(loadedPages);
            setIsLoading(false);
        };

        loadPages();
    }, [pdfPath]);

    return (
        <div className='magazine-popup'>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="Modal"
                style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(44, 44, 44, 0.75)',
                        backdropFilter: 'blur(5px)',
                        zIndex: 1000,
                    },
                    content: {
                        position: 'absolute',
                        background: 'transparent',
                        overflow: 'visible',
                        WebkitOverflowScrolling: 'touch',
                        outline: 'none',
                        border: 'none',
                        borderRadius: '0',
                        width: '85vw',
                        height: '90vh',
                        margin: 'auto',
                        padding: '0',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                }}
            >
                {isLoading ? (
                    <p className='magazine-popup__loading'>loading...</p>
                ) : (
                    <HTMLFlipBook className='magazine-popup__flipbook'
                        width={0.83 * 595}
                        height={0.83 * 842}
                        showCover={true}
                        maxShadowOpacity={0.4}
                        flippingTime={450}
                    >
                        {pages.map((page, index) => (
                            <img className="magazine-page" key={index} src={page} alt="" />
                        ))}
                    </HTMLFlipBook>
                )}
                <button onClick={closeModal} className='close-button'>X</button>
                <button className='left-button'>&lt;</button>
                <button className='right-button'>&gt;</button>
            </Modal>
        </div>
    );
}
