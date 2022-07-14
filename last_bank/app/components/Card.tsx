import { useNavigate } from "@remix-run/react";
import { format } from "date-fns";
import React from "react";
import { numberWithCommas } from "~/utils/format";
import { Bills } from "~/utils/types.server";
import ToolTip from "./ToolTip";
type Props = {
  bill: Bills;
};
export default function Card({ bill }: Props) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-row w-full justify-between p-1">
      <div className="flex flex-col place-items-start">
        {" "}
        <div className="uppercase text-base md:text-xl">{bill.source}</div>
        <div>Due {format(new Date(bill.due_date), "MMMM, do")}</div>
      </div>
      <div className="font-['Eczar'] text-base flex flex-row items-center md:text-xl">
        ${numberWithCommas(bill.amount)}
        <ToolTip message="edit">
          <div
            className="items-center p-2"
            onClick={() => navigate(`bill/${bill.id}`)}
          >
            <span className="material-symbols-outlined ">edit</span>
          </div>
        </ToolTip>
      </div>
    </div>
  );
}
