import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Users, TrendingUp, Settings, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdminBackofficeProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AdminBackoffice: React.FC<AdminBackofficeProps> = ({ isVisible, onClose }) => {
  const { toast } = useToast();
  const [gameStats, setGameStats] = useState({
    totalPlayers: 0,
    totalBalance: 0,
    totalAdShares: 0,
    totalReferrals: 0
  });

  useEffect(() => {
    if (isVisible) {
      loadGameStats();
    }
  }, [isVisible]);

  const loadGameStats = () => {
    // Load game statistics from localStorage
    const savedGame = localStorage.getItem('revminer-game') || localStorage.getItem('revminer-save');
    
    // Load global referrals tracking - count actual referrals from game save
    let totalGlobalReferrals = 0;
    
    if (savedGame) {
      try {
        const gameData = JSON.parse(savedGame);
        const totalAdShares = gameData.adShares?.reduce((sum: number, tier: any) => sum + (tier.count || 0), 0) || 0;
        // Count referrals directly from game data
        totalGlobalReferrals = gameData.referrals?.length || 0;
        
        setGameStats({
          totalPlayers: 1,
          totalBalance: gameData.balance || 0,
          totalAdShares: totalAdShares,
          totalReferrals: totalGlobalReferrals
        });
      } catch (error) {
        console.error('Failed to load game stats:', error);
        setGameStats({
          totalPlayers: 0,
          totalBalance: 0,
          totalAdShares: 0,
          totalReferrals: 0
        });
      }
    } else {
      setGameStats({
        totalPlayers: 0,
        totalBalance: 0,
        totalAdShares: 0,
        totalReferrals: 0
      });
    }
  };

  const clearGameData = () => {
    localStorage.removeItem('revminer-game');
    localStorage.removeItem('revminer-save');
    localStorage.removeItem('revminer-achievements');
    localStorage.removeItem('global-referrals');
    toast({
      title: "Game Data Cleared",
      description: "All player progress and global referrals have been reset",
    });
    loadGameStats();
  };

  const clearProposals = () => {
    localStorage.removeItem('dao-proposals');
    toast({
      title: "Proposals Cleared",
      description: "All DAO proposals have been deleted",
    });
  };

  const clearPolls = () => {
    localStorage.removeItem('dao-polls');
    toast({
      title: "Polls Cleared",
      description: "All DAO polls have been deleted",
    });
  };

  const resetLeaderboard = () => {
    localStorage.removeItem('dao-leaderboard');
    toast({
      title: "Leaderboard Reset",
      description: "All leaderboard data has been cleared",
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-empire-dark border-empire-accent">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-empire-gold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Admin Backoffice
            </CardTitle>
            <Button variant="outline" onClick={onClose} size="sm">
              Close
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-empire-surface border-empire-accent/20">
              <CardContent className="p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-empire-primary" />
                <div className="text-2xl font-bold text-empire-gold">{gameStats.totalPlayers}</div>
                <div className="text-sm text-empire-muted">Total Players</div>
              </CardContent>
            </Card>
            
            <Card className="bg-empire-surface border-empire-accent/20">
              <CardContent className="p-4 text-center">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-empire-secondary" />
                <div className="text-2xl font-bold text-empire-gold">${gameStats.totalBalance.toFixed(2)}</div>
                <div className="text-sm text-empire-muted">Total Balance</div>
              </CardContent>
            </Card>
            
            <Card className="bg-empire-surface border-empire-accent/20">
              <CardContent className="p-4 text-center">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {gameStats.totalAdShares}
                </Badge>
                <div className="text-sm text-empire-muted mt-2">Total AdShares</div>
              </CardContent>
            </Card>
            
            <Card className="bg-empire-surface border-empire-accent/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-empire-gold">{gameStats.totalReferrals}</div>
                <div className="text-sm text-empire-muted mt-2">Total Referrals</div>
              </CardContent>
            </Card>
          </div>

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-empire-surface border-empire-accent/20">
              <CardHeader>
                <CardTitle className="text-empire-gold">Game Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={clearGameData} 
                  variant="destructive" 
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Game Data
                </Button>
                <Button 
                  onClick={loadGameStats} 
                  variant="outline" 
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Statistics
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-empire-surface border-empire-accent/20">
              <CardHeader>
                <CardTitle className="text-empire-gold">DAO Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={clearProposals} 
                  variant="destructive" 
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Proposals
                </Button>
                <Button 
                  onClick={clearPolls} 
                  variant="destructive" 
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Polls
                </Button>
                <Button 
                  onClick={resetLeaderboard} 
                  variant="destructive" 
                  className="w-full"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Reset Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="bg-empire-surface border-empire-accent/20">
            <CardHeader>
              <CardTitle className="text-empire-gold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <Button variant="outline" onClick={() => window.location.reload()}>
                  Reload Page
                </Button>
                <Button variant="outline" onClick={() => console.clear()}>
                  Clear Console
                </Button>
                <Button variant="outline" onClick={() => {
                  localStorage.clear();
                  toast({
                    title: "Storage Cleared",
                    description: "All localStorage data cleared",
                  });
                  loadGameStats();
                }}>
                  Clear All Storage
                </Button>
                <Button variant="outline" onClick={() => {
                  // Add test referrals for debugging
                  const testReferrals = {
                    total: Math.floor(Math.random() * 10) + 1,
                    history: []
                  };
                  localStorage.setItem('global-referrals', JSON.stringify(testReferrals));
                  loadGameStats();
                  toast({
                    title: "Test Referrals Added",
                    description: `Added ${testReferrals.total} test referrals`,
                  });
                }}>
                  Add Test Referrals
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};