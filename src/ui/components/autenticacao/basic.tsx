import { Input } from '../ui/input';
import { Label } from '../ui/label';

export const Basic = () => {
  return (
    <div className="grid gap-3">
      <h1>Basic Authentication</h1>
      <div className="grid gap-4">
        <div className="flex gap-2 items-center">
          <Label htmlFor="username" className="w-12">
            Usuário
          </Label>
          <Input id="username" />
        </div>
        <div className="flex gap-2 items-center">
          <Label htmlFor="password" className="w-12">
            Senha
          </Label>
          <Input id="password" type="password" />
        </div>
      </div>
    </div>
  );
};
