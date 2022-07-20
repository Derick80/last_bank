import React, { useState } from "react";
interface Pick {
  paid: boolean;
}

export type ToggleProps = {
  defaultValue?: boolean;
  checked: boolean;
  value?: string | boolean;
  name?: string | boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  onChange?: (...args: any) => any;
  label?: string;
};
export default function ToggleButton({
  defaultValue,
  checked,
  name,
  children,
  disabled,
  onClick,
  onChange,
}: ToggleProps) {
  const [toggle, setToggle] = useState(false);
  const triggerToggle = () => {
    setToggle(!toggle);
  };
  return (
    <div onChange={triggerToggle}>
      <input
        className="wrg-toggle-input"
        onChange={triggerToggle}
        name={`${toggle}`}
        type="checkbox"
        aria-label="Toggle Button"
      />
    </div>
  );
}
