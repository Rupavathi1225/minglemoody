import { useState, useEffect } from "react";
import { getWebResults, saveWebResults, WebResult } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

const WebResultsTab = () => {
  const [results, setResults] = useState<WebResult[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    title: "",
    description: "",
    logoUrl: "",
    sponsored: false,
  });

  useEffect(() => {
    setResults(getWebResults());
  }, []);

  const filteredResults = results.filter(r => r.pageNumber === selectedPage);

  const handleAddResult = () => {
    if (!formData.name || !formData.link || !formData.title) {
      toast.error("Name, link, and title are required");
      return;
    }

    const result: WebResult = {
      id: Date.now().toString(),
      ...formData,
      pageNumber: selectedPage,
    };

    const updated = [...results, result];
    setResults(updated);
    saveWebResults(updated);
    
    resetForm();
    toast.success("Web result added successfully!");
  };

  const handleUpdateResult = () => {
    if (!editingId) return;

    const updated = results.map(r => 
      r.id === editingId 
        ? { ...r, ...formData }
        : r
    );
    
    setResults(updated);
    saveWebResults(updated);
    resetForm();
    toast.success("Web result updated successfully!");
  };

  const handleEditResult = (result: WebResult) => {
    setEditingId(result.id);
    setFormData({
      name: result.name,
      link: result.link,
      title: result.title,
      description: result.description,
      logoUrl: result.logoUrl || "",
      sponsored: result.sponsored,
    });
  };

  const handleDeleteResult = (id: string) => {
    const updated = results.filter(r => r.id !== id);
    setResults(updated);
    saveWebResults(updated);
    toast.success("Web result deleted successfully!");
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      name: "",
      link: "",
      title: "",
      description: "",
      logoUrl: "",
      sponsored: false,
    });
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Page Selector */}
      <div className="flex items-center gap-4">
        <Label className="text-sm font-medium text-foreground">
          Select Web Result Page:
        </Label>
        <Select value={selectedPage.toString()} onValueChange={(v) => setSelectedPage(parseInt(v))}>
          <SelectTrigger className="w-40 bg-card border-input text-foreground">
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

      {/* Add/Edit Form */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          {editingId ? "Edit Result" : "Add New Result"}
        </h2>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Example.com"
                className="bg-background border-input text-foreground"
              />
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-2">Link</Label>
              <Input
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://example.com"
                className="bg-background border-input text-foreground"
              />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Result title"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2">Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Result description"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-foreground mb-2">Logo URL</Label>
            <Input
              value={formData.logoUrl}
              onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
              placeholder="https://example.com/logo.png (optional)"
              className="bg-background border-input text-foreground"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="sponsored"
              checked={formData.sponsored}
              onCheckedChange={(checked) => 
                setFormData({ ...formData, sponsored: checked as boolean })
              }
            />
            <Label htmlFor="sponsored" className="text-sm font-medium text-foreground cursor-pointer">
              Sponsored
            </Label>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={editingId ? handleUpdateResult : handleAddResult}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              {editingId ? "Update Result" : "Add Result"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Existing Results */}
      <div className="bg-card border border-border rounded-lg p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Existing Results (Page {selectedPage})
        </h3>
        
        <div className="space-y-4">
          {filteredResults.map((result) => (
            <div
              key={result.id}
              className="p-4 bg-secondary rounded-lg border border-border"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{result.name}</span>
                    {result.sponsored && (
                      <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
                        Sponsored
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-primary mb-1">{result.title}</div>
                  <div className="text-sm text-muted-foreground mb-2">{result.description}</div>
                  <div className="text-xs text-primary">{result.link}</div>
                  {result.logoUrl && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Logo: {result.logoUrl}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditResult(result)}
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteResult(result.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {filteredResults.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No results added for this page yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebResultsTab;
