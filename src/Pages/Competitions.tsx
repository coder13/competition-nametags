import { Link } from 'react-router-dom';
import { useGetCompetitionsQuery } from 'Store/api';

export default function Competitions() {
  const { data = [], error, isLoading } = useGetCompetitionsQuery(undefined);

  if (error) {
    console.error(error);
  }

  const sortedComps = [...data].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

  return (
    <div className="w-full flex flex-col items-center">
      {isLoading && <div>Loading...</div>}
      <div className="w-1/2">
        <p className="text-xl">Competitions</p>
        <ul>
          {sortedComps.map((competition) => (
            <Link key={competition.id} to={`/competitions/${competition.id}`}>
              <li className="border bg-white list-none rounded-md px-1 py-1 flex cursor-pointer hover:bg-blue-200 group transition-colors my-1 flex-row">
                <div className="flex-1">
                  <p className="font-normal leading-1"> {competition.name} </p>{' '}
                  <p className="text-gray-600 text-sm leading-1"> {competition.start_date} </p>{' '}
                </div>{' '}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
