import { useSelector } from 'react-redux';
import NameCard from './NameCard';

const Results = () => {
  const results = useSelector((state: any) => state.startupNameGenerator.results);
  return (
    <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 pb-16 mt-44">
      {results.map((name: string, idx: number) => (
        <NameCard key={idx} name={name} />
      ))}
    </div>
  );
};

export default Results;
