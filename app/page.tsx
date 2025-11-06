"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Shield, Gavel } from "lucide-react"
import { PricingSection } from "@/components/pricing-section"

export default function Home() {
  const cases = [
    { id: "loan", name: "民间借贷", icon: "💳", desc: "金钱借贷纠纷" },
    { id: "consumer", name: "消费者权益", icon: "🛍️", desc: "商品/服务纠纷" },
    { id: "tenancy", name: "房屋租赁押金", icon: "🏠", desc: "租赁相关纠纷" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* 免责提示 */}
        <div className="mb-6 flex gap-3 rounded-lg bg-secondary/30 p-4 border border-border">
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">⚠️ 重要声明</p>
            <p>本工具仅提供文书生成辅助，非法律意见。生成文书为草稿形式，需自行审核并按当地法律程序提交。</p>
          </div>
        </div>

        {/* 主标题 */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-3">快速应对法律纠纷</h2>
          <p className="text-lg text-muted-foreground">15-30 分钟内生成起诉状或答辩状草稿，包含完整证据清单</p>
        </div>

        {/* 两个大按钮 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/case/new?role=defendant">
            <Button
              className="w-full h-28 text-lg font-semibold flex flex-col items-center justify-center gap-2 bg-primary hover:bg-primary/90"
              variant="default"
            >
              <Shield className="w-8 h-8" />
              我被起诉了
              <span className="text-sm font-normal text-primary-foreground/80">需要写答辩状</span>
            </Button>
          </Link>

          <Link href="/case/new?role=plaintiff">
            <Button
              className="w-full h-28 text-lg font-semibold flex flex-col items-center justify-center gap-2 bg-accent hover:bg-accent/90"
              variant="default"
            >
              <Gavel className="w-8 h-8" />
              我要起诉
              <span className="text-sm font-normal text-accent-foreground/80">需要写起诉状</span>
            </Button>
          </Link>
        </div>

        {/* 案由选择 */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">选择案件类型</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {cases.map((caseType) => (
              <Link key={caseType.id} href={`/case/new?cause=${caseType.id}`}>
                <Card className="p-5 cursor-pointer hover:shadow-md hover:border-accent transition-all h-full flex flex-col gap-3">
                  <div className="text-4xl">{caseType.icon}</div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{caseType.name}</h4>
                    <p className="text-xs text-muted-foreground">{caseType.desc}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* 步骤说明 */}
        <div className="bg-secondary/20 rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">使用流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: 1, label: "选择身份", desc: "被告或原告" },
              { step: 2, label: "上传材料", desc: "或手填信息" },
              { step: 3, label: "生成草稿", desc: "自动生成文书" },
              { step: 4, label: "导出使用", desc: "下载为 PDF" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  {item.step}
                </div>
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <PricingSection />
    </div>
  )
}
