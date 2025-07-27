"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, TrendingUp } from "lucide-react";
import type { UsersResponse } from "@/types/user";

interface UserStatsChartProps {
  usersData: UsersResponse | undefined;
}

export default function UserStatsChart({ usersData }: UserStatsChartProps) {
  if (!usersData) return null;

  const stats = [
    {
      label: "کل کاربران",
      value: usersData.total,
      color: "bg-blue-500",
      percentage: 100,
    },
    {
      label: "کاربران فعلی",
      value: usersData.data.length,
      color: "bg-green-500",
      percentage: (usersData.data.length / usersData.total) * 100,
    },
    {
      label: "صفحات باقی‌مانده",
      value: usersData.total_pages - usersData.page,
      color: "bg-orange-500",
      percentage:
        ((usersData.total_pages - usersData.page) / usersData.total_pages) *
        100,
    },
    {
      label: "پیشرفت مشاهده",
      value: `${((usersData.page / usersData.total_pages) * 100).toFixed(1)}%`,
      color: "bg-purple-500",
      percentage: (usersData.page / usersData.total_pages) * 100,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5" />
          آمار کلی سیستم
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {stats.map((stat, index) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{stat.label}</span>
                <span className="text-sm font-bold">{stat.value}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${stat.color}`}
                  style={{
                    width: `${stat.percentage}%`,
                    animationDelay: `${index * 200}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
