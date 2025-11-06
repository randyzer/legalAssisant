"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

export default function PlaintiffPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    plaintiff: { name: "", contact: "", address: "" },
    defendant: { name: "", contact: "", address: "" },
    claims: [{ idx: 1, text: "", amount: undefined }],
    timeline: [
      { date: "", event: "" },
      { date: "", event: "" },
      { date: "", event: "" },
    ],
    evidence: [{ id: "E1", title: "", category: "document", status: "have" as const }],
  })

  const steps = [
    { num: 1, label: "当事人信息", desc: "填写原被告基本信息" },
    { num: 2, label: "诉讼请求", desc: "说明你的诉讼目的" },
    { num: 3, label: "事实时间线", desc: "记录关键事件（≥3个）" },
    { num: 4, label: "证据清单", desc: "列举所有证据" },
  ]

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const addTimelineItem = () => {
    setFormData({
      ...formData,
      timeline: [...formData.timeline, { date: "", event: "" }],
    })
  }

  const removeTimelineItem = (idx: number) => {
    setFormData({
      ...formData,
      timeline: formData.timeline.filter((_, i) => i !== idx),
    })
  }

  const addClaimItem = () => {
    const nextIdx = Math.max(...formData.claims.map((c) => c.idx), 0) + 1
    setFormData({
      ...formData,
      claims: [...formData.claims, { idx: nextIdx, text: "", amount: undefined }],
    })
  }

  const removeClaimItem = (idx: number) => {
    if (formData.claims.length > 1) {
      setFormData({
        ...formData,
        claims: formData.claims.filter((c) => c.idx !== idx),
      })
    }
  }

  const isTimelineValid = formData.timeline.length >= 3 && formData.timeline.every((t) => t.date && t.event)

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-2xl px-4 py-12">
        {/* 返回按钮 */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>

        {/* 标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">我要起诉 - 分步向导</h1>
          <p className="text-lg text-muted-foreground">按步骤填写信息，系统自动生成起诉状</p>
        </div>

        {/* 步骤指示器 */}
        <Card className="p-6 mb-8 bg-secondary/20 border-border">
          <div className="grid grid-cols-4 gap-4">
            {steps.map((step) => (
              <div
                key={step.num}
                className={`flex flex-col gap-2 p-4 rounded-lg cursor-pointer transition-all ${
                  currentStep === step.num
                    ? "bg-primary text-primary-foreground"
                    : currentStep > step.num
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                }`}
                onClick={() => currentStep > step.num && setCurrentStep(step.num)}
              >
                <div className="flex items-center gap-2">
                  {currentStep > step.num ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-current flex items-center justify-center text-xs font-bold">
                      {step.num}
                    </div>
                  )}
                </div>
                <p className="text-sm font-medium">{step.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* 步骤1：当事人信息 */}
        {currentStep === 1 && (
          <Card className="p-8 border border-border space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-6">第1步：填写当事人信息</h2>

              {/* 原告信息 */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">原告（你）</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      姓名/企业名 <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例：张三"
                      value={formData.plaintiff.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          plaintiff: {
                            ...formData.plaintiff,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">联系电话</label>
                    <input
                      type="tel"
                      placeholder="例：13800138000"
                      value={formData.plaintiff.contact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          plaintiff: {
                            ...formData.plaintiff,
                            contact: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">地址</label>
                    <input
                      type="text"
                      placeholder="例：浙江省杭州市西湖区"
                      value={formData.plaintiff.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          plaintiff: {
                            ...formData.plaintiff,
                            address: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>

              {/* 被告信息 */}
              <div className="pt-8 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground mb-4">被告（对方）</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      姓名/企业名 <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="例：李四"
                      value={formData.defendant.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          defendant: {
                            ...formData.defendant,
                            name: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">联系电话</label>
                    <input
                      type="tel"
                      placeholder="例：13900139000"
                      value={formData.defendant.contact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          defendant: {
                            ...formData.defendant,
                            contact: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">地址</label>
                    <input
                      type="text"
                      placeholder="例：浙江省杭州市滨江区"
                      value={formData.defendant.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          defendant: {
                            ...formData.defendant,
                            address: e.target.value,
                          },
                        })
                      }
                      className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 导航按钮 */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              <Button variant="outline" disabled className="flex-1 bg-transparent">
                上一步
              </Button>
              <Button
                onClick={handleNextStep}
                disabled={!formData.plaintiff.name || !formData.defendant.name}
                className="flex-1"
              >
                下一步
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* 步骤2：诉讼请求 */}
        {currentStep === 2 && (
          <Card className="p-8 border border-border space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">第2步：诉讼请求</h2>

            <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>诉讼请求</strong>是指你在起诉中向法院提出的具体要求。可以添加多个请求。
              </p>
            </div>

            <div className="space-y-4">
              {formData.claims.map((claim) => (
                <Card key={claim.idx} className="p-4 border border-border">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-4">
                      <input
                        type="text"
                        placeholder="例：要求被告支付借款本息合计50000元"
                        value={claim.text}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            claims: formData.claims.map((c) =>
                              c.idx === claim.idx ? { ...c, text: e.target.value } : c,
                            ),
                          })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      <input
                        type="number"
                        placeholder="金额（可选）"
                        value={claim.amount || ""}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            claims: formData.claims.map((c) =>
                              c.idx === claim.idx
                                ? { ...c, amount: e.target.value ? Number.parseInt(e.target.value) : undefined }
                                : c,
                            ),
                          })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    {formData.claims.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeClaimItem(claim.idx)} className="h-full">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" onClick={addClaimItem} className="w-full bg-transparent">
              <Plus className="w-4 h-4 mr-2" />
              添加诉讼请求
            </Button>

            {/* 导航按钮 */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              <Button onClick={handleNextStep} disabled={!formData.claims.some((c) => c.text)} className="flex-1">
                下一步
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* 步骤3：事实时间线 */}
        {currentStep === 3 && (
          <Card className="p-8 border border-border space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">第3步：事实与理由 - 时间线</h2>

            <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>时间线</strong>记录案件相关的关键事件。最少需要3个事件。
              </p>
            </div>

            {!isTimelineValid && formData.timeline.some((t) => t.date || t.event) && (
              <div className="flex gap-3 rounded-lg bg-destructive/10 p-4 border border-destructive/20">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm text-foreground">
                  <p className="font-medium">需要至少3个完整事件</p>
                  <p className="text-muted-foreground">
                    已填写：{formData.timeline.filter((t) => t.date && t.event).length}/3
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {formData.timeline.map((item, idx) => (
                <Card key={idx} className="p-4 border border-border">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">发生日期</label>
                      <input
                        type="date"
                        value={item.date}
                        onChange={(e) => {
                          const newTimeline = [...formData.timeline]
                          newTimeline[idx].date = e.target.value
                          setFormData({ ...formData, timeline: newTimeline })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">事件描述</label>
                      <textarea
                        placeholder="例：2023年8月1日，我与李四签订借款合同，约定借款50000元"
                        value={item.event}
                        onChange={(e) => {
                          const newTimeline = [...formData.timeline]
                          newTimeline[idx].event = e.target.value
                          setFormData({ ...formData, timeline: newTimeline })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none h-20"
                      />
                    </div>
                  </div>
                  {formData.timeline.length > 3 && (
                    <Button variant="ghost" size="sm" onClick={() => removeTimelineItem(idx)} className="mt-3 w-full">
                      <Trash2 className="w-4 h-4 mr-2 text-destructive" />
                      删除此项
                    </Button>
                  )}
                </Card>
              ))}
            </div>

            {formData.timeline.length < 5 && (
              <Button variant="outline" onClick={addTimelineItem} className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                添加事件
              </Button>
            )}

            {/* 导航按钮 */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              <Button onClick={handleNextStep} disabled={!isTimelineValid} className="flex-1">
                下一步
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* 步骤4：证据清单 */}
        {currentStep === 4 && (
          <Card className="p-8 border border-border space-y-6">
            <h2 className="text-2xl font-semibold text-foreground mb-6">第4步：证据清单</h2>

            <div className="bg-secondary/20 p-4 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground">
                <strong>证据</strong>是支持你诉讼请求的事实依据。请列举所有相关证据。
              </p>
            </div>

            <div className="space-y-4">
              {formData.evidence.map((evidence) => (
                <Card key={evidence.id} className="p-4 border border-border">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">证据名称</label>
                      <input
                        type="text"
                        placeholder="例：借款合同、转账记录、欠条"
                        value={evidence.title}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            evidence: formData.evidence.map((ev) =>
                              ev.id === evidence.id ? { ...ev, title: e.target.value } : ev,
                            ),
                          })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">证据类型</label>
                      <select
                        value={evidence.category}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            evidence: formData.evidence.map((ev) =>
                              ev.id === evidence.id ? { ...ev, category: e.target.value } : ev,
                            ),
                          })
                        }}
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="document">书证（合同、收据等）</option>
                        <option value="testimony">证人证言</option>
                        <option value="physical">物证</option>
                        <option value="record">记录（录音、视频）</option>
                        <option value="inspection">勘验笔录</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => {
                const nextId = `E${formData.evidence.length + 1}`
                setFormData({
                  ...formData,
                  evidence: [
                    ...formData.evidence,
                    {
                      id: nextId,
                      title: "",
                      category: "document",
                      purpose: "",
                      status: "have",
                      sourceHint: "",
                    },
                  ],
                })
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              添加证据
            </Button>

            {/* 导航按钮 */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-border">
              <Button variant="outline" onClick={handlePrevStep} className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                上一步
              </Button>
              <Link href="/case/preview" className="flex-1">
                <Button
                  onClick={() => {
                    localStorage.setItem("plaintiffData", JSON.stringify(formData))
                  }}
                  className="w-full"
                >
                  生成起诉状
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
