"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            返回首页
          </Link>
          <h1 className="text-lg font-semibold">免责声明</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Card className="p-8 border-destructive/30 bg-destructive/5">
          <div className="flex gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <h1 className="text-2xl font-bold text-destructive">重要免责声明</h1>
          </div>

          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">非法律专业意见</h2>
              <p>
                本工具生成的所有文书均为草稿形式，不构成任何法律意见或专业建议。生成的文书仅供参考，用户需自行审查和验证其准确性和适用性。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">准确性免责</h2>
              <p>
                虽然我们尽力确保工具的准确性，但本工具中的信息、文书模板等可能存在错误或遗漏。对于因使用本工具而产生的任何错误、遗漏或不准确之处，本工具不承担任何责任。
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">诉讼风险</h2>
              <p>
                • 不能保证按本工具生成的文书提起诉讼或答辩会获得胜诉
                <br />• 法律程序和结果受多种因素影响，包括法律适用、事实认定和地方法律规定等
                <br />• 使用本工具的用户应理解并接受相关的法律风险
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">支持的案件范围</h2>
              <p>本工具仅支持以下案件类型的文书生成：</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>民间借贷纠纷</li>
                <li>消费者权益纠纷</li>
                <li>房屋租赁押金纠纷</li>
              </ul>
              <p className="mt-3">不支持以下情况：刑事案件、复杂家事纠纷、涉未成年人隐私、涉密事项、群体性事件等。</p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-3">建议</h2>
              <p>
                如您的案件复杂、争议金额较大或时间紧张，强烈建议咨询专业律师。律师可根据具体情况提供专业建议和全面帮助。
              </p>
            </div>

            <div className="bg-secondary/20 p-4 rounded-lg border border-border">
              <p className="text-xs font-medium">
                使用本工具即表示您已充分理解并接受本免责声明中的所有条款，同意自行承担使用本工具的所有风险和后果。
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
