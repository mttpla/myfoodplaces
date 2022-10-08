import React from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { Moment } from "moment";
import { SearchParams } from '../utils/Type';

interface SearchFormProps {
  search: SearchParams;
  searchFn: CallableFunction;
}

class SearchForm extends React.Component<SearchFormProps> {
  private handleSearchChange = (text: string, timeMin: Date, timeMax: Date) => {
    this.props.searchFn({
      text: text,
      timeMin: timeMin,
      timeMax: timeMax,
    });
  };

  private handleSearchTimeMinChange = (timeMinValue: Moment | null) => {
    this.handleSearchChange(
      this.props.search.text,
      timeMinValue ? timeMinValue.toDate() : this.props.search.timeMin,
      this.props.search.timeMax
    );
  };

  private handleSearchTimeMaxChange = (timeMaxValue: Moment | null) => {
    this.handleSearchChange(
      this.props.search.text,
      this.props.search.timeMin,
      timeMaxValue ? timeMaxValue.toDate() : this.props.search.timeMax
    );
  };

  private handleSearchTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    this.handleSearchChange(
      event.target.value,
      this.props.search.timeMin,
      this.props.search.timeMax
    );
  };

  render() {
    return (
      <div>
        <TextField
          id="searchText"
          label="Text"
          defaultValue={this.props.search.text}
          onChange={this.handleSearchTextChange}
        />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileDatePicker
            label="From"
            inputFormat="DD/MM/YYYY"
            value={this.props.search.timeMin}
            onChange={this.handleSearchTimeMinChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <MobileDatePicker
            label="To"
            inputFormat="DD/MM/YYYY"
            value={this.props.search.timeMax}
            onChange={this.handleSearchTimeMaxChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
    );
  }
}

export default SearchForm;
