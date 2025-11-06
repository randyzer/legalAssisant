"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Upload, ArrowRight, ArrowLeft } from "lucide-react"

export default function DefendantPage() {
  const [uploadMode, setUploadMode] = useState<"upload" | "manual" | null>(null)
  const [fileContent, setFileContent] = useState("")
  const [manualData, setManualData] = useState({
    caseNo: "",
    claim: "",
    deadline: "",
  })
  const [extractedData, setExtractedData] = useState<any>(null)
  const [isExtracting, setIsExtracting] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    setFileContent(text)

    // 模拟抽取逻辑
    setIsExtracting(true)
    setTimeout(() => {
      setExtractedData({
        caseNo: "(2024)浙01民初1234号",
        claim: "原告要求被告支付借款本息共计50000元及违约金",
        deadline: "2024-12-15",
      })
      setIsExtracting(false)
    }, 1500)
  }

  const handleTextPaste = (text: string) => {
    setFileContent(text)

    // 模拟抽取逻辑
    setIsExtracting(true)
    setTimeout(() => {
      setExtractedData({
        caseNo: "(2024)浙01民初1234号",
        claim: "原告要求被告支付借款本息共计50000元及违约金",
        deadline: "2024-12-15",
      })
      setIsExtracting(false)
    }, 1500)
  }

  if (uploadMode === "upload") {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">上传法院材料</h1>
            <p className="text-muted-foreground">上传诉状或其他法院文件（支持 PDF、Word、图片）</p>
          </div>

          <Card className="p-8 border-2 border-dashed border-border">
            <div className="flex flex-col items-center justify-center py-12">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">点击或拖拽上传文件</h3>
              <p className="text-sm text-muted-foreground mb-6">支持 PDF、Word、图片格式</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={handleFileUpload}
                className="absolute opacity-0 w-full h-full cursor-pointer"
                style={{ width: "100%", height: "100%" }}
              />
              <Button variant="outline" size="lg">
                选择文件
              </Button>
            </div>
          </Card>

          <div className="mt-6">
            <p className="text-xs text-muted-foreground text-center">
              或者
              <Button variant="link" size="sm" onClick={() => setUploadMode("paste")} className="px-1">
                直接粘贴文本
              </Button>
            </p>
          </div>

          {isExtracting && (
            <div className="mt-8 p-4 bg-secondary/30 border border-border rounded-lg text-center">
              <p className="text-sm text-muted-foreground">正在识别材料内容...</p>
            </div>
          )}

          {extractedData && (
            <Card className="mt-8 p-6 bg-secondary/20 border-border">
              <h3 className="font-semibold text-foreground mb-4">识别结果</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">案号</label>
                  <p className="font-medium text-foreground">{extractedData.caseNo}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">诉讼请求</label>
                  <p className="text-sm text-foreground">{extractedData.claim}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">答辩截止日</label>
                  <p className="font-medium text-foreground">{extractedData.deadline}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button variant="outline" onClick={() => setExtractedData(null)}>
                  重新上传
                </Button>
                <Link href="/case/preview" className="flex-1">
                  <Button className="w-full" size="lg">
                    确认并继续
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </main>
      </div>
    )
  }

  if (uploadMode === "paste") {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">粘贴法院材料</h1>
            <p className="text-muted-foreground">将诉状或其他法律文书的全文粘贴在下方</p>
          </div>

          <Card className="p-6 border border-border">
            <textarea
              value={fileContent}
              onChange={(e) => setFileContent(e.target.value)}
              placeholder="粘贴文本内容..."
              className="w-full h-64 p-4 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </Card>

          <div className="mt-6 flex gap-4">
            <Button variant="outline" onClick={() => setUploadMode(null)} className="flex-1">
              返回
            </Button>
            <Button onClick={() => handleTextPaste(fileContent)} disabled={!fileContent.trim()} className="flex-1">
              识别内容
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {isExtracting && (
            <div className="mt-8 p-4 bg-secondary/30 border border-border rounded-lg text-center">
              <p className="text-sm text-muted-foreground">正在识别文本内容...</p>
            </div>
          )}

          {extractedData && (
            <Card className="mt-8 p-6 bg-secondary/20 border-border">
              <h3 className="font-semibold text-foreground mb-4">识别结果</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">案号</label>
                  <p className="font-medium text-foreground">{extractedData.caseNo}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">诉讼请求</label>
                  <p className="text-sm text-foreground">{extractedData.claim}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">答辩截止日</label>
                  <p className="font-medium text-foreground">{extractedData.deadline}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-4">
                <Button variant="outline" onClick={() => setExtractedData(null)}>
                  重新输入
                </Button>
                <Link href="/case/preview" className="flex-1">
                  <Button className="w-full" size="lg">
                    确认并继续
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </main>
      </div>
    )
  }

  if (uploadMode === "manual") {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-2xl px-4 py-12">
          <div className="mb-8">
            <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">手工填写基本信息</h1>
            <p className="text-muted-foreground">填写以下三项关键信息即可继续</p>
          </div>

          <Card className="p-8 border border-border space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                案号 <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                placeholder="例：(2024)浙01民初1234号"
                value={manualData.caseNo}
                onChange={(e) => setManualData({ ...manualData, caseNo: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                对方诉讼请求 <span className="text-destructive">*</span>
              </label>
              <textarea
                placeholder="例：原告要求被告支付借款本息共计50000元及违约金"
                value={manualData.claim}
                onChange={(e) => setManualData({ ...manualData, claim: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none h-24"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                答辩截止日 <span className="text-destructive">*</span>
              </label>
              <input
                type="date"
                value={manualData.deadline}
                onChange={(e) => setManualData({ ...manualData, deadline: e.target.value })}
                className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground mt-1">通常在收到诉状后15日内</p>
            </div>

            <div className="flex gap-4 mt-8">
              <Button variant="outline" onClick={() => setUploadMode(null)} className="flex-1">
                返回
              </Button>
              <Link
                href="/case/preview"
                className="flex-1"
                onClick={() => {
                  // 保存数据到状态或localStorage
                  localStorage.setItem("caseData", JSON.stringify(manualData))
                }}
              >
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!manualData.caseNo || !manualData.claim || !manualData.deadline}
                >
                  继续到证据清单
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  // 主选择界面
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-4 py-12">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">我被起诉了 - 答辩状生成向导</h1>
          <p className="text-lg text-muted-foreground">三种方式提供法律信息，最快5分钟生成答辩状初稿</p>
        </div>

        {/* 重要提示 */}
        <div className="mb-8 flex gap-3 rounded-lg bg-secondary/30 p-4 border border-border">
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">时间紧张！</p>
            <p>请在答辩截止日期之前完成文书生成和下载。建议尽快开始。</p>
          </div>
        </div>

        {/* 三个选项卡 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 上传文件 */}
          <Card
            className="p-8 cursor-pointer hover:shadow-lg hover:border-accent transition-all border border-border flex flex-col gap-4"
            onClick={() => setUploadMode("upload")}
          >
            <Upload className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">上传文件</h3>
            <p className="text-sm text-muted-foreground flex-1">上传诉状、传票等法院文件，系统自动提取关键信息</p>
            <Button variant="outline" className="mt-auto w-full bg-transparent">
              上传文件
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* 粘贴文本 */}
          <Card
            className="p-8 cursor-pointer hover:shadow-lg hover:border-accent transition-all border border-border flex flex-col gap-4"
            onClick={() => setUploadMode("paste")}
          >
            <AlertCircle className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">粘贴文本</h3>
            <p className="text-sm text-muted-foreground flex-1">复制诉状文本内容，粘贴后系统识别关键信息</p>
            <Button variant="outline" className="mt-auto w-full bg-transparent">
              粘贴文本
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>

          {/* 手工填写 */}
          <Card
            className="p-8 cursor-pointer hover:shadow-lg hover:border-accent transition-all border border-border flex flex-col gap-4"
            onClick={() => setUploadMode("manual")}
          >
            <ArrowRight className="w-8 h-8 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">手工填写</h3>
            <p className="text-sm text-muted-foreground flex-1">仅需填写3项关键信息（案号、诉求、截止日），快速继续</p>
            <Button variant="outline" className="mt-auto w-full bg-transparent">
              手工填写
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </div>
      </main>
    </div>
  )
}
