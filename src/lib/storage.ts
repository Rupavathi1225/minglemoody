// Storage utilities for managing app data

export interface LandingContent {
  title: string;
  description: string;
}

export interface SearchButton {
  id: string;
  title: string;
  link?: string;
  position: number;
  webResultPage: number; // Which web result page (1-5)
}

export interface WebResult {
  id: string;
  name: string;
  link: string;
  title: string;
  description: string;
  logoUrl?: string;
  sponsored: boolean;
  pageNumber: number; // Which page this result belongs to (1-5)
}

const STORAGE_KEYS = {
  LANDING: 'minglemoody_landing',
  BUTTONS: 'minglemoody_buttons',
  RESULTS: 'minglemoody_results',
};

// Landing Content
export const getLandingContent = (): LandingContent => {
  const stored = localStorage.getItem(STORAGE_KEYS.LANDING);
  if (stored) return JSON.parse(stored);
  
  return {
    title: "Discover What's Trending in Social & Entertainment",
    description: "MingleMoody helps you stay connected with the latest trends, entertainment, and social platforms. Whether you're exploring videos, music, or connecting with friends, these curated links will help you discover what matters most.",
  };
};

export const saveLandingContent = (content: LandingContent) => {
  localStorage.setItem(STORAGE_KEYS.LANDING, JSON.stringify(content));
};

// Search Buttons
export const getSearchButtons = (): SearchButton[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.BUTTONS);
  if (stored) return JSON.parse(stored);
  
  return [
    { id: '1', title: 'google', position: 1, webResultPage: 1 },
    { id: '2', title: 'youtube', link: '/webresult', position: 2, webResultPage: 1 },
    { id: '3', title: 'Explore trending content', position: 3, webResultPage: 2 },
    { id: '4', title: 'Connect with friends', position: 4, webResultPage: 3 },
    { id: '5', title: 'Discover new music', position: 5, webResultPage: 4 },
  ];
};

export const saveSearchButtons = (buttons: SearchButton[]) => {
  localStorage.setItem(STORAGE_KEYS.BUTTONS, JSON.stringify(buttons));
};

// Web Results
export const getWebResults = (): WebResult[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.RESULTS);
  if (stored) return JSON.parse(stored);
  
  return [
    {
      id: '1',
      name: 'hii',
      link: 'https://example.com',
      title: 'hii',
      description: 'heyy',
      sponsored: false,
      pageNumber: 1,
    },
    {
      id: '2',
      name: 'google',
      link: 'https://google.com',
      title: 'google',
      description: 'hey all how are you',
      logoUrl: 'https://www.google.com/favicon.ico',
      sponsored: true,
      pageNumber: 1,
    },
  ];
};

export const saveWebResults = (results: WebResult[]) => {
  localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
};

export const getWebResultsByPage = (page: number): WebResult[] => {
  const allResults = getWebResults();
  return allResults.filter(r => r.pageNumber === page);
};
