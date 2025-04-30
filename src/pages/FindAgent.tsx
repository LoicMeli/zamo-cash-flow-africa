
import { useState, useEffect } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { MapPin, Phone, Navigation, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock agent data
const mockAgents = [
  {
    id: "1",
    name: "Jean Mbeki",
    rating: 4.8,
    distance: 0.6,
    address: "Marché Central, Yaoundé",
    isAvailable: true,
    phone: "+237 655 555 555",
  },
  {
    id: "2",
    name: "Marie Touré",
    rating: 4.5,
    distance: 1.2,
    address: "Rue de la Paix, Douala",
    isAvailable: true,
    phone: "+237 677 777 777",
  },
  {
    id: "3",
    name: "Amadou Diallo",
    rating: 4.9,
    distance: 2.5,
    address: "Boulevard de l'Indépendance, Garoua",
    isAvailable: false,
    phone: "+237 699 999 999",
  },
  {
    id: "4",
    name: "Sophie Hakimi",
    rating: 4.7,
    distance: 3.1,
    address: "Avenue Charles de Gaulle, Yaoundé",
    isAvailable: true,
    phone: "+237 688 888 888",
  },
];

const FindAgent = () => {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    // Simulate loading agents
    const timer = setTimeout(() => {
      setAgents(mockAgents);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <Star size={14} className="text-yellow-400 fill-yellow-400" />
        <span className="ml-1 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 py-2">
      <h1 className="text-xl font-bold mb-6">
        {t("agents.title")}
      </h1>
      
      {/* Map placeholder */}
      <div className="relative w-full h-64 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin size={40} className="text-primary-blue" />
        </div>
        <div className="absolute bottom-4 right-4">
          <Button size="sm" className="bg-primary-blue text-white rounded-full shadow-md">
            <Navigation size={16} className="mr-1" />
            {t("common.home")}
          </Button>
        </div>
      </div>
      
      {/* Nearby agents */}
      <div>
        <h2 className="text-lg font-medium mb-4">
          {t("agents.nearby")}
        </h2>
        
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          </div>
        ) : agents.length > 0 ? (
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="zamo-card">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{agent.name}</h3>
                    <p className="text-sm text-muted-foreground">{agent.address}</p>
                  </div>
                  <Badge variant={agent.isAvailable ? "default" : "outline"} className={agent.isAvailable ? "bg-green-500" : "text-muted-foreground"}>
                    {agent.isAvailable ? t("agents.available") : t("agents.unavailable")}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <MapPin size={14} className="text-muted-foreground mr-1" />
                      <span className="text-sm">{agent.distance} km</span>
                    </div>
                    {renderRatingStars(agent.rating)}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Phone size={14} className="mr-1" />
                    {t("agents.call")}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Navigation size={14} className="mr-1" />
                    {t("agents.directions")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-6">
            No nearby agents found
          </p>
        )}
      </div>
    </div>
  );
};

export default FindAgent;
