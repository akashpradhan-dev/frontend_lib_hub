'use cleint'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { colorBrewer } from 'react-syntax-highlighter/dist/esm/styles/hljs'
// import { coldarkDark } from 'react-syntax-highlighter'

export const SyntaxHighlight = ({ codeBlock }: { codeBlock: string }) => {
  return (
    <SyntaxHighlighter language="javascript">{codeBlock}</SyntaxHighlighter>
  )
}
