// Import components
import { useCallback, useEffect, useRef, useState } from 'react'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical'
import { mergeRegister } from '@lexical/utils'
import cN from 'classnames'

function Divider() {
  return <span className="bg-gold inline-block w-[1px] h-full" />
}

const LowPriority = 1
const defaultButtonClasses = [
  'flex',
  'bg-transparent',
  'rounded',
  'p-1',
  'opacity-60',
  'disabled:opacity-20',
]
const defaultIconClasses = ['flex', 'h-4', 'w-4']

export default function ToolbarPlugin() {
  // Contexts
  const [editor] = useLexicalComposerContext()
  // States
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  // Refs
  const $ref = useRef<HTMLDivElement>(null)

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection()

    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'))
      setIsItalic(selection.hasFormat('italic'))
      setIsUnderline(selection.hasFormat('underline'))
    }
  }, [])

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar()
        })
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar()
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload)
          return false
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload)
          return false
        },
        LowPriority,
      ),
    )
  }, [editor, $updateToolbar])

  return (
    <div
      className="toolbar flex flex-wrap items-center text-1xl p-1 gap-3"
      ref={$ref}
    >
      {/* Undo/Redo  */}
      <div className="flex items-center gap-0.5">
        {/* Undo */}
        <button
          disabled={!canUndo}
          onClick={() => {
            editor.dispatchCommand(UNDO_COMMAND, undefined)
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Undo"
        >
          <i
            className={cN(
              'bi bi-arrow-counterclockwise',
              ...defaultIconClasses,
            )}
          />
        </button>
        {/* Redo */}
        <button
          disabled={!canRedo}
          onClick={() => {
            editor.dispatchCommand(REDO_COMMAND, undefined)
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Redo"
        >
          <i className={cN('bi bi-arrow-clockwise', ...defaultIconClasses)} />
        </button>
      </div>
      {/* Bold/Italic/Underline */}
      <div className="flex items-center gap-0.5">
        {/* Bold */}
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')
          }}
          className={cN(
            ...defaultButtonClasses,
            isBold ? 'active opacity-100' : false,
          )}
          aria-label="Format Bold"
        >
          <i className={cN('bi bi-type-bold', ...defaultIconClasses)} />
        </button>
        {/* Italic */}
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')
          }}
          className={cN(
            ...defaultButtonClasses,
            isItalic ? 'active opacity-100' : false,
          )}
          aria-label="Format Italics"
        >
          <i className={cN('bi bi-type-italic', ...defaultIconClasses)} />
        </button>
        {/* Underline */}
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')
          }}
          className={cN(
            ...defaultButtonClasses,
            isUnderline ? 'active opacity-100' : false,
          )}
          aria-label="Format Underline"
        >
          <i className={cN('bi bi-type-underline', ...defaultIconClasses)} />
        </button>
      </div>
      {/* Left/Center/Right/Justified */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Left Align"
        >
          <i className={cN('bi bi-text-left', ...defaultIconClasses)} />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Center Align"
        >
          <i className={cN('bi bi-text-center', ...defaultIconClasses)} />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Right Align"
        >
          <i className={cN('bi bi-text-right', ...defaultIconClasses)} />
        </button>
        <button
          onClick={() => {
            editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify')
          }}
          className={cN(...defaultButtonClasses)}
          aria-label="Justify Align"
        >
          <i className={cN('bi bi-justify', ...defaultIconClasses)} />
        </button>
      </div>
    </div>
  )
}
