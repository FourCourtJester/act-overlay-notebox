/* eslint-disable no-undef */
// To inspect: chrome://inspect/#workers

// Import components
// ...

// Import our components
import ACTWebsocket from '/app/components/act/ws.js'

// Import interfaces
// ...

const ws = new ACTWebsocket()

// Port constructor
self.addEventListener('connect', (event) => {
  const port = event.ports[0]

  port.addEventListener('message', ({ data: messageData }) => {
    const { action, data } = messageData

    console.log(action, data)

    switch (action) {
      default: {
        ws.connect(data)
        break
      }
    }
  })

  console.log('ACT port started')

  port.start()
})

export default self
