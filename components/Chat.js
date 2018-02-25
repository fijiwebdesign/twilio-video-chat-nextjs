import { Component } from 'react'
import io from 'socket.io-client'
import fetch from 'isomorphic-fetch'
import chat from '../js/chat'
import _debug from 'debug'

const debug = _debug('chat:com:chat')

const host = 'http://localhost:3000'

let $

class Chat extends Component {
  // fetch old messages data from the server
  static async getInitialProps({ req }) {
    const response = await fetch(host + '/messages')
    const messages = await response.json()
    debug('messages', messages)
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
    $ = window.jQuery
    this.socket = io(host)
    this.socket.on('message', this.handleMessage)
    debug('elScroll', this.elScroll)
    const height = $(this.elScroll).parent().height() - 220
    $(this.elScroll).slimscroll({
      start: 'bottom',
      height: height // '100%'
    })
  }

  componentDidUpdate() {
    const bottomCoord = $(this.elScroll)[0].scrollHeight
    $(this.elScroll).slimScroll({scrollTo: bottomCoord})
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

  render() {
    return (
      <div className="full-height-scroll" ref={ref => this.elScroll = ref}>
        <ul className="list-group elements-list">
          {this.state.messages.map(msg => {
            return (<li className="list-group-item" key={msg.id}>
              <a data-toggle="tab" href="#tab-1">
                <small className="pull-right text-muted"> 16.02.2015</small>
                <strong>Ann Smith</strong>
                <div className="small m-t-xs">
                  <p>
                    {msg.value}
                  </p>
                  <p className="m-b-none">
                    <i className="fa fa-map-marker"></i> Riviera State 32/106
                            </p>
                </div>
              </a>
            </li>)
          })}
        </ul>
    </div>
    )
  }
}

export default Chat
