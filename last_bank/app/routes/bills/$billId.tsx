import type { Bill } from '@prisma/client';
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData, useParams } from "@remix-run/react";
import invariant from "tiny-invariant";
import { requireUserId } from '~/utils/auth.server';
import { deleteBill, getBill, getOneBill, getUserBill } from '~/utils/bill.server';
import type { Bills } from '~/utils/types.server';



type LoaderData = {
    bill: Bill;
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request);

    invariant(params.id, "BillId not found");
    console.log(params.id);

    const bill = await getOneBill({ id: params.id });

    if (!bill) {
        throw new Response("Not Found", { status: 404 });
    }
    return json<LoaderData>({ bill });
};

export const action: ActionFunction = async ({ request, params }) => {
    const userId = await requireUserId(request);
    invariant(params.billId, "billId not found");

    await deleteBill({ userId, id: params.billId });

    return redirect("/bills");
};

export default function NoteDetailsPage () {
    const data = useLoaderData() as LoaderData;
    let { id } = useParams()
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

export function ErrorBoundary ({ error }: { error: Error }) {
    console.error(error);

    return <div>An unexpected error occurred: { error.message }</div>;
}

export function CatchBoundary () {
    const caught = useCatch();

    if (caught.status === 404) {
        return <div>Note not found</div>;
    }

    throw new Error(`Unexpected caught response with status: ${caught.status}`);
}