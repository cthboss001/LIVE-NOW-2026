'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Calendar, CheckCircle2, Target, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface StatsOverviewProps {
  totalAcademic: number;
  completedToday: number;
  dueThisWeek: number;
  totalSecondary: number;
}

export function StatsOverview({ totalAcademic, completedToday, dueThisWeek, totalSecondary }: StatsOverviewProps) {
  const stats = [
    {
      label: 'Pending Academic',
      value: totalAcademic,
      icon: Target,
      color: 'text-red-500',
    },
    {
      label: 'Completed Today',
      value: completedToday,
      icon: CheckCircle2,
      color: 'text-green-500',
    },
    {
      label: 'Due This Week',
      value: dueThisWeek,
      icon: Calendar,
      color: 'text-yellow-500',
    },
    {
      label: 'Secondary Goals',
      value: totalSecondary,
      icon: TrendingUp,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Overview</h2>
        <p className="text-sm text-muted-foreground">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
