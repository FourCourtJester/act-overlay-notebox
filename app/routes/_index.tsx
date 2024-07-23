// Import components
import { useState } from 'react'
import { Link } from 'react-router-dom'
import cN from 'classnames'

// Import our components
// ...

// Import interfaces
import type { MetaFunction } from '@remix-run/node'
import type { MouseEvent } from 'react'

export const meta: MetaFunction = () => {
  return [{ title: 'ACT Overlay - Notebox' }]
}

const collapsedStyle = ['rounded-full']
const expandedStyle = ['rounded-lg']

export default function Index() {
  const [isCollapsed, setCollapsed] = useState(true)

  const handleCollapse = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setCollapsed((_state) => !_state)
  }

  return (
    <div
      className={cN(
        'absolute top-2 start-2 bg-gold shadow-outer p-1 text-1xl',
        isCollapsed ? collapsedStyle : expandedStyle,
      )}
    >
      <div
        className={cN(
          'bg-gradient shadow-inner p-2',
          isCollapsed ? collapsedStyle : expandedStyle,
        )}
      >
        {isCollapsed ? (
          <button onClick={handleCollapse}>
            <h1>
              <i className="bi bi-journal-bookmark text-center" />
            </h1>
          </button>
        ) : (
          <>
            <div className="flex flex-nowrap justify-between items-start w-full gap-2">
              <h1 className="flex gap-2">
                <i className="bi bi-journal-bookmark" />
                <span>Notebox</span>
              </h1>
              <button onClick={handleCollapse}>
                <h1>
                  <i className="bi bi-x-lg" />
                </h1>
              </button>
            </div>
            <div className="border-none h-[1px] min-h-[1px] w-full shadow-hr my-2" />
            <div className="text-center w-full">
              <i>No notes</i>
            </div>
            <div className="border-none h-[1px] min-h-[1px] w-full shadow-hr my-2" />
            <div className="flex flex-nowrap items-center justify-end gap-2 w-full">
              <Link
                to="new"
                className="btn rounded-4xl border-t border-solid border-highlight bg-button shadow-button text-center text-shadow-body px-5 py-1"
              >
                <i className="bi bi-plus-lg" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
