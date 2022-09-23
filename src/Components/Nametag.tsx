import { Person } from '@wca/helpers';
// import { DefinedRole } from '@wca/helpers/lib/models/role';
// import logo from '../assets/SnocoFavorites2022Template.png';
import logo from '../assets/SnocoNxN2022Template.png';
// import { ReactComponent as NametagSvg } from '../assets/SnocoFavorites2022Template.svg';

// const WIDTH = '2.625in';
// const HEIGHT = '3.75in';
const WIDTH = '2.25in';
const HEIGHT = '3.5in';

const calcFontSize = (text: string) => `${Math.min(0.8 / Math.log10(text.length), 1)}rem`;

// const RoleMap: Record<DefinedRole, string> = {
//   delegate: 'Delegate',
//   organizer: 'Organizer',
//   'trainee-delegate': 'Trainee Delegate',
// };

export default function Nametag({ name, wcaId, countryIso2, roles }: Person) {
  // const role = roles?.filter(
  //   (role) => ['delegate', 'trainee-delegate', 'organizer'].indexOf(role) > -1
  // )[0] as DefinedRole;

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
    >
      {/* <NametagSvg style={{ width: '100%', height: '100%' }} />
      <div
        style={{
          position: 'relative',
          top: -210,
          left: 47,
        }}
      >
        <span
          style={{
            fontSize: calcFontSize(firstName),
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 'bold',
            textAlign: 'justify',
            lineHeight: 1,
          }}
        >
          {firstName}
          <br />
          {lastName}
        </span>
        <br />
        <div className="p-5">
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'Garet, sans-serif',
              position: 'relative',
              textAlign: 'justify',
              top: 30,
            }}
          >
            {wcaId || ' '}
          </span>
          <br />
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'Garet, sans-serif',
              position: 'relative',
              textAlign: 'justify',
              top: 35,
            }}
          >
            {countryIso2}
          </span>
          <br />
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'Garet, sans-serif',
              position: 'relative',
              textAlign: 'justify',
              top: 35,
            }}
          >
            {'August 6th, 2022'}
          </span>
        </div>
      </div> */}

      <div
        style={{
          position: 'absolute',
          background: `round no-repeat url(${logo})`,
          backgroundSize: 'cover',
          width: `calc(${WIDTH})`,
          height: `calc(${HEIGHT})`,
          zIndex: -4,
        }}
      />
      <div
        className="flex flex-col border"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex flex-col flex-1">
          <span
            style={{
              fontSize: calcFontSize(firstName),
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              position: 'relative',
              textAlign: 'center',
              top: 210,
              left: 0,
              lineHeight: 1,
            }}
          >
            {firstName}
          </span>
          <span
            style={{
              fontSize: calcFontSize(lastName),
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              position: 'relative',
              textAlign: 'center',
              top: 215,
              left: 0,
              lineHeight: 1,
            }}
          >
            {lastName}
          </span>
        </div>
        <div className="flex flex-col" style={{}}>
          <span
            style={{
              fontSize: '0.75rem',
              fontFamily: 'Garet, sans-serif',
              position: 'relative',
              textAlign: 'center',
              top: -30,
              left: 0,
            }}
          >
            {wcaId || '-'}
          </span>
          <span
            style={{
              fontSize: '0.75rem',
              position: 'relative',
              textAlign: 'center',
              top: -30,
              left: 0,
            }}
          >
            {countryIso2}
          </span>
        </div>
        {/* {role && RoleMap[role] ? (
            <div style={{}}>
              <span
                style={{
                  fontSize: calcFontSize(RoleMap[role]),
                  font: 'Cormorant SC',
                  fontWeight: 'bold',
                  position: 'relative',
                  top: 55,
                }}
              >
                {RoleMap[role]}
              </span>
            </div>
          ) : null} */}
      </div>
    </div>
  );
}
