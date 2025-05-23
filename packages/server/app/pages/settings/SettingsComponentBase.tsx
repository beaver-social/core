import React from "react";
import { cn } from "@/shared/lib/utils";
import Icon from "@/shared/components/Icon";
import { icons } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";

interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: keyof typeof icons;
  iconClassName?: string;
  iconBgClassName?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function SettingsSection({
  title,
  description,
  icon,
  iconClassName = "h-6 w-6 text-primary",
  iconBgClassName = "p-2 bg-primary/10 rounded-full",
  children,
  footer,
  className,
}: SettingsSectionProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="space-y-1">
        {icon && (
          <div className="flex items-start gap-4 mb-1">
            <div className={iconBgClassName}>
              <Icon name={icon} className={iconClassName} />
            </div>
            <div className="space-y-1">
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </div>
          </div>
        )}
        {!icon && (
          <>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

interface SettingsPageProps {
  title: string;
  description?: string;
  icon?: keyof typeof icons;
  iconClassName?: string;
  iconBgClassName?: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsPage({
  title,
  description,
  icon,
  iconClassName = "h-6 w-6 text-primary",
  iconBgClassName = "p-2 bg-primary/10 rounded-full",
  children,
  className,
}: SettingsPageProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(icon || title || description) && (
        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              {icon && (
                <div className={iconBgClassName}>
                  <Icon name={icon} className={iconClassName} />
                </div>
              )}
              <div>
                <CardTitle>{title}</CardTitle>
                {description && (
                  <CardDescription>{description}</CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
      {children}
    </div>
  );
}

interface SettingsItemProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function SettingsItem({
  title,
  description,
  children,
  className,
}: SettingsItemProps) {
  return (
    <div className={cn("flex items-center justify-between py-3", className)}>
      <div className="space-y-0.5">
        <h4 className="text-sm font-medium">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

export function SettingsSaveButton({
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  return (
    <Button onClick={onClick} {...props}>
      Save Changes
    </Button>
  );
}
