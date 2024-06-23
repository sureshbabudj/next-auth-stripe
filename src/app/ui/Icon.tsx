import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export interface IconProps extends LucideProps {
  icon: keyof typeof dynamicIconImports;
}

const Icon = ({ icon, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[icon]);

  return <LucideIcon {...props} />;
};

export default Icon;
