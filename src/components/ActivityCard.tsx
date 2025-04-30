
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ActivityCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  color?: string;
}

const ActivityCard = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
  color = "bg-primary-blue/10",
}: ActivityCardProps) => {
  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <Link 
            to={linkHref} 
            className="flex items-center gap-1 text-primary-blue text-sm font-medium mt-2"
          >
            {linkText} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ActivityCard;
