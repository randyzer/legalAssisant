"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gavel } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Logo 和标题 */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Gavel className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-semibold text-foreground">民事纠纷小白助手</h1>
        </Link>

        {/* 导航链接和认证按钮 */}
        <nav className="flex items-center gap-6">
          <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            价格方案
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            隐私政策
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              登陆
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              注册
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
