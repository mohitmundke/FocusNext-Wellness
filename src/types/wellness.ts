export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role?: string;
  workSchedule?: {
    startHour: number;
    endHour: number;
    days: string[];
  };
}

export type FocusMode = "pomodoro" | "deep" | "shortBreak" | "longBreak" | "custom";

export interface FocusSession {
  id: string;
  durationMinutes: number;
  mode: FocusMode;
  completedAt: string;
  label?: string;
}

export interface ActivityStats {
  waterGlasses: number; // Goal: 8
  waterGoal: number;
  stepsCount: number;   // Goal: 5000
  stepsGoal: number;
  stretchesDone: number;// Goal: 6
  stretchesGoal: number;
  breaksTaken: number;  // Goal: 6
  breaksGoal: number;
}

export interface PostureCheckItem {
  id: string;
  label: string;
  iconName: string;
  checked: boolean;
}

export interface EyeExercise {
  id: string;
  title: string;
  description: string;
  durationSeconds: number;
  icon: string;
  instructions: string[];
}

export interface WellnessInsight {
  id: string;
  category: "focus" | "break" | "posture" | "activity";
  title: string;
  message: string;
  timestamp: string;
  type: "recommendation" | "achievement" | "alert";
}

export interface WellnessSettings {
  workStart: string;
  workEnd: string;
  pomodoroMinutes: number;
  deepWorkMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  postureReminderIntervalMinutes: number;
  soundEnabled: boolean;
  soundVolume: number;
}
