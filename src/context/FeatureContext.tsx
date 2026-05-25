"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Features = {
  isESuratActive: boolean;
  isLaporActive: boolean;
  isIuranActive: boolean;
};

type FeatureContextType = {
  features: Features;
  toggleFeature: (featureName: keyof Features) => void;
};

const defaultFeatures: Features = {
  isESuratActive: true,
  isLaporActive: true,
  isIuranActive: true,
};

const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

export function FeatureProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initialization so it doesn't break hydration
  const [features, setFeatures] = useState<Features>(defaultFeatures);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rw12_features");
      if (saved) {
        setFeatures(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to parse features from local storage", e);
    }
  }, []);

  const toggleFeature = (featureName: keyof Features) => {
    setFeatures((prev) => {
      const newFeatures = { ...prev, [featureName]: !prev[featureName] };
      // Save to localStorage so settings persist across reloads
      localStorage.setItem("rw12_features", JSON.stringify(newFeatures));
      return newFeatures;
    });
  };

  return (
    <FeatureContext.Provider value={{ features, toggleFeature }}>
      {children}
    </FeatureContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error("useFeatures must be used within a FeatureProvider");
  }
  return context;
}
