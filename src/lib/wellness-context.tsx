"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import {
  UserProfile,
  FocusMode,
  FocusSession,
  ActivityStats,
  PostureCheckItem,
  WellnessInsight,
  WellnessSettings,
} from "@/types/wellness";
import { soundFx } from "./sound";

interface AIMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  time: string;
}

interface WellnessContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  
  // Focus Timer
  timerMode: FocusMode;
  timeLeft: number;
  totalDuration: number;
  isTimerRunning: boolean;
  setTimerMode: (mode: FocusMode) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  setCustomTimerMinutes: (minutes: number) => void;
  
  // Activity Stats
  stats: ActivityStats;
  incrementWater: () => void;
  decrementWater: () => void;
  addSteps: (amount?: number) => void;
  completeStretch: () => void;
  recordBreak: () => void;
  
  // Posture
  postureItems: PostureCheckItem[];
  togglePostureItem: (id: string) => void;
  resetPostureCheck: () => void;
  postureScore: number;
  
  // Computed Wellness Score
  wellnessScore: number;
  focusMinutesToday: number;
  
  // History & Insights
  focusHistory: FocusSession[];
  insights: WellnessInsight[];
  
  // Settings
  settings: WellnessSettings;
  updateSettings: (newSettings: Partial<WellnessSettings>) => void;
  
  // AI Assistant Chat
  aiMessages: AIMessage[];
  isAITyping: boolean;
  sendAIMessage: (text: string) => Promise<void>;
}

const DEFAULT_POSTURE_ITEMS: PostureCheckItem[] = [
  { id: "feet", label: "Feet flat on the floor", iconName: "Footprints", checked: true },
  { id: "back", label: "Lower back supported against chair", iconName: "Armchair", checked: true },
  { id: "shoulders", label: "Shoulders dropped and relaxed", iconName: "Smile", checked: false },
  { id: "eyes", label: "Top of monitor at or slightly below eye level", iconName: "Eye", checked: true },
  { id: "elbows", label: "Elbows bent at 90–100 degrees", iconName: "Maximize2", checked: true },
];

const DEFAULT_SETTINGS: WellnessSettings = {
  workStart: "09:00",
  workEnd: "18:00",
  pomodoroMinutes: 25,
  deepWorkMinutes: 50,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  postureReminderIntervalMinutes: 30,
  soundEnabled: true,
  soundVolume: 75,
};

