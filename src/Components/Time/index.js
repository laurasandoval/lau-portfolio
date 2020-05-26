import React from "react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

function Time(props) {
  const Tag = props.as ? props.as : "time";
  return (
    <Tag dateTime={`${props.year}-${props.month}`} className="date">
      {format(new Date(props.year, props.month - 1), "MMMM yyyy", {
        locale: enUS,
      })}
    </Tag>
  );
}

export default Time;
