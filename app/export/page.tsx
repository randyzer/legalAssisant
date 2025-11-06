"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle2, FileText } from "lucide-react"

export default function Export() {
  const [checklist, setChecklist] = useState({
    partiesComplete: false,
    amountConsistent: false,
    timelineValid: false,
    evidenceComplete: false,
    disclaimerRead: false,
  })

  const allChecked = Object.values(checklist).every((v) => v)
  const criticalChecked = checklist.disclaimerRead

  const mockDocContent = `答辩状（草稿版本）

案号：(2023)粤0101民初1234号
被告：张三

事实与理由：
被告对原告的诉讼请求有异议。被告认为原告提供的证据不足，相关事实存在争议，本答辩状予以详细陈述。`

  const handleExport = (format: "pdf" | "docx" | "markdown") => {
    if (!criticalChecked) {
      alert("请先阅读免责声明")
      return
    }
    console.log(`导出 ${format}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/case/preview" className="text-sm font-medium text-primary hover:underline">
            返回预览
          </Link>
          <h1 className="text-lg font-semibold">导出文书</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 检查清单 */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              导出前检查清单
            </h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                <Checkbox
                  checked={checklist.partiesComplete}
                  onCheckedChange={(v) =>
                    setChecklist({
                      ...checklist,
                      partiesComplete: v as boolean,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer">当事人信息完整</label>
                  <p className="text-sm text-muted-foreground">原告/被告的姓名、身份、地址均已填写</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                <Checkbox
                  checked={checklist.amountConsistent}
                  onCheckedChange={(v) =>
                    setChecklist({
                      ...checklist,
                      amountConsistent: v as boolean,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer">诉求金额一致</label>
                  <p className="text-sm text-muted-foreground">诉讼请求中的金额与详情部分一致</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                <Checkbox
                  checked={checklist.timelineValid}
                  onCheckedChange={(v) =>
                    setChecklist({
                      ...checklist,
                      timelineValid: v as boolean,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer">时间线完整（≥3点）</label>
                  <p className="text-sm text-muted-foreground">事件时间线中至少包含 3 个关键事件</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors cursor-pointer">
                <Checkbox
                  checked={checklist.evidenceComplete}
                  onCheckedChange={(v) =>
                    setChecklist({
                      ...checklist,
                      evidenceComplete: v as boolean,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer">证据清单与正文对应</label>
                  <p className="text-sm text-muted-foreground">文书中引用的证据在证据清单中都有列举</p>
                </div>
              </div>

              <hr className="my-4 border-border" />

              <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/5 border border-destructive/20 cursor-pointer">
                <Checkbox
                  checked={checklist.disclaimerRead}
                  onCheckedChange={(v) =>
                    setChecklist({
                      ...checklist,
                      disclaimerRead: v as boolean,
                    })
                  }
                  className="mt-1"
                />
                <div className="flex-1">
                  <label className="font-medium text-foreground cursor-pointer">已阅读免责声明</label>
                  <p className="text-xs text-muted-foreground">
                    本工具仅提供草稿形式参考，不构成法律意见，使用者应自行承担责任。
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* 导出选项 */}
          <Card className="p-6 sticky top-24 h-fit">
            <h3 className="font-semibold text-foreground mb-4">导出格式</h3>

            <div className="space-y-3 mb-6">
              <Button
                className="w-full justify-start gap-2"
                disabled={!criticalChecked}
                onClick={() => handleExport("pdf")}
              >
                <FileText className="w-4 h-4" />
                PDF（推荐）
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                disabled={!criticalChecked}
                onClick={() => handleExport("markdown")}
              >
                <FileText className="w-4 h-4" />
                Markdown
              </Button>

              <Button variant="outline" className="w-full justify-start gap-2 opacity-50 bg-transparent" disabled>
                <FileText className="w-4 h-4" />
                DOCX（开发中）
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-2 p-3 bg-secondary/20 rounded-lg">
              <p>✓ 包含水印标记"草稿/仅供参考"</p>
              <p>✓ 仅供自用参考，不能直接提交法院</p>
              <p>✓ 建议先由律师或熟悉流程的人审核</p>
            </div>
          </Card>
        </div>

        {/* 预览 */}
        <Card className="mt-6 p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            文书预览
          </h3>
          <div className="bg-card p-4 rounded border border-border max-h-64 overflow-y-auto">
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap leading-relaxed">
              {mockDocContent}
            </pre>
          </div>
        </Card>
      </main>
    </div>
  )
}
