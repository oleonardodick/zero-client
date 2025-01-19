import { MoonIcon, SunIcon } from 'lucide-react';
import { Switch } from './ui/switch';
import { useEffect, useState } from 'react';

export const SeletorTema = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    const storageTheme = localStorage.getItem('darkTheme');
    if (storageTheme) {
      const ehDarkTheme = JSON.parse(storageTheme);
      if (!ehDarkTheme) setDarkTheme(!ehDarkTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  console.log(darkTheme);

  return (
    <div className="flex gap-2 flex-1 text-stone-700 dark:text-stone-200 items-center">
      <SunIcon />
      <Switch
        checked={darkTheme}
        onCheckedChange={() => setDarkTheme(!darkTheme)}
      />
      <MoonIcon />
    </div>
  );
};
