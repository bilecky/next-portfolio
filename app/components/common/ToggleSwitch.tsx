import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface ToggleSwitchProps {
  initialState?: boolean;
  onChange?: (isActive: boolean) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const ToggleSwitch = ({
  initialState = false,
  onChange,
  size = "md",
  disabled = false,
}: ToggleSwitchProps) => {
  const [isActive, setIsActive] = useState<boolean | null>(null);

  console.log(initialState);
  useEffect(() => {
    setIsActive(initialState);
  }, [initialState]);

  const handleToggle = () => {
    if (!disabled) {
      const newState = !isActive;
      setIsActive(newState);
      onChange?.(newState);
    }
  };

  const sizes = {
    sm: {
      switch: "w-8 h-4",
      circle: "w-3 h-3",
      translate: "translate-x-4",
    },
    md: {
      switch: "w-12 h-6",
      circle: "w-5 h-5",
      translate: "translate-x-6",
    },
    lg: {
      switch: "w-16 h-8",
      circle: "w-7 h-7",
      translate: "translate-x-8",
    },
  };

  const switchClasses = clsx(
    // Base classes
    "relative rounded-full transition-colors duration-300 ease-in-out",
    // Size classes
    sizes[size].switch,
    // State classes
    {
      "bg-gray-900": isActive,
      "bg-gray-300": !isActive,
      "opacity-50 cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
    },
    // Focus classes
    "focus:outline-none focus:ring-1 focus:ring-offset-0 ",
  );

  const circleClasses = clsx(
    // Base classes
    "absolute top-0.5 left-0.5 bg-white rounded-full shadow-lg",
    "transform transition-transform duration-300 ease-in-out",
    // Size classes
    sizes[size].circle,
    // Translation classes
    {
      [sizes[size].translate]: isActive,
      "translate-x-0": !isActive,
    },
  );

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={switchClasses}
      disabled={disabled}
      aria-pressed={isActive}
    >
      <span className="sr-only">Toggle switch</span>
      <div className={circleClasses} />
    </button>
  );
};

export default ToggleSwitch;
