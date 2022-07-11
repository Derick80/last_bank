import type { Bill } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getUserId, requireUserId } from '~/utils/auth.server';
import { deleteBill, getOneBill } from '~/utils/bill.server';
import type { Bills } from '~/utils/types.server';



type LoaderData = {
    bill: Bill;
    isOwner: boolean
};

export const loader: LoaderFunction = async ({ request, params }) => {
    let userId = await getUserId(request)
    console.log(params.id);
    invariant(params.billId, "billId")
    let bill = userId ? await getOneBill({ id: params.billId, userId }) : null
    if (!bill) {
        throw new Response("Bill not found", { status: 404 })
    }
    let data: LoaderData = { bill, isOwner: userId === bill.userId }
    return json(data)
};

export const action: ActionFunction = async ({ request, params }) => {
    const userId = await requireUserId(request);

    await deleteBill({ userId, id: params.id });

    return redirect("/");
};

export default function NoteDetailsPage () {
    let data = useLoaderData<LoaderData>();
    console.log(data);
    return (
        <div>
            <h3 className="text-2xl font-bold">{ data.bill.source }</h3>
            <p className="py-6">{ data.bill.amount }</p>
            <hr className="my-4" />
            <Form method="post">
                <button
                    type="submit"
                    className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Delete
                </button>
            </Form>
        </div>
    );
}

