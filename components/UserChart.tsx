"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"
import type { User } from "@/types/user"

interface UserChartProps {
  users: User[]
}

export default function UserChart({ users }: UserChartProps) {
  // Create chart data based on user domains
  const domainData = users.reduce(
    (acc, user) => {
      const domain = user.email.split("@")[1]
      acc[domain] = (acc[domain] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(domainData).map(([domain, count]) => ({
    domain,
    count,
    percentage: (count / users.length) * 100,
  }))

  const maxCount = Math.max(...chartData.map((d) => d.count))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          توزیع کاربران بر اساس دامنه ایمیل
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <div key={item.domain} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.domain}</span>
                <span className="text-sm text-gray-500">{item.count} کاربر</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index % 4 === 0
                      ? "bg-blue-500"
                      : index % 4 === 1
                        ? "bg-green-500"
                        : index % 4 === 2
                          ? "bg-purple-500"
                          : "bg-orange-500"
                  }`}
                  style={{ width: `${(item.count / maxCount) * 100}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">{item.percentage.toFixed(1)}% از کل کاربران</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
