"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "单次使用",
      price: "¥29",
      period: "单次",
      description: "适合需要一次性文书生成的用户",
      features: ["生成1份起诉状或答辩状", "完整证据清单", "2次免费修改", "PDF导出", "14天内有效"],
      cta: "立即购买",
      featured: false,
    },
    {
      name: "月度套餐",
      price: "¥99",
      period: "每月",
      description: "适合短期需要的用户",
      features: [
        "无限文书生成",
        "无限次数修改",
        "PDF & Word导出",
        "证据模板库（30+）",
        "优先客服支持",
        "月度免费咨询（1次）",
      ],
      cta: "开始订阅",
      featured: true,
    },
    {
      name: "年度套餐",
      price: "¥899",
      period: "每年",
      description: "最划算的选择，享受25折优惠",
      features: [
        "无限文书生成",
        "无限次数修改",
        "PDF & Word导出",
        "证据模板库（50+）",
        "优先客服支持",
        "月度免费咨询（12次）",
        "法律知识库访问权限",
      ],
      cta: "开始订阅",
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="py-8 bg-secondary/20">
      <div className="mx-auto max-w-6xl px-4">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">简单透明的价格方案</h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">选择最适合您的方案，开始快速应对法律纠纷</p>
        </div>

        {/* 定价卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-5 flex flex-col rounded-lg transition-all ${
                plan.featured ? "bg-accent/10 ring-1 ring-accent scale-105" : "bg-white hover:bg-secondary/20"
              }`}
            >
              {/* 标签 */}
              {plan.featured && (
                <div className="mb-3">
                  <span className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full">
                    推荐方案
                  </span>
                </div>
              )}

              {/* 名称和价格 */}
              <h3 className="text-base font-semibold text-foreground mb-1">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-2xl font-bold text-primary">{plan.price}</span>
                <span className="text-xs text-muted-foreground ml-2">/{plan.period}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>

              {/* CTA 按钮 */}
              <Button className="w-full mb-4" variant={plan.featured ? "default" : "outline"} size="sm">
                {plan.cta}
              </Button>

              {/* 功能列表 */}
              <div className="space-y-1 flex-1">
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ 提示 */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs">
            所有套餐生成的文书为草稿形式，需自行审核。
            <Link href="/privacy" className="ml-1 text-primary hover:underline">
              查看完整条款
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
