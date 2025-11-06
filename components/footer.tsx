"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/20 mt-8">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* 产品相关 */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">产品</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link
                  href="/case/new?role=defendant"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  生成答辩状
                </Link>
              </li>
              <li>
                <Link
                  href="/case/new?role=plaintiff"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  生成起诉状
                </Link>
              </li>
            </ul>
          </div>

          {/* 法律文档 */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">法律条款</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  使用条款
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  隐私政策
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  免责声明
                </Link>
              </li>
            </ul>
          </div>

          {/* 关于我们 */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">关于</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  常见问题
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  反馈建议
                </Link>
              </li>
            </ul>
          </div>

          {/* 关注我们 */}
          <div>
            <h4 className="font-semibold text-foreground text-sm mb-4">关注我们</h4>
            <p className="text-sm text-muted-foreground mb-3">获取最新资讯</p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-center transition-colors"
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-center transition-colors"
                aria-label="GitHub"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@example.com"
                className="w-8 h-8 rounded-full bg-secondary hover:bg-accent text-foreground hover:text-accent-foreground flex items-center justify-center transition-colors"
                aria-label="Email"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 分割线和版权 */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground text-center">© {currentYear} 民事纠纷小白助手. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}
