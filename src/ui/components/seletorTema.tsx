import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Label } from './ui/label';

export const SeletorTema = () => {
  const [tema, setTema] = useState('dark');

  useEffect(() => {
    const storageTheme = localStorage.getItem('tema');
    if (storageTheme && storageTheme !== 'dark') setTema(storageTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('tema', tema);
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(tema);
  }, [tema]);

  return (
    <div className="flex gap-3 flex-1 text-stone-700 dark:text-stone-200 items-center px-2">
      <Label>Tema</Label>
      <Select value={tema} onValueChange={setTema}>
        <SelectTrigger className="rounded-none">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
