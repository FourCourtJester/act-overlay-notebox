// Import components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faClipboard,
  faCopy,
  faFloppyDisk,
} from '@fortawesome/free-regular-svg-icons'
import { faThumbtack, faXmark } from '@fortawesome/free-solid-svg-icons'
// ...

// Import our components
import { useACT } from '~/hooks'

// Import interfaces
import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'ACT Overlay - Notebox' }]
}

export default function Index() {
  const ACT = useACT()

  return (
    <div className="rounded-lg bg-gold shadow-outer p-1">
      <div className="rounded bg-gradient shadow-inner p-2">
        <div className="flex flex-nowrap justify-between items-center text-2xl">
          <h1 className="flex flex-nowrap items-center gap-2">
            <FontAwesomeIcon icon={faClipboard} />
            <span>The box</span>
          </h1>
          <span className="flex flex-nowrap items-center gap-3">
            <FontAwesomeIcon icon={faThumbtack} />
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </div>
        <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
        <div>Lorem ipsum</div>
        <div className="border-none h-[1px] min-h-[1px] shadow-hr my-2" />
        <div className="flex flex-nowrap justify-end items-center text-1xl gap-2">
          <button className="btn rounded-4xl border-t border-solid border-highlight bg-button shadow-button text-center text-shadow-body px-5 py-1">
            <FontAwesomeIcon icon={faCopy} />
          </button>
          <button className="btn rounded-4xl border-t border-solid border-highlight bg-button shadow-button text-center text-shadow-body px-5 py-1">
            <FontAwesomeIcon icon={faFloppyDisk} />
          </button>
        </div>
      </div>
    </div>
  )
}
