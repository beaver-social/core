import { tabs } from "../../pages/TabContent";
import { useGlobalUIStore } from "../stores/zustand";
import { Tab, Screen } from "../types/globalUI";

export const useGlobalUI = () => {
  const { screen, setScreen, activeTab, setActiveTab } = useGlobalUIStore();

  const getTabs = (): Tab[] => {
    switch (screen) {
      case "home":
        return tabs.home;
      case "profile":
        return tabs.profile;
      case "alerts":
        return tabs.alerts;
      case "messages":
        return tabs.messages;
      case "settings":
        return tabs.settings;
      case "swipes":
        return tabs.swipes;
      case "onboarding":
        return [];
    }
  };

  const setScreenHandler = (screen: Screen) => {
    setScreen(screen);
    setActiveTab(
      getTabs().find((tab) => tab.id === getTabs()[0].id)?.id ?? "default"
    );
  };

  return {
    screen,
    setScreen: setScreenHandler,
    activeTab,
    setActiveTab,
    getTabs,
  };
};
