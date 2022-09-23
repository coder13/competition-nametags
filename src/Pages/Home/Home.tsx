import { createContext, useEffect, useRef, useState } from 'react';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { Competition, Person } from '@wca/helpers';
import { NametagExportWrapped, CompetitorCardExportWrapped } from '../../Components/Export';
import Nametag from 'Components/Nametag';
import CompetitorCard from 'Components/CompetitorCard';

const competitionId = 'SnoCoNxN2022';

export const WcifContext = createContext<Competition | null>(null);

export default function HomePage() {
  const [wcif, setWcif] = useState<Competition | null>(null);
  const exportNametagsRef = useRef(null);
  const exportCompetitorCardsRef = useRef(null);

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

  if (!wcif) {
    return;
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
          </div>
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
