"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, Upload, HelpCircle } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CaseNew() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const role = searchParams.get("role") as "defendant" | "plaintiff"
  const cause = searchParams.get("cause") || "loan"

  const [currentStep, setCurrentStep] = useState(role === "defendant" ? "upload" : "parties")
  const [uploadContent, setUploadContent] = useState("")

  const [formData, setFormData] = useState({
    // 当事人信息
    plaintiffName: "",
    plaintiffContact: "",
    plaintiffAddress: "",
    defendantName: "",
    defendantContact: "",
    defendantAddress: "",
    // 诉讼请求
    claimMain: "",
    claimSecondary: "",
    claimAmount: "",
    // 时间线
    timeline: [
      { date: "", event: "" },
      { date: "", event: "" },
      { date: "", event: "" },
    ],
    // 证据
    evidenceNotes: "",
  })

  const handleSubmit = () => {
    // 导航到预览页面
    router.push("/case/preview?role=" + role + "&cause=" + cause)
  }

  const renderDefendantFlow = () => (
    <div className="space-y-6">
      <Tabs defaultValue="upload" value={currentStep} onValueChange={setCurrentStep}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">上传/粘贴材料</TabsTrigger>
          <TabsTrigger value="manual">手填关键信息</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card className="p-6 border-2 border-dashed border-border hover:border-primary transition-colors">
            <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">上传法院材料或粘贴文本</p>
                <p className="text-sm text-muted-foreground">系统将自动提取案号、诉求、截止日期</p>
              </div>
            </div>
            <Textarea
              placeholder="将法院发送的材料（起诉状、传票等）粘贴在这里..."
              value={uploadContent}
              onChange={(e) => setUploadContent(e.target.value)}
              className="mt-4 min-h-32"
            />
          </Card>

          <div className="bg-secondary/30 p-4 rounded-lg border border-border text-sm text-muted-foreground">
            <p className="font-medium mb-2">系统将自动提取：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>案号、法院名称</li>
              <li>原告诉求和金额</li>
              <li>答辩/举证截止日期</li>
            </ul>
          </div>

          <Button onClick={() => setCurrentStep("manual")} className="w-full">
            继续 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>

        <TabsContent value="manual" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              关键信息确认
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>如果上传材料抽取有误，请在此手填或修正</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">案号 *</label>
                <Input placeholder="如：(2023)粤0101民初 1234 号" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">原告诉求 *</label>
                <Textarea placeholder="主要诉求（如：要求被告支付借款本金及利息 5 万元）" rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">答辩/举证截止日期 *</label>
                <Input type="date" />
              </div>
            </div>
          </Card>

          <Button onClick={handleSubmit} className="w-full bg-primary">
            生成答辩状草稿 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  )

  const renderPlaintiffFlow = () => (
    <div className="space-y-6">
      {/* 步骤指示器 */}
      <div className="flex gap-2">
        {["当事人", "诉讼请求", "时间线", "证据"].map((label, idx) => (
          <div
            key={idx}
            className={`flex-1 h-1 rounded-full ${
              idx < (currentStep === "timeline" ? 3 : currentStep === "evidence" ? 4 : currentStep === "claims" ? 2 : 1)
                ? "bg-primary"
                : "bg-border"
            }`}
          />
        ))}
      </div>

      {currentStep === "parties" && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">第一步：当事人信息</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">原告姓名 *</label>
              <Input
                placeholder="你的全名"
                value={formData.plaintiffName}
                onChange={(e) => setFormData({ ...formData, plaintiffName: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">联系电话</label>
              <Input placeholder="手机号或座机" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">住址</label>
              <Input placeholder="现住址（用于诉讼送达）" />
            </div>
          </div>

          <hr className="my-6 border-border" />

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">被告信息</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">被告姓名/公司名 *</label>
                <Input placeholder="对方的全名或公司法定代表人" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">联系方式</label>
                <Input placeholder="电话或邮箱（如有）" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-1">住址</label>
                <Input placeholder="被告住址或公司地址" />
              </div>
            </div>
          </div>

          <Button onClick={() => setCurrentStep("claims")} className="w-full">
            下一步 <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      )}

      {currentStep === "claims" && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">第二步：诉讼请求</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1 flex items-center gap-1">
                主要诉讼请求 *
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>你的最主要诉求，如支付欠款</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
              <Textarea
                placeholder="例：要求被告支付借款 50,000 元"
                value={formData.claimMain}
                onChange={(e) => setFormData({ ...formData, claimMain: e.target.value })}
                rows={2}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">金额（如有）</label>
              <div className="flex gap-2">
                <span className="text-muted-foreground pt-2">￥</span>
                <Input
                  placeholder="请输入数字，不含货币符号"
                  value={formData.claimAmount}
                  onChange={(e) => setFormData({ ...formData, claimAmount: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">备选诉求（可选）</label>
              <Textarea
                placeholder="例：如主请求不成立，请求被告赔偿经济损失"
                value={formData.claimSecondary}
                onChange={(e) => setFormData({ ...formData, claimSecondary: e.target.value })}
                rows={2}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep("parties")} className="flex-1">
              上一步
            </Button>
            <Button onClick={() => setCurrentStep("timeline")} className="flex-1">
              下一步 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {currentStep === "timeline" && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">第三步：事实时间线（至少 3 点）</h3>

          <div className="space-y-3">
            {formData.timeline.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  type="date"
                  className="w-32"
                  value={item.date}
                  onChange={(e) => {
                    const newTimeline = [...formData.timeline]
                    newTimeline[idx].date = e.target.value
                    setFormData({ ...formData, timeline: newTimeline })
                  }}
                />
                <Input
                  placeholder="发生了什么事（如：与被告签订借款协议）"
                  className="flex-1"
                  value={item.event}
                  onChange={(e) => {
                    const newTimeline = [...formData.timeline]
                    newTimeline[idx].event = e.target.value
                    setFormData({ ...formData, timeline: newTimeline })
                  }}
                />
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full text-sm bg-transparent">
            + 添加更多事件
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep("claims")} className="flex-1">
              上一步
            </Button>
            <Button onClick={() => setCurrentStep("evidence")} className="flex-1">
              下一步 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {currentStep === "evidence" && (
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold text-foreground mb-4">第四步：证据清单</h3>

          <div className="bg-secondary/20 p-4 rounded-lg border border-border text-sm text-muted-foreground">
            <p className="font-medium mb-2">根据"民间借贷"案由的常见证据：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>借款协议或转账记录</li>
              <li>转账凭证或银行流水</li>
              <li>欠条或借条</li>
              <li>催款记录（短信/微信）</li>
              <li>证人证言</li>
              <li>其他相关证据</li>
            </ul>
          </div>

          <Textarea
            placeholder="请列举你拥有的证据（可逐行列举）"
            value={formData.evidenceNotes}
            onChange={(e) => setFormData({ ...formData, evidenceNotes: e.target.value })}
            rows={4}
          />

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setCurrentStep("timeline")} className="flex-1">
              上一步
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-primary">
              生成起诉状 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-primary hover:underline">
            ← 返回首页
          </Link>
          <span className="text-sm text-muted-foreground">
            {role === "defendant" ? "被告答辩" : "原告起诉"} -{" "}
            {cause === "loan" ? "民间借贷" : cause === "consumer" ? "消费者权益" : "房屋租赁"}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        {role === "defendant" ? renderDefendantFlow() : renderPlaintiffFlow()}
      </main>
    </div>
  )
}
