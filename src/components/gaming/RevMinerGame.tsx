import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Coins, TrendingUp, Users, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdShare {
  tier: number;
  count: number;
  cost: number;
  earnings: number;
}

interface Referral {
  id: number;
  tier: number;
  earnings: number;
}

interface GameState {
  balance: number;
  adShares: AdShare[];
  referrals: Referral[];
  lastSaved: number;
}

const ADSHARE_TIERS = [
  { tier: 1, cost: 10, earnings: 0.01 },
  { tier: 2, cost: 50, earnings: 0.10 },
  { tier: 3, cost: 250, earnings: 0.50 }
];

const REFERRAL_CHANCES = [
  { chance: 0.50, tier: 0, earnings: 0 }, // No referral
  { chance: 0.40, tier: 1, earnings: 0.01 },
  { chance: 0.09, tier: 2, earnings: 0.10 },
  { chance: 0.01, tier: 3, earnings: 0.50 }
];

const ACHIEVEMENTS = [
  { id: "first-adshare", name: "First AdShare", description: "Bought your first AdShare" },
  { id: "10-adshares", name: "Empire Builder", description: "Own 10 total AdShares" },
  { id: "first-referral", name: "Networking Begins", description: "Earned your first referral" },
  { id: "tier-3-adshare", name: "Premium Investor", description: "Bought a Tier 3 AdShare" },
  { id: "100-balance", name: "Centurion", description: "Reached $100 balance" },
];

const RevMinerGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    balance: 50, // Starting balance
    adShares: [
      { tier: 1, count: 0, cost: 10, earnings: 0.01 },
      { tier: 2, count: 0, cost: 50, earnings: 0.10 },
      { tier: 3, count: 0, cost: 250, earnings: 0.50 }
    ],
    referrals: [],
    lastSaved: Date.now()
  });
  
  const [activityFeed, setActivityFeed] = useState<string[]>([]);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [lastFeedUpdate, setLastFeedUpdate] = useState(Date.now());
  const { toast } = useToast();

  // Calculate total earnings per second
  const calculateEarningsPerSecond = useCallback(() => {
    const adShareEarnings = gameState.adShares.reduce(
      (total, adShare) => total + (adShare.count * adShare.earnings), 0
    );
    const referralEarnings = gameState.referrals.reduce(
      (total, referral) => total + referral.earnings, 0
    );
    return { adShareEarnings, referralEarnings, total: adShareEarnings + referralEarnings };
  }, [gameState.adShares, gameState.referrals]);

  // Save game state to localStorage
  const saveGameState = useCallback(() => {
    const saveData = {
      ...gameState,
      lastSaved: Date.now()
    };
    localStorage.setItem('revminer-save', JSON.stringify(saveData));
  }, [gameState]);

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('revminer-save');
    if (saved) {
      try {
        const loadedState = JSON.parse(saved);
        const timeDiff = (Date.now() - loadedState.lastSaved) / 1000; // seconds
        const earnings = calculateEarningsPerSecond();
        const offlineEarnings = timeDiff * earnings.total;
        
        if (offlineEarnings > 0) {
          setActivityFeed(prev => [`⏰ Welcome back! You earned $${offlineEarnings.toFixed(2)} while away (${(timeDiff/60).toFixed(1)} minutes)`, ...prev]);
        }
        
        setGameState({
          ...loadedState,
          balance: loadedState.balance + offlineEarnings,
          lastSaved: Date.now()
        });
      } catch (error) {
        console.error('Failed to load save data:', error);
      }
    }
  }, []);

  // Auto-save every 5 seconds
  useEffect(() => {
    const interval = setInterval(saveGameState, 5000);
    return () => clearInterval(interval);
  }, [saveGameState]);

  // Game tick - earn money every second but update feed every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const earnings = calculateEarningsPerSecond();
      if (earnings.total > 0) {
        setGameState(prev => ({
          ...prev,
          balance: prev.balance + earnings.total
        }));
        
        // Only update feed every 5 minutes (300 seconds)
        const now = Date.now();
        if (now - lastFeedUpdate >= 300000) { // 5 minutes = 300,000ms
          const fiveMinEarnings = earnings.total * 300; // 5 minutes of earnings
          setActivityFeed(prev => [
            `💰 +$${fiveMinEarnings.toFixed(2)} earned in last 5 min ($${(earnings.adShareEarnings * 300).toFixed(2)} AdShares, $${(earnings.referralEarnings * 300).toFixed(2)} Referrals)`,
            ...prev.slice(0, 19) // Keep only last 20 entries
          ]);
          setLastFeedUpdate(now);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateEarningsPerSecond, lastFeedUpdate]);

  // Check for achievements
  useEffect(() => {
    const totalAdShares = gameState.adShares.reduce((sum, tier) => sum + tier.count, 0);
    const hasTier3 = gameState.adShares[2].count > 0;
    const hasReferrals = gameState.referrals.length > 0;
    
    const achievementsToCheck = [
      { id: "first-adshare", condition: totalAdShares > 0 },
      { id: "10-adshares", condition: totalAdShares >= 10 },
      { id: "first-referral", condition: hasReferrals },
      { id: "tier-3-adshare", condition: hasTier3 },
      { id: "100-balance", condition: gameState.balance >= 100 },
    ];

    achievementsToCheck.forEach(({ id, condition }) => {
      if (condition && !unlockedAchievements.has(id)) {
        const achievement = ACHIEVEMENTS.find(a => a.id === id);
        if (achievement) {
          setUnlockedAchievements(prev => new Set([...prev, id]));
          setActivityFeed(prev => [`🏆 Achievement Unlocked: ${achievement.name}!`, ...prev]);
          toast({
            title: "Achievement Unlocked!",
            description: achievement.name,
          });
        }
      }
    });
  }, [gameState, unlockedAchievements, toast]);

  const buyAdShare = (tier: number) => {
    const tierData = ADSHARE_TIERS.find(t => t.tier === tier);
    if (!tierData || gameState.balance < tierData.cost) return;

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - tierData.cost,
      adShares: prev.adShares.map(adShare => 
        adShare.tier === tier 
          ? { ...adShare, count: adShare.count + 1 }
          : adShare
      )
    }));

    setActivityFeed(prev => [
      `🛒 Bought Tier ${tier} AdShare (+$${tierData.earnings.toFixed(2)}/sec)`,
      ...prev
    ]);
  };

  const payAdvertisers = () => {
    const cost = 10;
    if (gameState.balance < cost) return;

    const random = Math.random();
    let cumulativeChance = 0;
    let result = null;

    for (const chance of REFERRAL_CHANCES) {
      cumulativeChance += chance.chance;
      if (random <= cumulativeChance) {
        result = chance;
        break;
      }
    }

    setGameState(prev => ({
      ...prev,
      balance: prev.balance - cost,
      referrals: result && result.tier > 0 
        ? [...prev.referrals, {
            id: Date.now(),
            tier: result.tier,
            earnings: result.earnings
          }]
        : prev.referrals
    }));

    if (result && result.tier > 0) {
      setActivityFeed(prev => [
        `🎉 Paid Advertisers → Referral Gained! Tier ${result.tier} (+$${result.earnings.toFixed(2)}/sec)`,
        ...prev
      ]);
    } else {
      setActivityFeed(prev => [
        `💸 Paid Advertisers → No referral this time`,
        ...prev
      ]);
    }
  };

  const earnings = calculateEarningsPerSecond();

  return (
    <section id="gaming" className="py-16 px-4 bg-gradient-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-empire-primary">
            RevMiner: AdShare Idle Game
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn RevEmpire economics through gameplay. Build your empire, earn referrals, and watch your wealth grow!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Stats */}
          <Card className="bg-white shadow-empire">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-empire-primary">
                <Coins className="h-5 w-5" />
                Game Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-empire rounded-lg text-white">
                <p className="text-2xl font-bold">${gameState.balance.toFixed(2)}</p>
                <p className="text-sm opacity-90">Balance</p>
              </div>
              
              <div className="text-center p-3 bg-empire-accent rounded-lg">
                <p className="text-xl font-semibold text-empire-primary">
                  ${earnings.total.toFixed(2)}/sec
                </p>
                <p className="text-sm text-muted-foreground">Earnings Rate</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-empire-primary">AdShares Owned</h4>
                {gameState.adShares.map(adShare => (
                  <div key={adShare.tier} className="flex justify-between text-sm">
                    <span>Tier {adShare.tier}:</span>
                    <span className="font-medium">{adShare.count}</span>
                  </div>
                ))}
              </div>

              {gameState.referrals.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-empire-primary">Referrals</h4>
                  <ScrollArea className="h-20">
                    {gameState.referrals.map((referral, index) => (
                      <div key={referral.id} className="text-sm flex justify-between">
                        <span>Referral #{index + 1}: Tier {referral.tier}</span>
                        <span>(+${referral.earnings.toFixed(2)}/sec)</span>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Game Actions */}
          <Card className="bg-white shadow-empire">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-empire-primary">
                <TrendingUp className="h-5 w-5" />
                Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold">Buy AdShares</h4>
                {ADSHARE_TIERS.map(tier => (
                  <Button
                    key={tier.tier}
                    className="w-full justify-between bg-empire-primary hover:bg-empire-primary-light"
                    onClick={() => buyAdShare(tier.tier)}
                    disabled={gameState.balance < tier.cost}
                  >
                    <span>Buy Tier {tier.tier} AdShare</span>
                    <span>${tier.cost}</span>
                  </Button>
                ))}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Referral System</h4>
                <Button
                  className="w-full bg-empire-secondary hover:bg-empire-secondary/90 text-empire-dark"
                  onClick={payAdvertisers}
                  disabled={gameState.balance < 10}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Pay Advertisers ($10)
                </Button>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p>• 50% chance: No referral</p>
                  <p>• 40% chance: Tier 1 referral (+$0.01/sec)</p>
                  <p>• 9% chance: Tier 2 referral (+$0.10/sec)</p>
                  <p>• 1% chance: Tier 3 referral (+$0.50/sec)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card className="bg-white shadow-empire">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-empire-primary">
                <Zap className="h-5 w-5" />
                Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {activityFeed.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      Start playing to see your activity here!
                    </p>
                  ) : (
                    activityFeed.map((activity, index) => (
                      <div
                        key={index}
                        className="text-xs p-2 bg-empire-accent rounded animate-slideIn"
                      >
                        {activity}
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        {unlockedAchievements.size > 0 && (
          <Card className="mt-6 bg-white shadow-empire">
            <CardHeader>
              <CardTitle className="text-empire-primary">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Array.from(unlockedAchievements).map(achievementId => {
                  const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
                  return achievement ? (
                    <Badge
                      key={achievementId}
                      className="bg-warning text-warning-foreground"
                    >
                      🏆 {achievement.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default RevMinerGame;