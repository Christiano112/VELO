export const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

export const generateColorFromName = (name: string) => {
  const colors = [
    "#01634C",
    "#2563EB",
    "#DC2626",
    "#7C3AED",
    "#059669",
    "#EA580C",
    "#9333EA",
    "#0891B2",
    "#BE123C",
    "#4338CA",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};
