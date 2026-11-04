"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SaleItem {
  name: string
  email: string
  amount: string
  avatar: string
  fallback: string
}

const recentSales: SaleItem[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=olivia",
    fallback: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=jackson",
    fallback: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=isabella",
    fallback: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=william",
    fallback: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=sofia",
    fallback: "SD",
  },
]

export function RecentTasks() {
  return (
    <Card className="border-border/60 bg-card shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-foreground tracking-tight font-elements">
          Recent Sales
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground pt-0.5 font-sans">
          You made 265 sales this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-2 flex-1">
        <div className="space-y-4 font-sans">
          {recentSales.map((sale, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-9 w-9 border border-border/40 shrink-0">
                  <AvatarImage src={sale.avatar} alt={sale.name} />
                  <AvatarFallback className="text-xs bg-muted font-brand">{sale.fallback}</AvatarFallback>
                </Avatar>
                <div className="space-y-0.5 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate font-sans">
                    {sale.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground truncate font-sans">
                    {sale.email}
                  </p>
                </div>
              </div>
              <div className="text-xs font-semibold font-mono text-foreground whitespace-nowrap">
                {sale.amount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
