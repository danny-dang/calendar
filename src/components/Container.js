import React, { Component } from "react";
import BigCalendar from './BigCalendar';
import MiniCalenadar from './MiniCalendar';
import { Button, Modal, TextInput } from 'react-materialize';
import Datetime from "react-datetime";

export default class Container extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
      currentDate: new Date(),
      isShowCreateModal: false,
      createEvent: {
        title: '',
        start: '',
        end: ''
      }
    };
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleStartChange = this.handleStartChange.bind(this)
    this.handleEndChange = this.handleEndChange.bind(this)
    this.setStartEndCreateEvent = this.setStartEndCreateEvent.bind(this)
    this.toggleCreateModal = this.toggleCreateModal.bind(this)
    this.handleCurrentDateChange = this.handleCurrentDateChange.bind(this)
  }

  componentDidMount() {
    this.fetchEvent();
  }

  fetchEvent() {
    fetch("http://127.0.0.1:8000/api/appointment")
      .then(res => res.json())
      .then(data => this.updateStringDate(data))
      .then(data => {
        this.setState({ events: data });
      });
  }

  updateStringDate(data) {
    data.map(x => ((x.start = new Date(x.start)), (x.end = new Date(x.end))));
    return data;
  }

  toggleCreateModal(isShow) {
    this.setState({ isShowCreateModal: isShow });
  }

  async handleCurrentDateChange(e) {
    await this.setState({
      currentDate: e
    });
  }

  async handleTitleChange(e) {
    await this.setState({
      createEvent: {
        ...this.state.createEvent,
        title: e.target.value
      }
    });
  }

  async handleStartChange(e) {
    console.log(e)
    await this.setState({
      createEvent: {
        ...this.state.createEvent,
        start: e
      }
    });
  }

  async handleEndChange(e) {
    await this.setState({
      createEvent: {
        ...this.state.createEvent,
        end: e
      }
    });
  }

  async setStartEndCreateEvent(start, end) {
    await this.setState({
      createEvent: {
        ...this.state.createEvent,
        start,
        end
      }
    });
  }

  // Create the new event Submit handler
  async createEvent() {
    let newEvent = this.state.createEvent

    await this.setState({
      events: [...this.state.events, newEvent]
    });

    await this.setState({
      createEvent: {
        title: '',
        start: '',
        end: ''
      }
    });

    this.postEvent(newEvent)
  }

  // Post event to backend
  async postEvent(payload) {
    try {
      let response = await fetch('http://127.0.0.1:8000/api/your-api-here', {
        body: JSON.stringify(payload),
        method: 'POST'
      })
      let data = await response.json()
      return data
    } catch (error) {
      return { error }
    }
  }

  renderInputStart(props, openCalendar, closeCalendar) {
    return (
      <TextInput
        {...props}
        id="TextInput-4"
        label="Start time"
        placeholder="Start time"
      />
    );
  }

  renderInputEnd(props, openCalendar, closeCalendar) {
    return (
      <TextInput
        {...props}
        id="TextInput-4"
        label="End time"
        placeholder="End time"
      />
    );
  }

  render() {
    return (
      <div className='container-content'>
        <Modal
          actions={[
            <Button
              onClick={() => this.createEvent()}
              modal="close"
              node="button"
            >Create</Button>,
            <Button
              onClick={() => this.toggleCreateModal(false)}
              flat
              modal="close"
              node="button"
              waves="green">Close</Button>
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header="Create a new event"
          id="Modal-0"
          open={this.state.isShowCreateModal}
          options={{
            dismissible: true,
            endingTop: '10%',
            inDuration: 250,
            onCloseEnd: () => this.toggleCreateModal(false),
            onCloseStart: null,
            opacity: 0.5,
            outDuration: 250,
            preventScrolling: true,
            startingTop: '4%'
          }}>
          <div className='create-event-form'>
            <TextInput
              value={this.state.createEvent.title}
              onChange={this.handleTitleChange}
              id="TextInput-4"
              label="Title"
              placeholder="Title"
            />
            <Datetime
              value={this.state.createEvent.start}
              onChange={this.handleStartChange}
              renderInput={this.renderInputStart} />
            <Datetime
              value={this.state.createEvent.end}
              onChange={this.handleEndChange}
              renderInput={this.renderInputEnd} />
          </div>
        </Modal>
        <div className='sidebar'>
          <Button
            className='sidebar__create-button'
            node="button"
            style={{ marginRight: "5px" }}
            waves="light"
            onClick={() => this.toggleCreateModal(true)}
          >
            + Create
          </Button>
          <MiniCalenadar
            handleCurrentDateChange={this.handleCurrentDateChange}
            currentDate={this.state.currentDate}
            events={this.state.events} />
        </div>
        <div className='main-content'>
          <BigCalendar
            handleCurrentDateChange={this.handleCurrentDateChange}
            currentDate={this.state.currentDate}
            events={this.state.events}
            toggleCreateModal={this.toggleCreateModal}
            setStartEndCreateEvent={this.setStartEndCreateEvent} />
        </div>
      </div>
    );
  }
}


