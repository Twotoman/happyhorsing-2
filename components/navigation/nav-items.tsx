import {
  Home,
  Gitlab,
  Dumbbell,
  Utensils,
  Trophy,
  Users,
  Link,
} from "lucide-react";

import { Icon } from "lucide-react";
import { horseHead } from "@lucide/lab";
import { fa } from "zod/v4/locales";
export function HorseIcon() {
  return <Icon iconNode={horseHead} size={24} />;
}

export const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home, mobile: true },
    { title: "Meine Pferde", url: "/dashboard/horses", icon: HorseIcon, mobile: true },
    { title: "Training", url: "/dashboard/training", icon: Dumbbell, mobile: false},
    { title: "Ernährung", url: "/dashboard/ernaehrung", icon: Utensils, mobile: false },
    { title: "Turniere", url: "/dashboard/turniere", icon: Trophy, mobile: true},
    { title: "Community", url: "/dashboard/community", icon: Users, mobile: true },
  ];