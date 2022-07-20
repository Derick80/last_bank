import type { Bill, Income } from "@prisma/client";
import { Link, Outlet, useNavigate } from "@remix-run/react";
import { vi } from "date-fns/locale";
import React, { useState } from "react";
import { numberWithCommas } from "~/utils/format";
import { sumTotals } from "~/utils/functions.server";
import CardBody from "../../archive/bills-card";
import BillsCard from "../../archive/bills-card";
import Card from "../../archive/Card";
import IncomesCard from "./incomes-card";
import GlobalCard from "../../archive/test-card";

type ICardHeader = {
  bill?: Bill[];
  income?: Income[];
  isBill: boolean;
  monthlyTotals: number;
};
export default function CardContainer({
  bill,
  income,
  isBill,
  monthlyTotals,
}: ICardHeader) {
  const navigate = useNavigate();

  const newRouteLink = isBill ? "bill" : "income";
  const viewAllLink = isBill ? "bills" : "incomes";
  const totalMonthly = monthlyTotals;

  return (
    <>
      <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-3 md:col-end-7 md:row-auto">
        <div>
          {bill && (
            <IncomesCard
              userData={bill}
              isBill={true}
              totalMonthly={totalMonthly}
            />
          )}
        </div>
      </div>
      <div className="h-full w-full row-span-1 row-start-1 col-span-1 md:col-start-8 md:col-end-12">
        {/* this is correct */}

        {income && (
          <IncomesCard
            userData={income}
            isBill={false}
            totalMonthly={totalMonthly}
          />
        )}
      </div>
    </>
  );
}
