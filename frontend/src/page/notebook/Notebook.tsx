import { useState } from "react";
import { Document, Page } from "react-pdf";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import pdf_file from "./pdf/notebook.pdf"


pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function Notebook(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    
    const onDocumentLoadSuccess = ({numPages}:any) => {
        setNumPages(numPages);
    };

    return(
        <div>
            <Document
                file={pdf_file} // Path or URL to the PDF
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {/* Render the current page */}
                <Page pageNumber={pageNumber} />
            </Document>
            <button onClick={()=> {console.log('PDF.js version:', pdfjs.version);
console.log('Worker version:', pdfjs.GlobalWorkerOptions.workerSrc);}}>Next</button>
        </div>
    )
}