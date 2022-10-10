import { Person } from '@wca/helpers';
// import { DefinedRole } from '@wca/helpers/lib/models/role';
// import logo from '../assets/SnocoFavorites2022Template.png';
import logo from '../assets/NewKentOnTheBlock2022Template.png';
// import { ReactComponent as NametagSvg } from '../assets/SnocoFavorites2022Template.svg';

// const WIDTH = '2.625in';
// const HEIGHT = '3.75in';
const WIDTH = '2.625in';
const HEIGHT = '3.5in';

const calcFontSize = (text: string) => `${Math.min(2.25 / Math.log10(text.length), 2)}rem`;

// const RoleMap: Record<DefinedRole, string> = {
//   delegate: 'Delegate',
//   organizer: 'Organizer',
//   'trainee-delegate': 'Trainee Delegate',
// };

export default function Nametag({ name, wcaId, countryIso2, roles }: Person) {
  // const role = roles?.filter(
  //   (role) => ['delegate', 'trainee-delegate', 'organizer'].indexOf(role) > -1
  // )[0] as DefinedRole;

  if (!name) {
    return null;
  }

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
        className="flex flex-col border text-white"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex flex-col flex-1 p-2">
          <span
            style={{
              fontSize: calcFontSize(firstName),
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 900,
              position: 'relative',
              textAlign: 'center',
              top: 40,
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
              top: 60,
              left: 0,
              lineHeight: 1,
            }}
          >
            {lastName}
          </span>
        </div>
        <div className="flex p-7 justify-between" style={{}}>
          <span
            style={{
              fontSize: '1.125rem',
              fontFamily: 'Montserrat, sans-serif',
              position: 'relative',
              top: -50,
              left: 0,
            }}
          >
            {wcaId || '-'}
          </span>
          <span
            style={{
              fontSize: '1.125rem',
              fontFamily: 'Montserrat, sans-serif',
              position: 'relative',
              top: -50,
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
