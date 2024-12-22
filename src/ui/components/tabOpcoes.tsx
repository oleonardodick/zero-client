import { TabsTrigger } from './ui/tabs';

interface TabOpcoesProps {
  value: string;
}
const TabOpcoes = ({ value }: TabOpcoesProps) => {
  return (
    <TabsTrigger
      value={value}
      className="lg:flex-1 data-[state=active]:bg-transparent data-[state=active]:text-gray-100 
          data-[state=active]:shadow-none data-[state=active]:border-b-4 border-indigo-400 rounded-none"
    >
      {value}
    </TabsTrigger>
  );
};

export default TabOpcoes;
