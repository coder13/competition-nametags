import { Activity, AssignmentCode, Competition, Person, Room, Venue } from '@wca/helpers';
import { shortEventNameById } from 'lib/events';
import { WcifContext } from '../Pages/Competitions/Home';
import { useContext, useMemo } from 'react';
import { flatMap } from '../utils';
// import QRCode from 'react-qr-code';

// const WIDTH = '2.625in';
// const HEIGHT = '3.75in';
const WIDTH = '2.625in';
const HEIGHT = '3.5in';

const Container = ({ children, className }: { className?: string; children: React.ReactNode }) => (
  <span className={`px-[0.25rem] py-[0.25rem] rounded-md bg-blue-100 text-gray-700 ${className}`}>
    {children}
  </span>
);

interface AssignmentLabelProps {
  assignmentCode: AssignmentCode;
}

function AssignmentLabel({ assignmentCode }: AssignmentLabelProps) {
  switch (assignmentCode) {
    case 'competitor':
      return <Container className="bg-green-200">Competitor</Container>;
    case 'staff-scrambler':
      return <Container className="bg-yellow-200">Scrambler</Container>;
    case 'staff-judge':
      return <Container className="bg-blue-200">Judge</Container>;
    case 'staff-runner':
      return <Container className="bg-orange-200">Runner</Container>;
    default:
      return <Container>{assignmentCode}</Container>;
  }
}

export const parseActivityCode = (activityCode: string) => {
  const [, e, r, g, a] = activityCode.match(/(\w+)(?:-r(\d+))?(?:-g(\d+))?(?:-a(\d+))?/);
  return {
    eventId: e,
    roundNumber: r && parseInt(r, 10),
    groupNumber: g && parseInt(g, 10),
    attemptNumber: a && parseInt(a, 10),
  };
};

export const byDate = (a: any, b: any) =>
  new Date(a.startTime).getTime() - new Date(b.startTime).getTime();

export const rooms = (wcif: Competition) =>
  flatMap(wcif.schedule.venues, (venue: Venue) => venue.rooms);

// get all child activities by round
export const allChildActivities = (activity: Activity) =>
  activity.childActivities.length > 0
    ? [
        ...activity.childActivities.map((a) => ({
          ...a,
          parent: activity,
        })),
        ...flatMap(
          activity.childActivities.map((a) => ({
            ...a,
            parent: activity,
          })),
          allChildActivities
        ),
      ]
    : activity.childActivities.map((a) => ({
        ...a,
        parent: activity,
      }));

export const allActivities = (wcif: Competition) => {
  // Rounds
  const activities = flatMap(rooms(wcif), (room: Room) =>
    room.activities.map((a) => ({
      ...a,
      room,
    }))
  );
  return [...activities, ...flatMap(activities, allChildActivities)];
};

const formatAssignmentCode = (assignmentCode: AssignmentCode) => {
  switch (assignmentCode) {
    case 'competitor':
      return 'Competing';
    case 'staff-judge':
      return 'Judging';
    case 'staff-scrambler':
      return 'Scrambling';
    case 'staff-runner':
      return 'Running';
    default:
      return '';
  }
};

export default function CompetitorCard({ registrantId, name, wcaId, assignments }: Person) {
  const wcif = useContext(WcifContext);
  // const role = roles?.filter(
  //   (role) => ['delegate', 'trainee-delegate', 'organizer'].indexOf(role) > -1
  // )[0] as DefinedRole;

  const _allActivities = useMemo(() => allActivities(wcif), [wcif]);

  // const getActivity = useCallback(
  //   (assignment: Assignment) => _allActivities.find(({ id }) => id === assignment.activityId),
  //   [_allActivities]
  // );

  const _assignments = useMemo(
    () =>
      assignments
        ?.map((assignment) => ({
          ...assignment,
          activity: _allActivities.find(({ id }) => id === assignment.activityId),
        }))
        .sort((a, b) => (a.activity && b.activity ? byDate(a.activity, b.activity) : 0))
        .filter((assignment) => assignment.activity?.parent?.name) || [],
    [_allActivities, assignments]
  );

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      <div
        className="flex flex-col border rounded border-collapse p-1"
        style={{
          width: '100%',
          height: '100%',
          fontSize: 8,
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <div className="py-1 bg-slate-50 shadow-sm">
          <div className="px-1 flex">
            <span>{name || '-'}</span>
            <div className="flex flex-grow" />
            <span>{registrantId}</span>
          </div>
          <div className="px-1 flex">
            <span>WCA ID: {wcaId || '-'}</span>
          </div>
        </div>
        <table>
          <thead>
            <tr
              className="text-white shadow-sm"
              style={{
                backgroundColor: '#1E6091',
              }}
            >
              <th className="text-center px-2 py[0.325rem]">Event</th>
              <th className="text-center px-2 py[0.325rem]">Group</th>
              <th className="text-center px-2 py[0.325rem]">Stage</th>
              <th className="text-center px-2 py[0.325rem]">Assignment</th>
            </tr>
          </thead>
          <tbody>
            {_assignments.map((assignment) => {
              const { eventId, groupNumber } = parseActivityCode(assignment.activity.activityCode);

              return (
                <tr
                  key={assignment.activity.activityCode + assignment.assignmentCode}
                  className="even:bg-slate-50"
                >
                  <td
                    className="text-center px-2 py-[0.325rem]"
                    style={{
                      fontSize: '0.75rem',
                    }}
                  >
                    {shortEventNameById(eventId)}
                  </td>
                  <td
                    className="text-center px-2 py-[0.325rem]"
                    style={{
                      fontSize: '0.75rem',
                    }}
                  >
                    {groupNumber}
                  </td>
                  <td className="text-center px-2 py-[0.325rem]">
                    <span
                      className="text-white font-bold px-[0.25rem] py-[0.125rem] rounded"
                      style={{
                        backgroundColor: assignment?.activity?.parent?.room?.color,
                      }}
                    >
                      {assignment?.activity?.parent?.room?.name.split(' ')[0]}
                    </span>
                  </td>
                  <td className="text-center px-1 py-[0.325rem]">
                    <AssignmentLabel assignmentCode={assignment.assignmentCode} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-grow" />
        {/*
        <div className="h-10 w-full px-2">
          <img
            className="w-8 h-8"
            src="data:image/png;base64,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"
          />
        </div> */}
        {/* <div className="flex flex-row items-center justify-center w-full">
          <div className="flex flex-col w-full items-center justify-center">
            <p>Scan to view future groups</p>
            <QRCode
              size={64}
              value={`https://competition-groups.surge.sh/competitions/SnoCoNxN2022/persons/${registrantId}`}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
