import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, LogOut } from "lucide-react";
import LandingContentTab from "@/components/admin/LandingContentTab";
import SearchButtonsTab from "@/components/admin/SearchButtonsTab";
import WebResultsTab from "@/components/admin/WebResultsTab";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("landing");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Site
            </Button>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-8 bg-card">
            <TabsTrigger
              value="landing"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Landing Content
            </TabsTrigger>
            <TabsTrigger
              value="buttons"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Search Buttons
            </TabsTrigger>
            <TabsTrigger
              value="results"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Web Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="landing" className="animate-fade-in">
            <LandingContentTab />
          </TabsContent>

          <TabsContent value="buttons" className="animate-fade-in">
            <SearchButtonsTab />
          </TabsContent>

          <TabsContent value="results" className="animate-fade-in">
            <WebResultsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
