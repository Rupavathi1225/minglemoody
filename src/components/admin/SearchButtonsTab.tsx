import { useState, useEffect } from "react";
import { getSearchButtons, saveSearchButtons, SearchButton } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const SearchButtonsTab = () => {
  const [buttons, setButtons] = useState<SearchButton[]>([]);
  const [newButton, setNewButton] = useState({
    title: "",
    link: "",
    position: 1,
    webResultPage: 1,
  });

  useEffect(() => {
    setButtons(getSearchButtons().sort((a, b) => a.position - b.position));
  }, []);

  const handleAddButton = () => {
    if (!newButton.title) {
      toast.error("Button title is required");
      return;
    }

    const button: SearchButton = {
      id: Date.now().toString(),
      title: newButton.title,
      link: newButton.link || undefined,
      position: newButton.position,
      webResultPage: newButton.webResultPage,
    };

    const updated = [...buttons, button].sort((a, b) => a.position - b.position);
    setButtons(updated);
    saveSearchButtons(updated);
    
    setNewButton({ title: "", link: "", position: buttons.length + 2, webResultPage: 1 });
    toast.success("Search button added successfully!");
  };

  const handleDeleteButton = (id: string) => {
    const updated = buttons.filter(b => b.id !== id);
    setButtons(updated);
    saveSearchButtons(updated);
    toast.success("Search button deleted successfully!");
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Add New Button */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Manage Search Buttons
        </h2>

        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Button title
              </Label>
              <Input
                value={newButton.title}
                onChange={(e) => setNewButton({ ...newButton, title: e.target.value })}
                placeholder="Enter button title"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Position
              </Label>
              <Input
                type="number"
                min="1"
                value={newButton.position}
                onChange={(e) => setNewButton({ ...newButton, position: parseInt(e.target.value) || 1 })}
                className="bg-background border-input text-foreground"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Link (optional)
              </Label>
              <Input
                value={newButton.link}
                onChange={(e) => setNewButton({ ...newButton, link: e.target.value })}
                placeholder="https://example.com or leave empty for /webresult"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">
                Web Result Page
              </Label>
              <Select
                value={newButton.webResultPage.toString()}
                onValueChange={(value) => setNewButton({ ...newButton, webResultPage: parseInt(value) })}
              >
                <SelectTrigger className="bg-background border-input text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      Page {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleAddButton}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Button
          </Button>
        </div>

        {/* Existing Buttons */}
        <div className="space-y-3">
          {buttons.map((button) => (
            <div
              key={button.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg border border-border"
            >
              <div>
                <div className="font-semibold text-foreground">
                  {button.position}. {button.title}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {button.link || `/webresult?p=${button.webResultPage}`} → Page {button.webResultPage}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteButton(button.id)}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchButtonsTab;
