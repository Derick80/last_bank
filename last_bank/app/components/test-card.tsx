import type { Bill, Income } from "@prisma/client";
import { useNavigate } from "@remix-run/react";
import { format } from "date-fns";
import { useState } from "react";
import { numberWithCommas } from "~/utils/format";
import dateFormat, { masks } from "dateformat";

import Icon from "./shared/Icon";

import Tooltip from "./ToolTip";

type ICard =
  | {
      data: Bill;
      isBill: true;
    }
  | {
      data: Income;
      isBill: false;
    };

export default function GlobalCard({ data, isBill }: ICard) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  let ttMessage = !expand ? "Expand to See More" : "Collapse";
  const myRoute = isBill ? "bill" : "income";

  return (
    <div className="flex flex-row w-full justify-between p-3">
      <div className="flex flex-col place-items-start">
        <div>{data.source}</div>
        {isBill === true ? (
          <>
            <div> {dateFormat(data.due_date, "mmm d")}</div>
          </>
        ) : (
          <>
            <div>{dateFormat(data.payment_date, "MMM d")}</div>
            <div>Acount Ending... {data.accountNumber}</div>
          </>
        )}
      </div>
      <div className="font-['Eczar'] text-base flex flex-row items-center md:text-xl">
        ${numberWithCommas(data.amount)}
        <Tooltip message="Edit">
          <div
            className="items-center p-2"
            onClick={() => navigate(`${myRoute}/${data.id}`)}
          >
            <span className="material-symbols-outlined">edit</span>
          </div>
        </Tooltip>
      </div>
      <div
        className="text-center absolute bottom-0 left-1/2"
        onClick={() => setExpand(!expand)}
      >
        <Tooltip message={ttMessage}>
          {expand ? <Icon icon="expand_less" /> : <Icon icon="expand_more" />}
        </Tooltip>
      </div>
      {expand === true ? (
        <>
          {isBill === true ? (
            <div className="flex flex-col place-items-start">
              <div>{data.paid}</div>
              <div>{data.description}</div>
            </div>
          ) : (
            <div className="flex flex-col place-items-start">
              <div>{data.received}</div>
              <div>{data.description}</div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}

// isBill ? <Card bill={ item } /> :
//   <CardIncome income={ item } />
