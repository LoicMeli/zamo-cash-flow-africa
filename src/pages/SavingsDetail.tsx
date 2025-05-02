import { useState } from "react";
import { useLanguage } from "@/providers/LanguageProvider";
import { 
  ArrowLeft, 
  Users, 
  Calendar, 
  ChevronRight, 
  Settings,
  Bell,
  ArrowUpCircle,
  User,
  Clock,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";

// Mock data for the tontines
const tontineGroups = [
  { 
    id: '1', 
    name: 'Tontine Familiale', 
    members: [
      { id: '1', name: 'Jean Dupont', role: 'admin', contributionStatus: 'paid' },
      { id: '2', name: 'Marie Mbeki', role: 'member', contributionStatus: 'paid' },
      { id: '3', name: 'Paul Touré', role: 'member', contributionStatus: 'pending' },
      { id: '4', name: 'Fatima Ahmed', role: 'member', contributionStatus: 'paid' },
    ],
    totalContributions: 8,
    currentRound: 2,
    totalAmount: 200000, 
    contributionAmount: 10000,
    progress: 65, 
    nextPayoutDate: new Date('2025-05-15'),
    schedule: 'Weekly',
    currentRecipient: 'Marie Mbeki',
    nextRecipient: 'Paul Touré',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-08-15'),
    transactions: [
      { id: '1', type: 'contribution', amount: 10000, user: 'Jean Dupont', date: new Date('2025-04-28') },
      { id: '2', type: 'contribution', amount: 10000, user: 'Marie Mbeki', date: new Date('2025-04-27') },
      { id: '3', type: 'contribution', amount: 10000, user: 'Fatima Ahmed', date: new Date('2025-04-26') },
      { id: '4', type: 'payout', amount: 40000, user: 'Jean Dupont', date: new Date('2025-04-20') },
      { id: '5', type: 'contribution', amount: 10000, user: 'Jean Dupont', date: new Date('2025-04-13') },
      { id: '6', type: 'contribution', amount: 10000, user: 'Marie Mbeki', date: new Date('2025-04-12') },
    ]
  },
  { 
    id: '2', 
    name: 'Projet Maison', 
    members: [
      { id: '1', name: 'Jean Dupont', role: 'admin', contributionStatus: 'paid' },
      { id: '2', name: 'Alice Koné', role: 'member', contributionStatus: 'paid' },
      { id: '3', name: 'Robert Mbia', role: 'member', contributionStatus: 'pending' },
      { id: '4', name: 'Sophie Hakimi', role: 'member', contributionStatus: 'paid' },
    ],
    totalContributions: 24,
    currentRound: 6,
    totalAmount: 500000, 
    contributionAmount: 25000,
    progress: 32, 
    nextPayoutDate: new Date('2025-06-25'),
    schedule: 'Monthly',
    currentRecipient: 'Jean Dupont',
    nextRecipient: 'Sophie Hakimi',
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-12-31'),
    transactions: [
      { id: '1', type: 'contribution', amount: 25000, user: 'Jean Dupont', date: new Date('2025-04-01') },
      { id: '2', type: 'contribution', amount: 25000, user: 'Alice Koné', date: new Date('2025-04-02') },
      { id: '3', type: 'contribution', amount: 25000, user: 'Sophie Hakimi', date: new Date('2025-04-03') },
      { id: '4', type: 'payout', amount: 100000, user: 'Alice Koné', date: new Date('2025-03-25') },
      { id: '5', type: 'contribution', amount: 25000, user: 'Jean Dupont', date: new Date('2025-03-01') },
      { id: '6', type: 'contribution', amount: 25000, user: 'Alice Koné', date: new Date('2025-03-02') },
    ]
  }
];

const SavingsDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "members" | "activity">("overview");
  const [isContributeDialogOpen, setIsContributeDialogOpen] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [isLoading, setIsLoading] = useState(false);
  
  // Find the tontine by ID
  const tontine = tontineGroups.find(t => t.id === id);
  
  if (!tontine) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16">
        <h2 className="text-xl font-bold mb-2">{t("savings.notFound")}</h2>
        <p className="text-muted-foreground mb-4">{t("savings.notFoundMessage")}</p>
        <Button onClick={() => navigate("/savings")}>
          {t("savings.backToSavings")}
        </Button>
      </div>
    );
  }
  
  const handleContribute = () => {
    const amount = parseInt(contributionAmount);
    if (!amount || amount <= 0 || amount !== tontine.contributionAmount) {
      toast.error(t("savings.invalidAmount"));
      return;
    }
    
    setIsLoading(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false);
      setIsContributeDialogOpen(false);
      toast.success(t("savings.contributionSuccessful"));
    }, 1500);
  };

  return (
    <div className="space-y-6 py-2">
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-xl font-bold">
          {tontine.name}
        </h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => toast.info(t("savings.comingSoon"))}
        >
          <Settings size={18} />
        </Button>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{tontine.members.length} {t("family.members").toLowerCase()}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{tontine.schedule}</span>
        </div>
      </div>
      
      <Card className="p-5 bg-gradient-to-br from-primary-blue to-blue-700 text-white">
        <h3 className="text-sm font-medium opacity-80 mb-1">{t("savings.totalSaved")}</h3>
        <div className="text-2xl font-bold mb-2">{formatCurrency(tontine.totalAmount * (tontine.progress / 100))} FCFA</div>
        
        <div className="space-y-1 mb-3">
          <div className="flex justify-between text-sm">
            <span className="opacity-80">{t("savings.progress")}</span>
            <span>{tontine.progress}%</span>
          </div>
          <Progress value={tontine.progress} className="h-2 bg-white/20" />
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="opacity-80">{t("savings.target")}</span>
          <span>{formatCurrency(tontine.totalAmount)} FCFA</span>
        </div>
      </Card>
      
      <div className="flex border-b border-border">
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${activeTab === "overview" ? "border-b-2 border-primary-blue text-primary-blue font-medium" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          {t("savings.overview")}
        </Button>
        
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${activeTab === "members" ? "border-b-2 border-primary-blue text-primary-blue font-medium" : ""}`}
          onClick={() => setActiveTab("members")}
        >
          {t("savings.members")}
        </Button>
        
        <Button
          variant="ghost"
          className={`flex-1 rounded-none ${activeTab === "activity" ? "border-b-2 border-primary-blue text-primary-blue font-medium" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          {t("savings.activity")}
        </Button>
      </div>
      
      {activeTab === "overview" && (
        <div className="space-y-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-3">{t("savings.nextPayout")}</h3>
            
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary-blue/10 text-primary-blue">
                  {tontine.nextRecipient.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="font-medium">{tontine.nextRecipient}</div>
                <div className="text-sm text-muted-foreground">
                  {tontine.nextPayoutDate.toLocaleDateString()}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t("savings.amount")}</span>
              <span className="font-medium">{formatCurrency(tontine.contributionAmount * tontine.members.length)} FCFA</span>
            </div>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-semibold mb-3">{t("savings.contribution")}</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.yourContribution")}</span>
                <span className="font-medium">{formatCurrency(tontine.contributionAmount)} FCFA</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.frequency")}</span>
                <span className="font-medium">{tontine.schedule}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.nextDueDate")}</span>
                <span className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Button 
              className="w-full mt-4 bg-primary-blue hover:bg-primary-blue/90 text-white"
              onClick={() => setIsContributeDialogOpen(true)}
            >
              {t("savings.contribute")}
            </Button>
          </Card>
          
          <Card className="p-4">
            <h3 className="font-semibold mb-3">{t("savings.schedule")}</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.startDate")}</span>
                <span className="font-medium">{tontine.startDate.toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.endDate")}</span>
                <span className="font-medium">{tontine.endDate.toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("savings.currentRound")}</span>
                <span className="font-medium">{tontine.currentRound} / {tontine.totalContributions}</span>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {tontine.members.length} {t("family.members")}
            </h3>
            
            <Button variant="outline" size="sm" className="flex items-center" onClick={() => navigate("/add-contact")}>
              <User size={16} className="mr-1" />
              {t("family.invite")}
            </Button>
          </div>
          
          {tontine.members.map((member) => (
            <Card key={member.id} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={member.role === 'admin' ? 'bg-primary-blue/20 text-primary-blue' : ''}>
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="font-medium flex items-center">
                      {member.name}
                      {member.role === 'admin' && (
                        <Badge variant="outline" className="ml-2 text-xs border-primary-blue text-primary-blue">
                          {t("family.admin")}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <Badge 
                        variant={member.contributionStatus === "paid" ? "default" : "outline"} 
                        className={`text-xs ${member.contributionStatus === "paid" ? "bg-green-500 hover:bg-green-500/90" : "text-amber-500 border-amber-500"}`}
                      >
                        {member.contributionStatus === "paid" ? t("savings.contributed") : t("savings.pending")}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <ChevronRight size={16} className="text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {activeTab === "activity" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">
              {t("savings.recentActivity")}
            </h3>
            
            <Button variant="ghost" size="sm" onClick={() => toast.info(t("savings.moreActivitySoon"))}>
              <BarChart3 size={16} className="mr-1" />
              {t("savings.showStats")}
            </Button>
          </div>
          
          {tontine.transactions.map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center
                    ${transaction.type === 'contribution' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}
                  >
                    {transaction.type === 'contribution' ? (
                      <ArrowUpCircle size={20} />
                    ) : (
                      <ArrowUpCircle size={20} className="rotate-180" />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium">
                      {transaction.type === 'contribution' ? t("savings.contributionMade") : t("savings.payoutReceived")}
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <User size={12} />
                      <span>{transaction.user}</span>
                      <Clock size={12} className="ml-2" />
                      <span>{transaction.date.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={transaction.type === 'contribution' ? 'text-blue-600 font-medium' : 'text-green-600 font-medium'}>
                    {transaction.type === 'contribution' ? '+' : '-'} {formatCurrency(transaction.amount)} FCFA
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {/* Contribute Dialog */}
      <Dialog open={isContributeDialogOpen} onOpenChange={setIsContributeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("savings.makeContribution")}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("savings.contributionAmount")}
              </label>
              <Input
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={tontine.contributionAmount.toString()}
                className="text-lg text-center font-bold"
                inputMode="numeric"
              />
              <p className="text-xs text-muted-foreground text-center mt-1">
                {t("savings.suggestedAmount")}: {formatCurrency(tontine.contributionAmount)} FCFA
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("savings.paymentMethod")}
              </label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet">{t("savings.walletBalance")}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="momo" id="momo" />
                  <Label htmlFor="momo">{t("savings.mobileMoney")}</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsContributeDialogOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleContribute} disabled={isLoading}>
              {isLoading ? t("common.processing") : t("savings.confirmContribution")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavingsDetail;
