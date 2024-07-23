// Import components
// ...

// Import our components
// ...

export default class Singleton extends EventTarget {
  static #instance: Singleton

  #worker = new SharedWorker(
    '/workers/act.js',
    { name: 'act' } /* webpackChunkName: 'maelstrom-shared-worker.js' */,
  )

  constructor() {
    super()

    // Start the port
    this.#worker?.port.start()

    this.#worker.port.addEventListener('message', this.#parse.bind(this))

    this.action('connect', window.location.href)

    Singleton.#instance = this
  }

  // Private Functions

  #parse(message: MessageEvent) {
    try {
      const { data } = message

      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  // Public Functions

  action(name: string, data: any) {
    this.#worker.port.postMessage({ action: name, data })
  }

  // Static Functions

  static getInstance() {
    if (Singleton.#instance) return Singleton.#instance

    return new Singleton()
  }
}
