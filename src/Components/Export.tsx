import { FC, forwardRef, useMemo } from 'react';
import { Competition, Person } from '@wca/helpers';
import classnames from 'classnames';
import Nametag from './Nametag';
import CompetitorCard from './CompetitorCard';

type BorderType = 'top' | 'left' | 'right' | 'bottom';
const Border = ({ children, borders }: { children: React.ReactNode; borders: BorderType[] }) => {
  return (
    <div
      className={classnames('border border-dashed border-1 border-gray-300 border-collapse', {
        'border-t-0': !borders.includes('top'),
        'border-r-0': !borders.includes('right'),
        'border-l-0': !borders.includes('left'),
        'border-b-0': !borders.includes('bottom'),
      })}
    >
      {children}
    </div>
  );
};

type PageProps = {
  persons: Person[];
};

const NametagPage = ({ persons }: PageProps) => {
  return (
    <div className="flex flex-col page">
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
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[3]} />
        </Border>
      </div>
      <div className="flex flex-row">
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[4]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[5]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[6]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <Nametag {...persons[7]} />
        </Border>
      </div>
    </div>
  );
};
const CompetitorCardPage = ({ persons }: PageProps) => {
  return (
    <div className="flex flex-col page">
      <div className="flex flex-row">
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[0]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[1]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[2]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[3]} />
        </Border>
      </div>
      <div className="flex flex-row">
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[4]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[5]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[6]} />
        </Border>
        <Border borders={['top', 'left', 'right', 'bottom']}>
          <CompetitorCard {...persons[7]} />
        </Border>
      </div>
    </div>
  );
};

interface Props {
  wcif: Competition;
  className?: string;
}

export const NametagExport: FC<Props> = ({ wcif, className }) => {
  const personsPages = useMemo(() => {
    const p = (wcif as unknown as Competition).persons
      .filter((person) => person.registration.status === 'accepted')
      .sort((a, b) => a.name.localeCompare(b.name));

    const pages = [];
    for (let i = 0; i < p.length; i += 8) {
      pages.push(p.slice(i, i + 8));
    }
    return pages;
  }, [wcif]);

  return (
    <div className={className}>
      {personsPages.map((persons, index) => (
        <NametagPage key={index} persons={persons} />
      ))}
    </div>
  );
};

export const NametagExportWrapped = forwardRef<HTMLDivElement, Props>(({ ...props }, ref) => (
  <div ref={ref}>
    <NametagExport {...props} />
  </div>
));

export const CompetitorCardExport: FC<Props> = ({ wcif, className }) => {
  const personsPages = useMemo(() => {
    const p = (wcif as unknown as Competition).persons
      .filter((person) => person.registration.status === 'accepted')
      .sort((a, b) => a.name.localeCompare(b.name));

    const pages = [];
    for (let i = 0; i < p.length; i += 8) {
      pages.push(p.slice(i, i + 8));
    }
    return pages;
  }, [wcif]);

  return (
    <div className={className}>
      {personsPages.map((persons, index) => (
        <CompetitorCardPage key={index} persons={persons} />
      ))}
    </div>
  );
};

export const CompetitorCardExportWrapped = forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => (
    <div ref={ref}>
      <CompetitorCardExport {...props} />
    </div>
  )
);
