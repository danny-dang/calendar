import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { CustomToolbar } from "./CustomToolbar";

moment.locale("fr", {
  week: {
    dow: 1
  }
});

moment.updateLocale("fr", {
  months: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ],
  weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
});

const formats = {
  dayRangeHeaderFormat: (date, culture, localizer) =>
    localizer.format(date, 'MMMM', 'fr') + ' ' +
    localizer.format(date, 'YYYY', 'fr')
};

const localizer = momentLocalizer(moment);

export default class BigCalendar extends Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
    this.handleSelect = this.handleSelect.bind(this)
    this.handleNavigate = this.handleNavigate.bind(this)
  }

  async handleSelect({ start, end }) {
    await this.props.toggleCreateModal(true)
    await this.props.setStartEndCreateEvent(start, end)
  }

  handleNavigate(e) {
    this.props.handleCurrentDateChange(e)
  }

  render() {
    return (
      <Calendar
        selectable
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={this.handleSelect}
        events={this.props.events}
        defaultView="week"
        date={this.props.currentDate}
        onNavigate={this.handleNavigate}
        localizer={localizer}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    );
  }
}


