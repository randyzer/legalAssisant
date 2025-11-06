"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Trash2, Lock } from "lucide-react"

export default function Privacy() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleClearData = () => {
    localStorage.clear()
    sessionStorage.clear()
    setShowDeleteConfirm(false)
    alert("所有本地数据已清除")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm font-medium text-primary hover:underline">
            ← 返回首页
          </Link>
          <h1 className="text-lg font-semibold">隐私与设置</h1>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="privacy">隐私声明</TabsTrigger>
            <TabsTrigger value="disclaimer">免责声明</TabsTrigger>
            <TabsTrigger value="data">数据管理</TabsTrigger>
          </TabsList>

          {/* 隐私声明 */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">隐私保护政策</h2>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. 数据存储</h3>
                  <p>
                    本应用所有用户输入数据（当事人信息、诉讼请求、证据等）仅存储在您的本地浏览器中，不会上传至服务器。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. 网络通信</h3>
                  <p>
                    • 文书生成完全在本地进行（无需服务器）
                    <br />• 如涉及可选的自动抽取功能，仅上传结构化最小字段（如案号、诉求），不包含正文内容
                    <br />• 所有通信采用 HTTPS 加密
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Cookie 与追踪</h3>
                  <p>我们使用最少量的分析埋点（如步骤完成率、导出转化率），不涉及个人身份识别。</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. 用户权利</h3>
                  <p>您有权随时在"数据管理"页面一键清除所有本地存储的数据。</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* 免责声明 */}
          <TabsContent value="disclaimer" className="space-y-6">
            <Card className="p-6 border-destructive/30 bg-destructive/5">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
                <h2 className="text-lg font-semibold text-destructive">重要免责声明</h2>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. 非法律专业咨询</h3>
                  <p>本工具不提供法律建议，不能替代律师咨询。生成的文书仅为草稿参考，使用者需自行承担全部法律责任。</p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. 准确性免责</h3>
                  <p>
                    • 自动抽取功能可能存在错误，建议用户主动验证和修正
                    <br />• 文书内容由用户输入生成，本工具不对内容的真实性和合法性负责
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. 诉讼风险</h3>
                  <p>
                    • 不能保证按本工具生成的文书起诉/答辩会获胜
                    <br />• 法律程序随地区、案件具体情况而异，使用者需了解当地法律规定
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">4. 禁止事项</h3>
                  <p>
                    本工具不支持以下情况的文书生成：刑事案件、复杂家事纠纷、涉未成年人隐私、涉密事项、群体性事件等。
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">5. 建议</h3>
                  <p>如案件复杂、争议金额较大或时间紧急，强烈建议咨询专业律师。</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-primary/30 bg-primary/5">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                劳动争议额外提示
              </h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">如果你的纠纷涉及劳动关系，请注意：</span>
                在向法院起诉前，一般需要先向劳动部门申请仲裁。具体规定请咨询当地劳动部门或律师。
              </p>
            </Card>
          </TabsContent>

          {/* 数据管理 */}
          <TabsContent value="data" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">数据管理</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    本地存储
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    您的所有输入数据存储在浏览器本地。切换浏览器或清空浏览历史后，数据将丢失。
                  </p>

                  <div className="bg-secondary/20 p-4 rounded border border-border text-sm space-y-2">
                    <p>
                      <span className="font-medium">存储位置：</span> 浏览器 IndexedDB / LocalStorage
                    </p>
                    <p>
                      <span className="font-medium">容量：</span> 通常为 50MB 以上
                    </p>
                    <p>
                      <span className="font-medium">有效期：</span> 永久存储，直到手动清除或清空浏览数据
                    </p>
                  </div>
                </div>

                <hr className="border-border" />

                <div>
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    清除数据
                  </h3>

                  {!showDeleteConfirm ? (
                    <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)} className="w-full">
                      一键清除所有本地数据
                    </Button>
                  ) : (
                    <Card className="p-4 border-destructive/30 bg-destructive/5">
                      <p className="text-sm font-medium text-destructive mb-4">
                        确定要清除所有本地数据吗？此操作不可撤销。
                      </p>
                      <div className="flex gap-2">
                        <Button variant="destructive" onClick={handleClearData} className="flex-1">
                          确定清除
                        </Button>
                        <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="flex-1">
                          取消
                        </Button>
                      </div>
                    </Card>
                  )}

                  <p className="text-xs text-muted-foreground mt-3">
                    清除后，刷新页面将不再显示任何历史数据。如需恢复，请从备份中恢复（如之前导出过 PDF）。
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
