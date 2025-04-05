import { tabs } from "../../pages/TabContent";
import { useGlobalUIStore } from "../stores/zustand";
import { Tab } from "../types/globalUI";

export const useGlobalUI = () => {
  const { screen, setScreen, activeTab, setActiveTab } = useGlobalUIStore();

  const getTabs = (): Tab[] => {
    switch (screen) {
      case "home":
        return tabs.home;
      case "profile":
        return tabs.profile;
      case "search":
        return tabs.search;
      case "alerts":
        return tabs.alerts;
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
