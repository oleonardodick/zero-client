import { useTheme } from '../contexts/theme-context';
import { Switch } from './ui/switch';
import { MoonIcon, SunIcon } from 'lucide-react';

export const SeletorTema = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center gap-3 flex-1 text-stone-700 dark:text-stone-200 items-center px-2">
      <div className="flex gap-2">
        <MoonIcon />
        <Switch
          data-state={theme === 'light' ? 'checked' : 'unchecked'}
          onClick={toggleTheme}
        />
        <SunIcon />
      </div>
    </div>
  );
};
