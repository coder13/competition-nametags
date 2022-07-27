import Nametag from './Nametag';
import classNames from 'classnames';
import { Competition, Person } from '@wca/helpers';
import wcif from '../../assets/wcif.json';

type BorderType = 'top' | 'left' | 'right' | 'bottom';
const Border = ({ children, borders }: { children: React.ReactNode, borders: BorderType[] }) => {
  return (
    <div className={classNames('border border-dashed border-1 border-gray-300 border-collapse', {
      'border-t-0': !borders.includes('top'),
      'border-r-0': !borders.includes('right'),
      'border-l-0': !borders.includes('left'),
      'border-b-0': !borders.includes('bottom'),
    })}>
      {children}
    </div>
  );
}

type PageProps = {
  persons: Person[];
}

const Page = ({ persons }: PageProps) => {
  return (
    <div className="flex flex-col page mb-4 ">
      <div className="flex flex-row">
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[0]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[1]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[2]} />
        </Border>
      </div>
      <div className="flex flex-row">
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[3]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[4]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[5]} />
        </Border>
      </div>
  </div>
  );
}


export default function HomePage() {

  const persons = (wcif as unknown as Competition).persons
    .filter((person) => person.registration.status === 'accepted')
    .sort((a,b) => a.name.localeCompare(b.name));

  return (
    <div>
      <Page persons={persons.slice(0, 6)} />
      <Page persons={persons.slice(6, 12)}  />
      <Page persons={persons.slice(12, 18)}  />
      <Page persons={persons.slice(18, 24)}  />
      <Page persons={persons.slice(24, 30)}  />
      <Page persons={persons.slice(30, 36)}  />
      <Page persons={persons.slice(36, 42)}  />
      <Page persons={persons.slice(42, 48)}  />
      <Page persons={persons.slice(48, 54)}  />
      <Page persons={persons.slice(54, 60)}  />
    </div>
  );
}
