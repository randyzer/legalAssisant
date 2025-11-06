"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            返回首页
          </Link>
          <h1 className="text-lg font-semibold">本站使用条款</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Card className="p-8">
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">1. 服务说明</h2>
              <p>
                民事纠纷小白助手是一个在线法律文书辅助生成工具。本服务旨在帮助普通用户快速生成民事纠纷相关文书的初稿，但不能替代专业法律咨询。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">2. 用户责任</h2>
              <p>
                用户同意对自己在使用本工具过程中的所有行为和结果承担完全责任。用户应确保所输入的信息真实、准确、完整，并对其法律后果自行负责。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">3. 禁止行为</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>不得使用本工具生成任何非法、欺诈或误导性的文书</li>
                <li>不得用于刑事案件或其他不适用的法律领域</li>
                <li>不得传播、复制或用于商业目的</li>
                <li>不得尝试破坏、干扰或破解本服务的安全性</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">4. 免责条款</h2>
              <p>
                本工具按"现状"提供，不做任何明示或暗示的担保。本工具不对使用结果的准确性、完整性或有效性做出保证，也不对因使用或无法使用本工具而产生的任何损害赔偿。
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">5. 条款修改</h2>
              <p>我们保留随时修改本条款的权利。修改生效后，继续使用本服务即表示您接受修改后的条款。</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
