import { Person } from '@wca/helpers';
import { DefinedRole } from '@wca/helpers/lib/models/role';
import logo from '../../assets/pnwcubingLogo.png';

const WIDTH = '2.625in';
const HEIGHT = '3.75in';

const calcFontSize = (text: string) => `${Math.min(3.75/Math.log(text.length), 1.5)}rem`

const RoleMap: Record<DefinedRole, string> = {
  'delegate': 'Delegate',
  'organizer': 'Organizer',
  'trainee-delegate': 'Trainee Delegate'
}

export default function Nametag({ name, wcaId, countryIso2, roles }: Person) {
  const role = roles.filter((role) => ['delegate', 'trainee-delegate', 'organizer'].indexOf(role) > -1)[0] as DefinedRole;

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ').slice(1).join(' ');

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
      }}
      className="p-[0.125in]"
    >
      <div style={{
        position: 'absolute',
        background: `round no-repeat url(${logo})`,
        backgroundSize: 'cover',
        width: `calc(${WIDTH} - 0.25in)`,
        height: `calc(${HEIGHT} - 0.25in)`,
        zIndex: -4,
        opacity: '35%',
      }}/>
      <div className="flex flex-col border-gray-300 border-2 border-collapse rounded-lg "
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <div className="flex flex-col flex-1 items-center pt-6">
          <span
            style={{
              fontSize: calcFontSize(firstName),
              font: 'Cormorant SC',
              fontWeight: 'bold',
              position: 'relative',
              textAlign: 'justify',
              top: -10
            }}
          >
            {firstName}
          </span>
          <span
            style={{
              fontSize: calcFontSize(lastName),
              font: 'Cormorant SC',
              fontWeight: 'bold',
              position: 'relative',
              textAlign: 'justify',
              top: -15
            }}
          >
            {lastName}
          </span>
          <span
            style={{
              fontSize: '1.5rem',
              font: 'Cormorant SC',
              fontWeight: 'bold',
              position: 'relative',
              textAlign: 'justify',
              top: 45
            }}
          >
            {countryIso2}
          </span>
          <span
            style={{
              fontSize: '1.5rem',
              font: 'Cormorant SC',
              fontWeight: 'bold',
              position: 'relative',
              textAlign: 'justify',
              top: 40
            }}
          >
            {wcaId || ' '}
          </span>
          {role && RoleMap[role] ? (
            <div style={{
              
            }}>
              <span
                style={{
                  fontSize: calcFontSize(RoleMap[role]),
                  font: 'Cormorant SC',
                  fontWeight: 'bold',
                  position: 'relative',
                  top: 55
                }}
              >
                {RoleMap[role]}
              </span>
            </div>
          ) : null}
        </div>
        <div
          style={{
            height: '20%',
          }}
          className="flex flex-col flex-0 justify-center text-xl p-1 text-center -z-10 bg-gray-300 font-bold"
        >
          Inland Empire Summer 2022
        </div>
      </div>
    </div>
  );
}
