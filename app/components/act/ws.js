const defaults = {
  url: 'ws://127.0.0.1:10501/ws',
}
const regex = /[\?&]OVERLAY_WS=([^&]+)/

export default class ACTWebsocket {
  #ws

  #parse(message) {
    try {
      const data = JSON.parse(message.data)

      console.log(data)
    } catch (e) {
      console.error(e)
    }
  }

  connect(url) {
    this.#ws = new WebSocket(regex.exec(url)?.[1] ?? defaults.url)

    this.#ws.addEventListener('open', () => {
      console.log('ACTWS connected')

      this.#ws.send(
        JSON.stringify({
          call: 'subscribe',
          events: ['ChangeZone'],
        }),
      )
    })

    this.#ws.addEventListener('message', (message) => this.#parse(message))

    this.#ws.addEventListener('close', (e) => {
      console.warn('ACTWS closed:', e)
      setTimeout(this.connect.bind(this, url), 5 * 1000)
    })

    this.#ws.addEventListener('error', (e) => console.error(e))
  }
}
