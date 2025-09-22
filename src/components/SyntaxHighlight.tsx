'use client'

type CodeBlockProps = {
  codeBlock: string
  filename?: string
}

export const SyntaxHighlight = ({
  codeBlock,
  filename = '',
}: CodeBlockProps) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg shadow-lg overflow-hidden font-mono text-sm my-4">
      {/* Header */}
      <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-2 text-gray-400 text-xs">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>
        <span className="ml-3 ">{filename}</span>
      </div>

      {/* Code */}
      <pre className="p-4 overflow-x-auto text-gray-200 leading-relaxed">
        <code>{codeBlock.trim()}</code>
      </pre>
    </div>
  )
}
