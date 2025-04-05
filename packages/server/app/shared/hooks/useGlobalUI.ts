import { tabs } from "../../pages/Tabs";
import { useGlobalUIStore } from "../stores/zustand";

export const useGlobalUI = () => {
  const { screen, setScreen, activeTab, setActiveTab } = useGlobalUIStore();

  const getTabs = () => {
    switch (screen) {
      case "home":
        return tabs.home;
      case "profile":
        return tabs.profile;
      case "search":
        return tabs.search;
      case "notifications":
        return tabs.notifications;
      case "messages":
        return tabs.messages;
      case "settings":
        return tabs.settings;
    }
  };

  return {
    screen,
    setScreen,
    activeTab,
    setActiveTab,
    getTabs,
  };
};
