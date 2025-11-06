"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Download, RefreshCw, ChevronDown, ChevronUp, Sparkles } from "lucide-react"

export default function CasePreview() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") as "defendant" | "plaintiff" | null
  const [iterationCount, setIterationCount] = useState(1)
  const [expandedSections, setExpandedSections] = useState<string[]>(["intro", "facts"])
  const [editingMode, setEditingMode] = useState<string | null>(null)

  const mockDocument =
    role === "defendant"
      ? {
          title: "答辩状",
          case_no: "(2023)粤0101民初1234号",
          sections: [
            {
              id: "intro",
              title: "案号与当事人",
              content:
                "案号：(2023)粤0101民初1234号\n本案被告：张三，男，1990年生，住江苏省南京市江宁区。\n联系电话：13800138000",
            },
            {
              id: "facts",
              title: "事实陈述与抗辩意见",
              content:
                "被告对原告的主张有异议。被告认为：\n1. 关于借款事实，被告已按约定期限归还部分借款\n2. 关于还款情况，被告有转账凭证可证明\n3. 原告诉求中的利息计算方式与协议不符",
            },
            {
              id: "legal",
              title: "法律依据",
              content:
                "本案应当适用以下法律规定：\n1. 《民法典》第六百七十五条：借款合同的内容包括借款种类、币种、用途、数额、利率、期限和还款方式等条款。",
            },
            {
              id: "evidence",
              title: "证据清单",
              content:
                "证据1：被告银行转账凭证（证明已支付部分款项）\n证据2：被告与原告的通话录音（证明还款协议）\n证据3：被告提交的收条原件",
            },
          ],
        }
      : {
          title: "起诉状",
          case_no: "待立案",
          sections: [
            {
              id: "intro",
              title: "当事人信息",
              content:
                "原告：李四，男，1985年生，住北京市朝阳区建国路。\n被告：王五，女，1990年生，住上海市浦东新区。\n法定代表人/授权代理人：无。",
            },
            {
              id: "claims",
              title: "诉讼请求",
              content:
                "1. 请求法院判令被告向原告支付借款本金50000元及利息（按年利率6%计算）\n2. 请求法院判令被告承担本案诉讼费用\n3. 请求法院判令被告支付律师费3000元",
            },
            {
              id: "facts",
              title: "事实与理由",
              content:
                "2022年6月15日，原告与被告订立书面借款协议，约定借款金额50000元，期限12个月，年利率6%。被告于2023年7月15日前应归还全部借款本息。截至起诉之日，被告仍未归还，现向法院起诉。",
            },
            {
              id: "evidence",
              title: "证据清单",
              content:
                "证据1：借款协议一份（证明借款关系成立）\n证据2：银行转账凭证（证明借款已支付）\n证据3：催款记录（短信截图，证明催要行为）",
            },
          ],
        }

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const canIterate = iterationCount < 3

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            返回首页
          </Link>
          <h1 className="text-lg font-semibold">{mockDocument.title} 预览</h1>
          <Link href="/export">
            <Button className="bg-primary hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              导出
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* 迭代状态条 */}
        <div className="mb-6 flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm">
              迭代次数：
              <span className="font-semibold ml-1">{iterationCount}/3</span>
            </span>
          </div>
          {!canIterate && (
            <span className="text-xs bg-destructive/10 text-destructive px-3 py-1 rounded-full font-medium">
              已达到最大迭代次数
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* 左侧大纲 */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24 max-h-96 overflow-y-auto">
              <h3 className="font-semibold text-foreground mb-3 text-sm">文书大纲</h3>
              <div className="space-y-2">
                {mockDocument.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => toggleSection(section.id)}
                    className="block text-left text-sm text-muted-foreground hover:text-primary transition-colors w-full p-2 hover:bg-secondary/20 rounded"
                  >
                    {expandedSections.includes(section.id) ? "▼" : "▶"} {section.title}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* 右侧正文 */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-card border border-border">
              {/* 标题区 */}
              <div className="text-center pb-6 border-b border-border mb-6">
                <h2 className="text-3xl font-bold text-foreground mb-2">{mockDocument.title}</h2>
                <p className="text-sm text-muted-foreground mb-2">案号：{mockDocument.case_no}</p>
                <p className="text-xs text-destructive font-medium">⚠️ 草稿版本 / 仅供参考</p>
              </div>

              {/* 内容段落 */}
              <div className="space-y-4">
                {mockDocument.sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full flex items-center justify-between p-3 hover:bg-secondary/30 rounded transition-colors"
                    >
                      <h3 className="font-semibold text-foreground text-left">{section.title}</h3>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="w-4 h-4 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 flex-shrink-0" />
                      )}
                    </button>

                    {expandedSections.includes(section.id) && (
                      <div className="space-y-3 pl-4 py-3 border-l-2 border-border">
                        <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{section.content}</p>

                        {canIterate && (
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs bg-transparent"
                              onClick={() => setEditingMode(section.id)}
                            >
                              <Sparkles className="w-3 h-3 mr-1" />
                              加强表述
                            </Button>
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              改写
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 底部迭代提示 */}
              <div className="mt-8 pt-6 border-t border-border">
                {canIterate ? (
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setIterationCount((prev) => prev + 1)}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    请求迭代（还可迭代 {3 - iterationCount} 次）
                  </Button>
                ) : (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-destructive">
                      <p className="font-medium">已达到最大迭代次数</p>
                      <p className="text-xs mt-1">若需继续改进，请手动编辑后导出</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
