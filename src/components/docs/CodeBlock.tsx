import { useEffect, useRef, useState } from 'react'
import { highlight } from '@/lib/highlight'
import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, lang = 'typescript', filename, className }: CodeBlockProps) {
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)
  const ref = useRef(false)

  useEffect(() => {
    if (ref.current) return
    ref.current = true
    highlight(code.trim(), lang).then(setHtml)
  }, [code, lang])

  const copy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className={cn('group relative rounded-xl border border-[#1e1e2a] overflow-hidden bg-[#0d0d14]', className)}>
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1e1e2a] bg-[#0a0a0f]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#8888aa] text-xs font-mono ml-1">{filename}</span>
        </div>
      )}
      <div className="relative overflow-x-auto p-4">
        {html ? (
          <div dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="text-[#8888aa] text-xs font-mono">{code.trim()}</pre>
        )}
      </div>
      <button
        onClick={copy}
        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-[#1e1e2a] hover:bg-[#2a2a3a] text-[#8888aa] hover:text-[#f0f0f8]"
        title="Copy"
      >
        {copied ? <Check size={13} /> : <Copy size={13} />}
      </button>
    </div>
  )
}
