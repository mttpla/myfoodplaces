import React, { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import TextField from "@mui/material/TextField";
import { SearchParams } from "../utils/Type";
import { useTranslation } from "react-i18next";

interface SearchFormProps {
  search: SearchParams;
  searchFn: CallableFunction;
}

export function SearchForm(props: SearchFormProps) {
  const { t } = useTranslation();

  const [text, setText] = useState<String>(props.search.text);
  const [timeMax, setTimeMax] = useState<Date>(props.search.timeMax);
  const [timeMin, setTimeMin] = useState<Date>(props.search.timeMin);
  const searchFn = props.searchFn;

  useEffect(() => {
    searchFn({
      text: text,
      timeMin: timeMin,
      timeMax: timeMax,
    });
  }, [text, timeMin, timeMax, searchFn]);

  return (
    <div>
      <TextField
        id="searchText"
        label={t("t.searchTextLabel")}
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <MobileDatePicker
          label={t("t.searchFromLabel")}
          inputFormat={t("t.datePattern")}
          value={timeMin}
          onChange={(event) => setTimeMin(event || new Date())}
          renderInput={(params) => <TextField {...params} />}
        />
        <MobileDatePicker
          label={t("t.searchToLabel")}
          inputFormat={t("t.datePattern")}
          value={timeMax}
          onChange={(event) => setTimeMax(event || new Date())}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
}
