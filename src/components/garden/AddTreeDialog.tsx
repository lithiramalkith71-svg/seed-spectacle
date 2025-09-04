import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload } from 'lucide-react';
import { Tree } from '@/types/garden';

interface AddTreeDialogProps {
  onAddTree: (tree: Omit<Tree, 'id' | 'age' | 'lastWatered'>) => void;
}

export const AddTreeDialog = ({ onAddTree }: AddTreeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [treeType, setTreeType] = useState<Tree['type']>('oak');
  const [photo, setPhoto] = useState<File | null>(null);
  const [position, setPosition] = useState({ x: 0, z: 0 });

  const handleSubmit = () => {
    const newTree: Omit<Tree, 'id' | 'age' | 'lastWatered'> = {
      type: treeType,
      health: 100,
      position: [position.x, 0, position.z],
      growthStage: 'seedling',
      photoUrl: photo ? URL.createObjectURL(photo) : undefined,
    };

    onAddTree(newTree);
    setOpen(false);
    setPhoto(null);
    setPosition({ x: 0, z: 0 });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-growth hover:opacity-90 shadow-tree">
          <Plus className="w-4 h-4 mr-2" />
          Plant New Tree
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-card shadow-glow">
        <DialogHeader>
          <DialogTitle className="text-foreground">Plant a New Tree</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="tree-type">Tree Type</Label>
            <Select value={treeType} onValueChange={(value) => setTreeType(value as Tree['type'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oak">Oak Tree 🌳</SelectItem>
                <SelectItem value="pine">Pine Tree 🌲</SelectItem>
                <SelectItem value="cherry">Cherry Tree 🌸</SelectItem>
                <SelectItem value="maple">Maple Tree 🍁</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pos-x">Position X</Label>
              <Input
                id="pos-x"
                type="number"
                value={position.x}
                onChange={(e) => setPosition(prev => ({ ...prev, x: Number(e.target.value) }))}
                min="-8"
                max="8"
              />
            </div>
            <div>
              <Label htmlFor="pos-z">Position Z</Label>
              <Input
                id="pos-z"
                type="number"
                value={position.z}
                onChange={(e) => setPosition(prev => ({ ...prev, z: Number(e.target.value) }))}
                min="-8"
                max="8"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="photo">Tree Photo (Optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="flex-1"
              />
              <Upload className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-gradient-forest hover:opacity-90"
          >
            Plant Tree 🌱
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};