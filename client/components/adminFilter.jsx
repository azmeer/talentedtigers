import React from 'react';
import ReactDom from 'react-dom';

const AdminFilter = ({filterTickets, ticketCategoryList}) => (
  <form>
    <div className="form-group row">
      <div className="col-xs-3">
        <label htmlFor="select-category">Select Category</label>
        <select className="form-control" id="select-category">
          {ticketCategoryList.map((category, index) => <option key={index}>{category}</option>)}
        </select>
      </div>
      <div className="col-xs-3">
        <label htmlFor="ticket-status">Ticket Status</label>
        <select className="form-control" id="ticket-status">
          <option>Opened</option>
          <option>Closed</option>
        </select>
      </div>
      <div className="col-xs-3">
        <label htmlFor="time-window">Time Window</label>
        <select className="form-control" id="time-window">
          <option value="1">Today</option>
          <option value="7">Last Week</option>
          <option value="30">Last Month</option>
          <option value="365">Last Year</option>
          <option value="3650">All</option>
        </select>
      </div>
      <div className="col-xs-3">
        <label>&nbsp;</label>
        <br />
        <button onClick={filterTickets} type="submit" id="filter-button" className="btn btn-primary">Filter Tickets</button>
      </div>
    </div>
  </form>
);

export default AdminFilter;
