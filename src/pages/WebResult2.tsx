import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { getWebResultsByPage, WebResult } from "@/lib/storage";
import { Button } from "@/components/ui/button";

const WebResult2 = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<WebResult[]>([]);
  const pageNumber = 2;

  useEffect(() => {
    setResults(getWebResultsByPage(pageNumber));
  }, []);

  const sponsoredResults = results.filter(r => r.sponsored);
  const regularResults = results.filter(r => !r.sponsored);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-primary">MingleMoody</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Sponsored Results */}
        {sponsoredResults.length > 0 && (
          <section className="mb-12 animate-fade-in">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Sponsored Results
            </h2>
            <div className="space-y-6">
              {sponsoredResults.map((result) => (
                <div
                  key={result.id}
                  className="p-6 rounded-lg bg-card hover:bg-secondary transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {result.logoUrl && (
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background flex items-center justify-center overflow-hidden">
                        <img
                          src={result.logoUrl}
                          alt={result.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">
                          Sponsored
                        </span>
                        <span className="text-sm text-muted-foreground truncate">
                          {result.name}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-2 hover:underline">
                        {result.title}
                      </h3>
                      <p className="text-sm text-foreground mb-3">
                        {result.description}
                      </p>
                      <a
                        href={result.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline"
                      >
                        {result.link}
                      </a>
                      <div className="mt-4">
                        <Button
                          onClick={() => window.open(result.link, '_blank')}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Visit Website
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Web Results */}
        {regularResults.length > 0 && (
          <section className="animate-slide-up">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Web Results
            </h2>
            <div className="space-y-6">
              {regularResults.map((result, index) => (
                <a
                  key={result.id}
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="py-4 hover:bg-card rounded-lg px-4 -mx-4 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      {result.logoUrl && (
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background flex items-center justify-center overflow-hidden">
                          <img
                            src={result.logoUrl}
                            alt={result.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm text-muted-foreground mb-1">
                          {result.name}
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-2 group-hover:underline">
                          {result.title}
                        </h3>
                        <p className="text-sm text-foreground mb-2">
                          {result.description}
                        </p>
                        <span className="text-sm text-primary">
                          {result.link}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">
              No results found for this page.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WebResult2;
