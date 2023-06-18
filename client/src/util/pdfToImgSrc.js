import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.7.107/pdf.worker.min.js';

export default async function pdfToImgSrc(pdfDocument, allPages, amountOfPages, startPage) {
    console.log(pdfDocument, allPages, amountOfPages, startPage);
    return pdfjsLib.getDocument(pdfDocument).promise.then((pdf) => {
        let totalPages = pdf.numPages;

        if (!allPages) {
            totalPages = startPage + amountOfPages - 1;
        }

        console.log('Total Pages:', totalPages);

        const promises = [];

        for (let pageNumber = startPage; pageNumber <= totalPages; pageNumber++) {
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
                    const imageSrc = canvas.toDataURL('image/png');
                    return imageSrc;
                });
            });
            promises.push(promise);
        }

        return Promise.all(promises);
    });
}