import { createContext, useEffect, useRef, useState } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { Competition, Person } from '@wca/helpers';
import { NametagExportWrapped, CompetitorCardExportWrapped } from '../../Components/Export';
import Nametag from 'Components/Nametag';
import CompetitorCard from 'Components/CompetitorCard';
import pdfMake, { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { Document as PDFDocument, Page as PDFPage } from 'react-pdf';

// pdfMake.fonts = {
//   Roboto: {
//     normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
//     bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
//     italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
//     bolditalics:
//       'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
//   },
// };

const competitionId = 'NewKentOnTheBlock2022';

export const WcifContext = createContext<Competition | null>(null);

export default function HomePage() {
  const [wcif, setWcif] = useState<Competition | null>(null);
  // const [pdf, setPDF] = useState<TCreatedPdf | null>(null);
  const [PDFDataURL, setPDFDataURL] = useState<Blob | null>(null);
  const exportNametagsRef = useRef(null);
  const exportCompetitorCardsRef = useRef(null);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const handlePrintNametags = useReactToPrint({
    content: () => exportNametagsRef.current,
  });

  const handlePrintCompetiorCards = useReactToPrint({
    content: () => exportCompetitorCardsRef.current,
  });

  useEffect(() => {
    fetch(`https://www.worldcubeassociation.org/api/v0/competitions/${competitionId}/wcif/public`)
      .then((data) => data.json())
      .then((data) => {
        setWcif(data);
      });
  }, []);

  const examplePerson: Person = {
    name: 'Juan Antonio Orozco Lopez',
    roles: ['Organizer'],
    countryIso2: 'USA',
    wcaId: '2005DOEJ01',
    registrantId: 1,
    wcaUserId: 1,
    assignments: wcif?.persons[7].assignments,
  };

  const testPDFMake = () => {
    const pdf = pdfMake.createPdf({
      pageSize: { width: 792, height: 612 },
      pageMargins: [20, 20],
      content: [
        {
          text: 'asd',
        },
      ],
    });

    // setPDF(pdf);
    // pdf.download(`${wcif.id}-nametags.pdf`);
    pdf.getBlob((dataUrl) => {
      setPDFDataURL(dataUrl);
    });
  };

  if (!wcif) {
    return null;
  }

  return (
    <WcifContext.Provider value={wcif}>
      <div>
        <div className="print:hidden">
          <div className="flex flex-row space-x-4 m-4">
            <Nametag {...examplePerson} />
            <CompetitorCard {...examplePerson} />
          </div>
          <ReactToPrint content={() => exportNametagsRef.current} />
          <ReactToPrint content={() => exportCompetitorCardsRef.current} />
          <br />
          <br />
          <div className="space-x-2">
            <button
              onClick={handlePrintNametags}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Nametags
            </button>
            <button
              onClick={handlePrintCompetiorCards}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Print Competitor Cards
            </button>
            <button onClick={testPDFMake}>Test PDF Make</button>
            {PDFDataURL?.toString()}
            {!!PDFDataURL && (
              <PDFDocument
                file={PDFDataURL}
                onLoadSuccess={({ numPages }: { numPages: number }) => {
                  setNumPages(numPages);
                }}
              >
                <PDFPage pageNumber={pageNumber} />
              </PDFDocument>
            )}
          </div>
          <br />
          {}
        </div>
        {wcif && (
          <NametagExportWrapped
            ref={exportNametagsRef}
            wcif={wcif}
            className="print:block hidden"
          />
        )}
        {wcif && (
          <CompetitorCardExportWrapped
            ref={exportCompetitorCardsRef}
            wcif={wcif}
            className="print:block hidden"
          />
        )}
      </div>
    </WcifContext.Provider>
  );
}
