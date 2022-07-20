import { useNavigate } from "@remix-run/react";
import { format, formatISO } from "date-fns";
import { useState } from "react";
import { numberWithCommas } from "~/utils/format";
import { Bill, Income } from "@prisma/client";
import CardContainer from "../app/components/CardContainer";

type Props =
  | {
      datum: Bill[];
      isBill: true;
    }
  | {
      datum: Income[];
      isBill: false;
    };
export default function CardBody({ datum }: Props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dataForDisplay = show ? datum : datum.slice(0, 4);

  return (
    <>
      {/* <GlobalCard data={ item } isBill={ true } />
          <GlobalCard data={ item } isBill={ false } /> */}
    </>
  );
}
