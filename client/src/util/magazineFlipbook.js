import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js';

const pdfToImgDivs = (pdfDocument) => {
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
                    const div = document.createElement('div');
                    div.appendChild(image);
                    return div;
                });
            });
            promises.push(promise);
        }

        return Promise.all(promises);
    });
};

// const attachDivs = (divs) => {
//     const flipbookContainer = document.querySelector('magazine');
//     divs.forEach((div) => {
//         flipbookContainer.appendChild(div);
//     });

//     $("#flipbook_desktop").turn({
//         width: 564 * 2,
//         height: 564,
//         duration: 1000,
//         // autoCenter: true,
//         // elevation: 50,
//     });
// };

const initializeMagazineFlipbook = (pdfPath) => {
    pdfToImgDivs(pdfPath).then((divs) => {
        console.log(divs);
        // attachDivs(divs);
    });
};

export default initializeMagazineFlipbook;
