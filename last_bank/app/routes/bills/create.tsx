import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import React from 'react'
import ToggleButton from '~/components/ToggleButton';
import { getUserId, requireUserId } from '~/utils/auth.server';


export const loader: LoaderFunction = async ({ request }) => {
    const userId = await getUserId(request);
    if (!userId) {
        throw new Response("Unauthorized", { status: 401 });
    }
    return json({ userId });

}


export const action: ActionFunction = async ({ request }) => {

    const userId = await requireUserId(request);
    let formData = await request.formData()
    let source = formData.get('source')
    let description = formData.get('description')
    let amount = Number(formData.get('amount'))
    // @ts-ignore
    let due_date = new Date(formData.get("due_date"));
    let paid = formData.get('paid')
}

export default function Create () {


    return (
        <div>
            <p>Add  your extravagant spending here</p>
            <form method="post">
                <div>
                    <label>
                        Source: <input type="text" name="source" />
                    </label>
                </div>
                <div>
                    <label>
                        Description <input type="text" name="description" />
                    </label>
                </div>
                <div>
                    <label>
                        amount: <input type="number" name="amount" />
                    </label>
                </div>
                <div>
                    <label>
                        Due Date: <input type="date" name="due_date" />
                    </label>
                </div>
                <ToggleButton />
                <div>
                    <button type="submit" className="button">
                        Add
                    </button>
                </div>

            </form>
        </div>
    )
}
