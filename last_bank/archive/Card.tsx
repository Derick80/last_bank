import { Bill } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { format } from "date-fns";
import React, { useState } from "react";
import { numberWithCommas } from "~/utils/format";
import ToolTip from "../app/components/shared/ToolTip";
type Props = {
  bill: Bill;
};
export default function Card({ bill }: Props) {
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  let ttMessage = !expand ? "Expand to See More" : "Collapse";
  return (
    <div className="flex flex-row w-full justify-between p-1">
      <div className="flex flex-col place-items-start">
        <div>{bill.source}</div>
        {/* <div>Due { format(new Date(bill.due_date), "MMMM, do") }</div> */}
      </div>
      <div className="font-['Eczar'] text-base flex flex-row items-center md:text-xl">
        {/* ${ numberWithCommas(bill.amount) } */}
        <ToolTip message="edit">
          <div
            className="items-center p-2"
            onClick={() => navigate(`bill/${bill.id}`)}
          >
            <span className="material-symbols-outlined ">edit</span>
          </div>
        </ToolTip>
      </div>

      <div
        className="text-center absolute bottom-0 left-1/2"
        onClick={() => setExpand(!expand)}
      >
        <ToolTip message={ttMessage}>
          {expand ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </ToolTip>
      </div>

      {expand === true ? (
        <>
          <div className="flex flex-col place-items-start">
            {" "}
            <div>{bill.paid}</div>
            <div>{bill.description}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
