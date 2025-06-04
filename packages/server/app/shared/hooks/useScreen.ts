import { tabContent } from "../../pages/TabContent";
import { useScreenStore } from "../stores/zustand";
import { Tab, Screen } from "../types/globalUI";

export const useScreen = () => {
  const { screen, setScreen, activeTabsByScreen, setActiveTab } =
    useScreenStore();

  const activeTab = activeTabsByScreen[screen];

  const getTabsForScreen = (): Tab[] => {
    switch (screen) {
      case "home":
        return tabContent.home;
      case "profile":
        return tabContent.profile;
      case "alerts":
        return tabContent.alerts;
      case "messages":
        return tabContent.messages;
      case "settings":
        return tabContent.settings;
      case "swipes":
        return tabContent.swipes;
      case "onboarding":
        return [];
      case "create":
        return tabContent.create;
    }
  };

  return {
    screen,
    setScreen,
    activeTab,
    setActiveTab,
    getTabsForScreen,
  };
};
