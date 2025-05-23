import { icons } from "lucide-react";
import Icon from "./Icon";
import { Button } from "./ui/button";

type Props = {
  iconName: keyof typeof icons;
};

export default function GradientButton({ iconName }: Props) {
  return (
    <Button
      variant="outline"
      className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-grey-800"
    >
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-primary/30 dark:to-grey-950"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon name={iconName} className="size-5 text-grey-200" />
      </div>
    </Button>
  );
}
