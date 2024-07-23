// Import components
import { Link } from '@remix-run/react'
import { useEffect, useRef, useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

// Import our components
import { useACT, useIDB } from '~/hooks'
import ToolbarPlugin from '~/components/lexical/Toolbar'

// Import interfaces
import type { MetaFunction } from '@remix-run/node'
import type { FormEvent, MouseEvent } from 'react'
import type { EditorState, LexicalEditor, SerializedEditorState } from 'lexical'

import theme from '~/components/lexical/theme.json'

export const meta: MetaFunction = () => {
  return [{ title: 'ACT Overlay - Notebox' }]
}

export default function Index() {
  // Hooks
  const ACT = useACT()
  const IDB = useIDB()
  // States
  const [state, setState] = useState<SerializedEditorState>()
  const [title, setTitle] = useState<string>()
  // Refs
  const $id = useRef(nanoid(5))
  const $ref = useRef<LexicalEditor>()
  const $title = useRef<HTMLSpanElement>()

  const handleChange = (
    _state: EditorState,
    editor: LexicalEditor,
    tags: Set<string>,
  ) => {
    setState(_state.toJSON())
  }

  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {}

  const handleError = (e: Error, editor: LexicalEditor) => console.error(e)

  const handleTitle = (e: FormEvent<HTMLSpanElement>) => {
    e.preventDefault()
    setTitle(e.currentTarget.innerHTML)
  }

  useEffect(() => {
    if (state === undefined && title === undefined) return () => {}

    IDB.update($id.current, {
      ...state,
      title,
    })
  }, [state, title])

  return (
    <div className="absolute top-2 start-2 rounded-lg bg-gold shadow-outer w-1/6 p-1 text-1xl">
      <div className="rounded-lg bg-gradient shadow-inner p-2">
        <div className="flex flex-nowrap items-center">
          <h1 className="flex flex-nowrap flex-grow items-center gap-2">
            <i className="bi bi-journal-bookmark" />
            <span
              ref={$title}
              className="flex flex-grow outline-none"
              contentEditable
              onInput={handleTitle}
            >
              The box
            </span>
          </h1>
          <span>
            <Link to="/" onClick={handleClose}>
              <i className="bi bi-x-lg" />
            </Link>
          </span>
        </div>
        <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
        <LexicalComposer
          initialConfig={{
            namespace: 'notebox',
            onError: handleError,
            theme,
          }}
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
                  <span className="absolute pointer-events-none top-2 start-2">
                    Enter some text...
                  </span>
                }
                ErrorBoundary={LexicalErrorBoundary}
              />
            </div>
          </div>
          <AutoFocusPlugin />
          <EditorRefPlugin editorRef={$ref} />
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
        </div>
      </div>
    </div>
  )
}
