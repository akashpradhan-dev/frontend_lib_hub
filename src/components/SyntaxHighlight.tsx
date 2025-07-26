import SyntaxHighlighter from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export const SyntaxHighlight = ({ codeBlock }: { codeBlock: string }) => {
  return (
    <SyntaxHighlighter language="javascript" style={coldarkDark}>
      {codeBlock}
    </SyntaxHighlighter>
  )
}
