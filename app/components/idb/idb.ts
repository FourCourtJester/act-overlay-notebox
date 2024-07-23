// Import components
// ...

// Import our components
// ...

// Import interfaces
import type { SerializedEditorState } from 'lexical'

const version = 1

export default class Singleton extends EventTarget {
  static #instance: Singleton

  #config = {
    db: {
      connected: false,
      namespace: 'Notebox',
    },
  }

  #db?: IDBDatabase

  constructor() {
    super()

    this.connect()

    Singleton.#instance = this
  }

  // Private Functions

  // Public Functions

  connect() {
    return new Promise((resolve, reject) => {
      if (this.#config.db.connected) resolve(true)

      const request = indexedDB.open(this.#config.db.namespace, version)

      request.onerror = (e: Event) =>
        reject((e.target as IDBOpenDBRequest).error)
      request.onsuccess = (e: Event) => {
        this.#config.db.connected = true
        this.#db = (e.target as IDBOpenDBRequest).result

        resolve(true)
      }

      request.onupgradeneeded = (e: IDBVersionChangeEvent) => {
        ;(e.target as IDBOpenDBRequest).result.createObjectStore(
          this.#config.db.namespace,
        )
      }
    }).catch((err) => {
      throw new Error('Could not connect to Notebox IDB instance')
    })
  }

  get(id: string) {
    return Promise.resolve(this.connect()).then(
      (): Promise<SerializedEditorState> =>
        new Promise((resolve, reject) => {
          const transaction = this.#db!.transaction(
            this.#config.db.namespace,
            'readonly',
          )
          const store = transaction.objectStore(this.#config.db.namespace)
          const request = store.get(id)

          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
          }
          request.onsuccess = (event: Event) => {
            resolve((event.target as IDBRequest).result)
          }
        }),
    )
  }

  update(id: string, note: object) {
    return Promise.resolve(this.connect()).then(
      (): Promise<boolean> =>
        new Promise((resolve, reject) => {
          const transaction = this.#db!.transaction(
            this.#config.db.namespace,
            'readwrite',
          )
          const store = transaction.objectStore(this.#config.db.namespace)
          const request = store.put(note, id)

          request.onerror = (event: Event) => {
            reject((event.target as IDBRequest).error)
          }
          request.onsuccess = () => {
            console.log('Note saved successfully!')
            resolve(true)
          }
        }),
    )
  }

  isConnected() {
    return this.#config.db.connected
  }

  // Static Functions

  static getInstance() {
    if (Singleton.#instance) return Singleton.#instance

    return new Singleton()
  }
}
