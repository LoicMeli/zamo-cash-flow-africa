
import { cn } from "@/lib/utils";

interface ZamoLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ZamoLogo = ({ size = "md", className }: ZamoLogoProps) => {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <div className={cn("font-bold text-primary-blue flex items-center", sizes[size], className)}>
      <svg 
        className="mr-2" 
        width={size === "sm" ? "20" : size === "md" ? "24" : "32"}
        height={size === "sm" ? "20" : size === "md" ? "24" : "32"}
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h4V7h2v4h4v2h-4v4h-2v-4H7v-2z" 
          fill="currentColor"
        />
      </svg>
      Zamo
    </div>
  );
};

export default ZamoLogo;