const INITIAL_INSIGHTS: WellnessInsight[] = [
  {
    id: "ins-1",
    category: "focus",
    title: "Optimal Morning Rhythm",
    message: "You completed 2 uninterrupted deep focus sessions before noon. Your focus velocity is highest between 09:30 and 11:45.",
    timestamp: "11:45 AM",
    type: "recommendation",
  },
  {
    id: "ins-2",
    category: "break",
    title: "Movement Recovery",
    message: "Taking a 5-minute walking pause reduced heart rate variability and restored screen focus efficiency by 24%.",
    timestamp: "02:15 PM",
    type: "achievement",
  },
  {
    id: "ins-3",
    category: "posture",
    title: "Mid-Afternoon Reset",
    message: "Screen posture checks are 85% compliant today. Remember to soften shoulder tension as the day progresses.",
    timestamp: "03:40 PM",
    type: "recommendation",
  },
];

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  // ─── Authentication State ──────────────────────────────────────────────────
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const saved = localStorage.getItem("focusnext_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAuthenticated = useMemo(() => !!user, [user]);

  const login = useCallback((email: string, name?: string) => {
    const newUser: UserProfile = {
      id: "usr-" + Date.now().toString(36),
      email,
      name: name || email.split("@")[0] || "Focus Member",
      role: "Knowledge Professional",
    };
    setUser(newUser);
    if (typeof window !== "undefined") {
      localStorage.setItem("focusnext_user", JSON.stringify(newUser));
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("focusnext_user");
    }
  }, []);

  // ─── Settings ──────────────────────────────────────────────────────────────
  const [settings, setSettings] = useState<WellnessSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    try {
      const saved = localStorage.getItem("focusnext_settings");
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = useCallback((newSettings: Partial<WellnessSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (typeof window !== "undefined") {
        localStorage.setItem("focusnext_settings", JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  // ─── Timer State ───────────────────────────────────────────────────────────
  const [timerMode, setTimerModeState] = useState<FocusMode>("pomodoro");
  const [totalDuration, setTotalDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const getDurationForMode = useCallback(
    (mode: FocusMode): number => {
      switch (mode) {
        case "pomodoro":
          return settings.pomodoroMinutes * 60;
        case "deep":
          return settings.deepWorkMinutes * 60;
        case "shortBreak":
          return settings.shortBreakMinutes * 60;
        case "longBreak":
          return settings.longBreakMinutes * 60;
        case "custom":
          return totalDuration;
      }
    },
    [settings, totalDuration]
  );

  const setTimerMode = useCallback(
    (mode: FocusMode) => {
      setTimerModeState(mode);
      const dur = getDurationForMode(mode);
      setTotalDuration(dur);
      setTimeLeft(dur);
      setIsTimerRunning(false);
    },
    [getDurationForMode]
  );

  const setCustomTimerMinutes = useCallback((minutes: number) => {
    const dur = Math.max(1, minutes) * 60;
    setTimerModeState("custom");
    setTotalDuration(dur);
    setTimeLeft(dur);
    setIsTimerRunning(false);
  }, []);

  const startTimer = useCallback(() => {
    setIsTimerRunning(true);
    soundFx.playFocusStart(settings.soundEnabled);
  }, [settings.soundEnabled]);

  const pauseTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsTimerRunning(false);
    const dur = getDurationForMode(timerMode);
    setTimeLeft(dur);
  }, [getDurationForMode, timerMode]);

  // ─── Stats & Activity ──────────────────────────────────────────────────────
  const [stats, setStats] = useState<ActivityStats>(() => {
    if (typeof window === "undefined") {
      return {
        waterGlasses: 5,
        waterGoal: 8,
        stepsCount: 3250,
        stepsGoal: 5000,
        stretchesDone: 4,
        stretchesGoal: 6,
        breaksTaken: 4,
        breaksGoal: 6,
      };
    }
    try {
      const saved = localStorage.getItem("focusnext_stats");
      return saved
        ? JSON.parse(saved)
        : {
            waterGlasses: 5,
            waterGoal: 8,
            stepsCount: 3250,
            stepsGoal: 5000,
            stretchesDone: 4,
            stretchesGoal: 6,
            breaksTaken: 4,
            breaksGoal: 6,
          };
    } catch {
      return {
        waterGlasses: 5,
        waterGoal: 8,
        stepsCount: 3250,
        stepsGoal: 5000,
        stretchesDone: 4,
        stretchesGoal: 6,
        breaksTaken: 4,
        breaksGoal: 6,
      };
    }
  });

  const [focusHistory, setFocusHistory] = useState<FocusSession[]>(() => [
    { id: "f-1", durationMinutes: 25, mode: "pomodoro", completedAt: "09:30 AM", label: "Strategic Planning" },
    { id: "f-2", durationMinutes: 50, mode: "deep", completedAt: "10:45 AM", label: "Architecture Spec" },
    { id: "f-3", durationMinutes: 25, mode: "pomodoro", completedAt: "01:30 PM", label: "Code Review" },
  ]);

  const focusMinutesToday = useMemo(() => {
    return focusHistory.reduce((acc, curr) => acc + curr.durationMinutes, 0) + 122; // baseline: 222m = 3h 42m
  }, [focusHistory]);

  const incrementWater = useCallback(() => {
    soundFx.playSoftClick(settings.soundEnabled);
    setStats((prev) => {
      const next = { ...prev, waterGlasses: Math.min(prev.waterGoal + 4, prev.waterGlasses + 1) };
      if (typeof window !== "undefined") localStorage.setItem("focusnext_stats", JSON.stringify(next));
      return next;
    });
  }, [settings.soundEnabled]);

  const decrementWater = useCallback(() => {
    setStats((prev) => {
      const next = { ...prev, waterGlasses: Math.max(0, prev.waterGlasses - 1) };
      if (typeof window !== "undefined") localStorage.setItem("focusnext_stats", JSON.stringify(next));
      return next;
    });
  }, []);

  const addSteps = useCallback((amount: number = 250) => {
    soundFx.playSoftClick(settings.soundEnabled);
    setStats((prev) => {
      const next = { ...prev, stepsCount: prev.stepsCount + amount };
      if (typeof window !== "undefined") localStorage.setItem("focusnext_stats", JSON.stringify(next));
      return next;
    });
  }, [settings.soundEnabled]);

  const completeStretch = useCallback(() => {
    soundFx.playChime(settings.soundEnabled);
    setStats((prev) => {
      const next = { ...prev, stretchesDone: prev.stretchesDone + 1 };
      if (typeof window !== "undefined") localStorage.setItem("focusnext_stats", JSON.stringify(next));
      return next;
    });
  }, [settings.soundEnabled]);

  const recordBreak = useCallback(() => {
    soundFx.playChime(settings.soundEnabled);
    setStats((prev) => {
      const next = { ...prev, breaksTaken: prev.breaksTaken + 1 };
      if (typeof window !== "undefined") localStorage.setItem("focusnext_stats", JSON.stringify(next));
      return next;
    });
  }, [settings.soundEnabled]);

  // ─── Posture ───────────────────────────────────────────────────────────────
  const [postureItems, setPostureItems] = useState<PostureCheckItem[]>(DEFAULT_POSTURE_ITEMS);

  const togglePostureItem = useCallback((id: string) => {
    soundFx.playSoftClick(settings.soundEnabled);
    setPostureItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  }, [settings.soundEnabled]);

  const resetPostureCheck = useCallback(() => {
    setPostureItems((prev) => prev.map((item) => ({ ...item, checked: true })));
  }, []);

  const postureScore = useMemo(() => {
    const checkedCount = postureItems.filter((i) => i.checked).length;
    return Math.round((checkedCount / postureItems.length) * 100);
  }, [postureItems]);

  // ─── Computed Wellness Score (Baseline 87) ─────────────────────────────────
  const wellnessScore = useMemo(() => {
    const waterRatio = Math.min(1, stats.waterGlasses / stats.waterGoal);
    const breakRatio = Math.min(1, stats.breaksTaken / stats.breaksGoal);
    const stepRatio = Math.min(1, stats.stepsCount / stats.stepsGoal);
    const postureRatio = postureScore / 100;

    const calculated = Math.round(
      (waterRatio * 20) + (breakRatio * 30) + (stepRatio * 20) + (postureRatio * 30)
    );

    // Keep natural realistic score between 78 and 98
    return Math.max(78, Math.min(96, Math.round(calculated * 0.9 + 5)));
  }, [stats, postureScore]);

  // ─── Timer Interval Effect ─────────────────────────────────────────────────
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      // Session finished
      soundFx.playChime(settings.soundEnabled);
      setIsTimerRunning(false);

      if (timerMode === "pomodoro" || timerMode === "deep" || timerMode === "custom") {
        // Record completed focus session
        const sessionMins = Math.round(totalDuration / 60);
        setFocusHistory((prev) => [
          {
            id: "f-" + Date.now(),
            durationMinutes: sessionMins,
            mode: timerMode,
            completedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            label: "Focus Session",
          },
          ...prev,
        ]);
        // Switch to short break
        setTimerMode("shortBreak");
      } else {
        // Break finished
        recordBreak();
        setTimerMode("pomodoro");
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft, timerMode, totalDuration, settings.soundEnabled, setTimerMode, recordBreak]);

  // ─── AI Chat Messages ──────────────────────────────────────────────────────
  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: "m-1",
      sender: "ai",
      text: "Good day. I've analyzed your morning work rhythm. You've logged 3h 42m of focus time with 4 scheduled breaks. How are your shoulders and eyes feeling right now?",
      time: "10:30 AM",
    },
  ]);
  const [isAITyping, setIsAITyping] = useState(false);

  const sendAIMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    const userMsg: AIMessage = {
      id: "u-" + Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setAiMessages((prev) => [...prev, userMsg]);
    setIsAITyping(true);

    setTimeout(() => {
      const lower = text.toLowerCase();
      let responseText = "FocusNext AI suggests maintaining a steady pace. Keep taking small breaks every 45 to 60 minutes to sustain high cognitive stamina.";

      if (lower.includes("posture") || lower.includes("neck") || lower.includes("back") || lower.includes("pain")) {
        responseText = "For neck and shoulder release: Gently roll your shoulders backwards 5 times, then tuck your chin slightly to align your cervical spine with your monitor height.";
      } else if (lower.includes("break") || lower.includes("tired") || lower.includes("fatigue")) {
        responseText = "You've had a strong focus session. A 5-minute movement break with hydration and looking 20 feet away will reset your energy without breaking workflow momentum.";
      } else if (lower.includes("water") || lower.includes("hydration")) {
        responseText = "Great job tracking your water. Hydration directly regulates cognitive reaction time and reduces afternoon brain fog.";
      } else if (lower.includes("pomodoro") || lower.includes("deep work") || lower.includes("focus")) {
        responseText = "To maximize deep work: Try 50-minute focused blocks with 10-minute active recovery breaks. This rhythm aligns with natural ultradian energy cycles.";
      }

      const aiMsg: AIMessage = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setAiMessages((prev) => [...prev, aiMsg]);
      setIsAITyping(false);
    }, 700);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      logout,
      timerMode,
      timeLeft,
      totalDuration,
      isTimerRunning,
      setTimerMode,
      startTimer,
      pauseTimer,
      resetTimer,
      setCustomTimerMinutes,
      stats,
      incrementWater,
      decrementWater,
      addSteps,
      completeStretch,
      recordBreak,
      postureItems,
      togglePostureItem,
      resetPostureCheck,
      postureScore,
      wellnessScore,
      focusMinutesToday,
      focusHistory,
      insights: INITIAL_INSIGHTS,
      settings,
      updateSettings,
      aiMessages,
      isAITyping,
      sendAIMessage,
    }),
    [
      user,
      isAuthenticated,
      login,
      logout,
      timerMode,
      timeLeft,
      totalDuration,
      isTimerRunning,
      setTimerMode,
      startTimer,
      pauseTimer,
      resetTimer,
      setCustomTimerMinutes,
      stats,
      incrementWater,
      decrementWater,
      addSteps,
      completeStretch,
      recordBreak,
      postureItems,
      togglePostureItem,
      resetPostureCheck,
      postureScore,
      wellnessScore,
      focusMinutesToday,
      focusHistory,
      settings,
      updateSettings,
      aiMessages,
      isAITyping,
      sendAIMessage,
    ]
  );

  return <WellnessContext.Provider value={value}>{children}</WellnessContext.Provider>;
}

export function useWellness() {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error("useWellness must be used within a WellnessProvider");
  }
  return context;
}
