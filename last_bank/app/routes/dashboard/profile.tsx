import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { Modal } from "~/components/modal";
import { getUser } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json({ user });
};
export default function Profile() {
  const { user } = useLoaderData();
  return (
    <Modal isOpen={true} className="w-1/3">
      <div className="p-3">
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">
          Your Profile
        </h2>
        <div>Welcome Back, {user.firstName}</div>
        <div>
          <h2>Registered Name</h2>
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <h2>Registered Email</h2>
          <h3>{user.email}</h3>{" "}
        </div>
      </div>
    </Modal>
  );
}
