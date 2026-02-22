export const COLORS = {
  pink: "#FFF5F8",
  hotpink: "#FF69B4",
  lavender: "#C4B5FD",
  mint: "#67E8B5",
  butter: "#FDE68A",
  blush: "#FFB6C1",
  rose: "#FF8FAB",
  cream: "#FFF8F0",
  lilac: "#E8D5F5",
  sky: "#BAE6FD",
  white: "#FFFFFF",
  dark: "#4A3728",
  gray: "#9CA3AF",
  lightGray: "#F3F4F6",
} as const;

export const SHADOWS = {
  soft: {
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  card: {
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  button: {
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
} as const;
