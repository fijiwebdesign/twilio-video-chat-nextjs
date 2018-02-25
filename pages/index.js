import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import chat from '../js/chat'
import { startConference, getNewRoomName, getNewUserId, previewLocalVideo } from '../js/conference'
import Chat from '../components/Chat'

import _debug from 'debug'
const debug = _debug('chat:page:index')

const host = 'http://localhost:3000'

class HomePage extends Component
{
  // fetch old messages data from the server
  static async getInitialProps({ req }) {
    debug('req', req)
    const response = await fetch(host + '/messages')
    const messages = await response.json()
    return { messages }
  }

  static defaultProps = {
    messages: [],
  }

  // init state with the prefetched messages
  state = {
    field: '',
    messages: this.props.messages,
  }

  // connect to WS server and listen event
  componentDidMount() {
    this.socket = io(host)
    this.socket.on('message', this.handleMessage)
  }

  // close socket connection
  componentWillUnmount() {
    this.socket.off('message', this.handleMessage)
    this.socket.close()
  }

  // add messages from server to the state
  handleMessage = (message) => {
    this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleChange = event => {
    this.setState({ field: event.target.value });
  }

  // send messages to server and add them to the state
  handleSubmit = event => {
    event.preventDefault()

    // create message object
    const message = {
      id: (new Date()).getTime(),
      value: this.state.field,
    }

    // send object to WS server
    this.socket.emit('message', message)

    // add it to state and clean current input value
    this.setState(state => ({
      field: '',
      messages: state.messages.concat(message)
    }))
  }

  startConference() {
    const userId = localStorage.getItem('userId') || getNewUserId()
    const roomName = localStorage.getItem('roomName') || getNewRoomName()
    debug('starting conference with ', { userId, roomName })
    startConference(userId, roomName, previewLocalVideo)
  }

  render() {
    return (
      <main>
        <div className="fh-column" style={{ float: 'right' }}>
                <div className="video-main" id="local-media">
                    <i className="fa fa-user-o"></i>
                </div>
                <Chat messages={this.state.messages} />
                <form onSubmit={this.handleSubmit}>
                  <input
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Write something..."
                    value={this.state.field}
                  />
                  <button>Send</button>
              </form>
            </div>

            <div className="full-height">
                <div className="full-height-scroll white-bg border-right">

                    <div className="element-detail-box">

                        <div className="tab-content">

                            <div id="tab-2" className="tab-pane active">
                                <div className="pull-right">
                                    <div className="tooltip-demo">
                                            <button id="button-share-screen" className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Start sharing your screen."><i className="fa fa-desktop"></i> Share Screen</button>
                                            <button id="button-unshare-screen" className="btn btn-primary" data-toggle="tooltip" data-placement="left" title="Stop sharing your screen."><i className="fa fa-desktop"></i> Stop Share Screen</button>
                                    </div>
                                </div>
                                <div className="small text-muted">
                                    <i className="fa fa-clock-o"></i> [App Tabs]
                                </div>
                                <div className="whiteboard-app">
                                    <div id="app-notifications"></div>
                                    <div id="remote-media"></div>
                                    <h1 className="header-app">Whiteboard</h1>
                                    <button onClick={this.startConference}>Start Conference</button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
      </main>
    )
  }
}

export default HomePage
