
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface ServiceButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color?: string;
}

const ServiceButton = ({ icon: Icon, label, href, color = "bg-primary-blue" }: ServiceButtonProps) => {
  return (
    <Link 
      to={href} 
      className="flex flex-col items-center"
    >
      <div className={cn(
        "w-14 h-14 rounded-full flex items-center justify-center mb-2",
        color
      )}>
        <Icon className="text-white" size={24} />
      </div>
      <span className="text-sm font-medium text-center">{label}</span>
    </Link>
  );
};

export default ServiceButton;
