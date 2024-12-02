import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export const Bearer = () => {
  return (
    <div className="grid gap-3">
      <h1>Bearer Token</h1>
      <Textarea rows={10} className="resize-none" />
      <div className="flex gap-2 items-center mt-2">
        <Label htmlFor="tokenPrefix">Token Prefix</Label>
        <Input id="tokenPrefix" defaultValue="bearer" className="flex-1" />
      </div>
    </div>
  );
};
