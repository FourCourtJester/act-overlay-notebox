// Import components
import { useId } from 'react'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

// Import our components
import { useACT } from '~/hooks'
import ToolbarPlugin from '~/components/lexical/Toolbar'

// Import interfaces
import type { MetaFunction } from '@remix-run/node'
import type { EditorState, LexicalEditor } from 'lexical'

import theme from '~/components/lexical/theme.json'

export const meta: MetaFunction = () => {
  return [{ title: 'ACT Overlay - Notebox' }]
}

export default function Index() {
  // Hooks
  const id = useId()
  const ACT = useACT()

  const handleChange = (
    state: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) => console.log(state.toJSON())

  const handleError = (e: Error, editor: LexicalEditor) => console.error(e)

  return (
    <div className="rounded-lg bg-gold shadow-outer p-1">
      <div className="rounded bg-gradient shadow-inner p-2">
        <div className="flex flex-nowrap justify-between items-center text-1xl">
          <h1 className="flex flex-nowrap items-center gap-2">
            <i className="bi bi-journal" />
            <span>The box</span>
          </h1>
          <span className="flex flex-nowrap items-center gap-3">
            <i className="bi bi-pin" />
            <i className="bi bi-x-lg" />
          </span>
        </div>
        <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
        <LexicalComposer
          initialConfig={{ namespace: 'notebox', onError: handleError, theme }}
        >
          <div className="editor relative">
            <ToolbarPlugin />
            <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
            <div className="relative">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="p-2 w-full min-h-8 outline-0" />
                }
                placeholder={
                  <span className="absolute pointer-events-none top-4 start-4">
                    Enter some text...
                  </span>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </div>
          <AutoFocusPlugin />
          <HistoryPlugin />
          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={handleChange}
          />
        </LexicalComposer>
        <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
        <div className="flex flex-nowrap justify-end items-center text-1xl gap-2">
          <button className="btn rounded-4xl border-t border-solid border-highlight bg-button shadow-button text-center text-shadow-body px-5 py-1">
            <i className="bi bi-copy" />
          </button>
          <button className="btn rounded-4xl border-t border-solid border-highlight bg-button shadow-button text-center text-shadow-body px-5 py-1">
            <i className="bi bi-floppy" />
          </button>
        </div>
      </div>
    </div>
  )
}
