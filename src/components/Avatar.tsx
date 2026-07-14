import React from "react";

export const ProfileAvatar: React.FC<{ className?: string }> = ({ className }) => {
  const [imgFailed, setImgFailed] = React.useState(false);

  // List of candidate local and remote image sources in order of preference
  const sources = React.useMemo(() => [
    "/profile.jpg",
    "/profile.png",
    "/profile_picture.jpg",
    "/profile_picture.png",
    "/assets/profile.jpg",
    "/assets/profile.png",
    "https://github.com/samarthrana027.png"
  ], []);

  const [srcIndex, setSrcIndex] = React.useState(0);

  const handleImageError = () => {
    if (srcIndex < sources.length - 1) {
      setSrcIndex(prev => prev + 1);
    } else {
      setImgFailed(true);
    }
  };

  if (!imgFailed) {
    return (
      <img
        src={sources[srcIndex]}
        alt="Samarth Rana"
        className={`${className} object-cover transition-all duration-500 hover:scale-105`}
        onError={handleImageError}
        referrerPolicy="no-referrer"
      />
    );
  }

  // Polished custom SVG vector illustration matching your beach photo perfectly as a beautiful fallback
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} w-full h-full transition-all duration-500 hover:scale-105`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Sky and clouds overcast gradient */}
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#A8C4D6" />
          <stop offset="60%" stopColor="#CCDDE8" />
          <stop offset="100%" stopColor="#DFE7ED" />
        </linearGradient>
        
        {/* Ocean gradient with coastal foam feel */}
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#326B8A" />
          <stop offset="70%" stopColor="#4A84A3" />
          <stop offset="100%" stopColor="#DFE7ED" />
        </linearGradient>

        {/* Soft beach sand gradient */}
        <linearGradient id="sandGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2D4C5" />
          <stop offset="100%" stopColor="#C6B5A4" />
        </linearGradient>

        {/* Skin gradient for warm natural tone */}
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E4C19E" />
          <stop offset="100%" stopColor="#CA9E77" />
        </linearGradient>

        {/* Sunglasses reflection gradient */}
        <linearGradient id="glassRef" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
          <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#0B0908" stopOpacity="0.95" />
        </linearGradient>

        {/* Highly detailed custom yellow/blue/white checkered plaid pattern matching your shirt */}
        <pattern id="plaidPattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#FBF9F6" />
          {/* Broad yellow grid */}
          <rect x="0" y="2" width="16" height="3" fill="#E6CE93" opacity="0.75" />
          <rect x="2" y="0" width="3" height="16" fill="#E6CE93" opacity="0.75" />
          {/* Broad soft blue grid */}
          <rect x="0" y="8" width="16" height="4" fill="#8DA4C4" opacity="0.6" />
          <rect x="8" y="0" width="4" height="16" fill="#8DA4C4" opacity="0.6" />
          {/* Accent dark grey thin stripes */}
          <rect x="0" y="14" width="16" height="0.5" fill="#888888" opacity="0.35" />
          <rect x="14" y="0" width="0.5" height="16" fill="#888888" opacity="0.35" />
        </pattern>
      </defs>

      {/* 1. Beach Background */}
      {/* Sky */}
      <rect x="0" y="0" width="100" height="50" fill="url(#skyGrad)" />
      
      {/* Waves and shoreline */}
      <path d="M 0 44 Q 25 41 50 45 T 100 42 L 100 54 L 0 54 Z" fill="url(#seaGrad)" />
      <path d="M 0 46 Q 30 48 65 45 T 100 47 L 100 54 L 0 54 Z" fill="#FFFFFF" opacity="0.35" />
      
      {/* Beach Sand */}
      <rect x="0" y="52" width="100" height="48" fill="url(#sandGrad)" />

      {/* 2. Avatar Character */}
      <g id="character" transform="translate(0, 4)">
        {/* Shirt & Shoulders (Plaid Pattern) */}
        <path
          d="M 12 90 C 18 69, 28 64, 50 64 C 72 64, 82 69, 88 90 Z"
          fill="url(#plaidPattern)"
          stroke="#475569"
          strokeWidth="0.5"
        />
        
        {/* Inner T-shirt collar line */}
        <path d="M 43 64 Q 50 72 57 64 Z" fill="#E2E8F0" />

        {/* Plaid Collar folds */}
        <path d="M 38 64 L 43 76 L 50 64 Z" fill="url(#plaidPattern)" stroke="#334155" strokeWidth="0.5" />
        <path d="M 62 64 L 57 76 L 50 64 Z" fill="url(#plaidPattern)" stroke="#334155" strokeWidth="0.5" />

        {/* Neck */}
        <rect x="44" y="54" width="12" height="14" fill="url(#skinGrad)" rx="1.5" />
        {/* Neck shadow */}
        <path d="M 44 62 Q 50 66 56 62 L 56 68 L 44 68 Z" fill="#9C7756" opacity="0.35" />

        {/* Ears */}
        <circle cx="31" cy="40" r="4.5" fill="url(#skinGrad)" />
        <circle cx="69" cy="40" r="4.5" fill="url(#skinGrad)" />

        {/* Face */}
        <path
          d="M 33 29 C 33 17, 67 17, 67 29 C 67 44, 67 55, 50 57 C 33 55, 33 44, 33 29 Z"
          fill="url(#skinGrad)"
        />

        {/* Hair (Short styled dark hair) */}
        <path
          d="M 32 27 C 30 19, 40 11, 50 11 C 60 11, 70 19, 68 27 C 65 21, 59 15, 50 15 C 41 15, 35 21, 32 27 Z"
          fill="#1C1917"
        />
        <path
          d="M 33 23 Q 50 17 67 23 Q 69 15 50 13 Q 31 15 33 23 Z"
          fill="#2E2A27"
        />

        {/* Beard & Mustache */}
        {/* Beard outline */}
        <path
          d="M 33 33 C 33 46, 38 57, 50 57 C 62 57, 67 46, 67 33 C 67 39, 64 53, 50 53 C 36 53, 33 39, 33 33 Z"
          fill="#1F1815"
        />
        {/* Mustache overlay */}
        <path
          d="M 41 45 Q 50 41 59 45 Q 50 49 41 45 Z"
          fill="#16100E"
        />
        {/* Sideburns */}
        <path d="M 31.2 29 L 33.2 29 L 33.2 36 L 31.2 34 Z" fill="#1F1815" />
        <path d="M 68.8 29 L 66.8 29 L 66.8 36 L 68.8 34 Z" fill="#1F1815" />

        {/* Aviator Sunglasses */}
        {/* Left lens & frame */}
        <path
          d="M 34 31.5 C 34 26, 48 26, 48 31.5 C 48 39, 36 39, 34 31.5 Z"
          fill="url(#glassRef)"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Right lens & frame */}
        <path
          d="M 52 31.5 C 52 26, 66 26, 66 31.5 C 66 39, 54 39, 52 31.5 Z"
          fill="url(#glassRef)"
          stroke="#475569"
          strokeWidth="0.8"
        />
        {/* Double bridge bar for authentic aviators style */}
        <rect x="47" y="29" width="6" height="0.8" fill="#64748B" rx="0.3" />
        <rect x="48" y="31" width="4" height="0.6" fill="#64748B" rx="0.2" />
      </g>
    </svg>
  );
};
