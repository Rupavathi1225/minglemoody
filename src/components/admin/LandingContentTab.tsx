import { useState, useEffect } from "react";
import { getLandingContent, saveLandingContent, LandingContent } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const LandingContentTab = () => {
  const [content, setContent] = useState<LandingContent>({
    title: "",
    description: "",
  });

  useEffect(() => {
    setContent(getLandingContent());
  }, []);

  const handleSave = () => {
    saveLandingContent(content);
    toast.success("Landing page content updated successfully!");
  };

  return (
    <div className="max-w-4xl">
      <div className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Edit Landing Page Content
        </h2>

        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-foreground mb-2">
              Title
            </Label>
            <Input
              id="title"
              value={content.title}
              onChange={(e) => setContent({ ...content, title: e.target.value })}
              className="bg-background border-input text-foreground"
              placeholder="Enter page title"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-sm font-medium text-foreground mb-2">
              Description
            </Label>
            <Textarea
              id="description"
              value={content.description}
              onChange={(e) => setContent({ ...content, description: e.target.value })}
              className="bg-background border-input text-foreground min-h-[120px]"
              placeholder="Enter page description"
            />
          </div>

          <Button
            onClick={handleSave}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingContentTab;
