import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getLandingContent, getSearchButtons, SearchButton, LandingContent } from "@/lib/storage";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState<LandingContent | null>(null);
  const [buttons, setButtons] = useState<SearchButton[]>([]);

  useEffect(() => {
    setContent(getLandingContent());
    setButtons(getSearchButtons().sort((a, b) => a.position - b.position));
  }, []);

  const handleButtonClick = (button: SearchButton) => {
    if (button.link) {
      navigate(button.link);
    } else {
      navigate(`/webresult?p=${button.webResultPage}`);
    }
  };

  if (!content) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">MingleMoody</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center space-y-6 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {content.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Related Categories */}
        <div className="mt-16 space-y-4 animate-slide-up">
          <h3 className="text-sm font-medium text-muted-foreground">
            Related categories
          </h3>
          <div className="space-y-3">
            {buttons.map((button, index) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button)}
                className="w-full group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-secondary hover:border-primary transition-all duration-300">
                  <span className="text-foreground font-medium">
                    {button.title}
                  </span>
                  <svg
                    className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
