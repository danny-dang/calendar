import React from 'react';
import Toolbar from "react-big-calendar/lib/Toolbar";
import 'moment/locale/fr';
import { IconContext } from "react-icons";
import { Button, Select } from 'react-materialize';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export let views = {
  MONTH: 'month',
  WEEK: 'week',
  WORK_WEEK: 'work_week',
  DAY: 'day',
  AGENDA: 'agenda',
}

export let navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
}



export class CustomToolbar extends Toolbar {
  navigate = (action) => {
    this.props.onNavigate(action);
  };

  render() {
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <Button
            node="button"
            style={{ marginRight: "5px" }}
            waves="light"
            onClick={() => this.navigate(navigate.TODAY)}>
            Aujourd'hui
          </Button>
          <button-chevron
            type="button-chevron"
            onClick={() => this.navigate(navigate.PREVIOUS)}>
            <span>
              <IconContext.Provider
                value={{ color: "#4db6ac", size: "25px", enum: "bold" }}>
                <div>
                  <BsChevronLeft />
                </div>
              </IconContext.Provider>
            </span>
          </button-chevron>
        </span>
        <span className="rbc-btn-group">
          <button-chevron
            className="button-chevron"
            type="button-chevron"
            onClick={() => this.navigate(navigate.NEXT)}>
            <span>
              <IconContext.Provider
                value={{ color: "#4db6ac", size: "25px", enum: "bold" }}>
                <div>
                  <BsChevronRight />
                </div>
              </IconContext.Provider>
            </span>
          </button-chevron>
        </span>
        <span className="rbc-toolbar-label">{this.props.label}</span>
        <Select
          id="Select-9"
          label=""
          multiple={false}
          value={this.props.view}
          onChange={(event) => {
            this.view(event.target.value);
          }}>
          <option value={views.DAY}>Jour</option>
          <option value={views.WEEK}>Semaine</option>
          <option value={views.MONTH}>Mois</option>
        </Select>
      </div>
    );
  }
}

export default CustomToolbar
