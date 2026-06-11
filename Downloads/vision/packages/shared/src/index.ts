export type UserRole = "USER" | "MODERATOR" | "ADMIN";

export type TranslationType =
  | "SIGN_TO_TEXT"
  | "TEXT_TO_SIGN"
  | "SPEECH_TO_SIGN"
  | "SIGN_TO_SPEECH";

export interface PublicUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

export interface AuthResponse {
  user: PublicUser;
  accessToken: string;
  refreshToken: string;
}

export interface Translation {
  id: string;
  userId: string;
  type: TranslationType;
  input: string;
  output: string;
  confidence: number;
  createdAt: string;
}

export const GESTURE_LABELS = ["A", "B", "C", "HELLO", "THANK_YOU", "YES", "NO"] as const;
export type GestureLabel = (typeof GESTURE_LABELS)[number];

export function isGestureLabel(value: string): value is GestureLabel {
  return (GESTURE_LABELS as readonly string[]).includes(value);
}
