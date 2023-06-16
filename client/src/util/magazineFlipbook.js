import * as pdfjsLib from 'pdfjs-dist';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js';

const pdfToImgDivs = async (pdfDocument) => {
    return pdfjsLib.getDocument(pdfDocument).promise.then((pdf) => {
        const totalPages = pdf.numPages;
        console.log('Total Pages:', totalPages);

        const promises = [];

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            const promise = pdf.getPage(pageNumber).then((page) => {
                const scale = 1.5;
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                return page.render(renderContext).promise.then(() => {
                    const image = new Image();
                    image.src = canvas.toDataURL('image/png');
                    image.classList.add('magazine-page');
                    const div = document.createElement('div');
                    div.appendChild(image);
                    // console.log(div);
                    return div;
                });
            });
            promises.push(promise);
        }

        return Promise.all(promises);
    });
};

const attachDivs = (divs) => {
    const flipbookContainer = document.querySelector('.magazine-flipbook');
    // console.log(flipbookContainer);
    divs.forEach((div) => {
        flipbookContainer.appendChild(div);
    });

    $(flipbookContainer).turn({
        width: (0.85 * 595) * 2,
        height: 0.85 * 842,
        duration: 1000,
    });

    // ScrollTrigger configuration
    ScrollTrigger.create({
        trigger: flipbookContainer,
        start: "top 15%",
        scrub: 2,
        onEnter: function () {
            // flipping animation to the first page + disabling the flipbook
            $(flipbookContainer).turn("disable", false);
            $(flipbookContainer).turn("next");
            $(flipbookContainer).turn("disable", true);
        },
            onLeaveBack: function () {
            // flipping animation to the last page
            $(flipbookContainer).turn("disable", false);
            $(flipbookContainer).turn("previous");
            $(flipbookContainer).turn("disable", true);
        }
    });
    
};

const initializeMagazineFlipbook = (pdfPath) => {
    pdfToImgDivs(pdfPath).then((divs) => {
        console.log(divs);
        attachDivs(divs);
    });
};

export default initializeMagazineFlipbook;
