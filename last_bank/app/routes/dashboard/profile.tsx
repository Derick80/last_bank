import type { LoaderFunction, ActionFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"
import React, { useEffect, useRef, useState } from "react"
import { ImageUploader } from "~/components/image-uploader"
import { Modal } from "~/components/shared/modal"
import { SelectBox } from "~/components/shared/select-box"
import FormField from "~/components/shared/form-field"
import { getUser, logout, requireUserId } from "~/utils/auth.server"
import { pronouns } from "~/utils/constants"
import type { Pronouns } from "@prisma/client"

import { deleteUser, updateUser } from "~/utils/users.server"
import { validateName } from "~/utils/validators.server"
import { format } from "date-fns"

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const form = await request.formData()
  let firstName = form.get('firstName')
  let lastName = form.get('lastName')
  // @ts-ignore

  let birthDay = new Date(form.get("birthDay"))
  let currentLocation = form.get("currentLocation")
  let occupation = form.get("occupation")
  let pronouns = form.get("pronouns")

  const action = form.get("_action")
  switch (action) {
    case "save":
      if (
        typeof firstName !== "string" ||
        typeof lastName !== "string" ||
        typeof currentLocation !== "string" ||
        typeof occupation !== "string" ||
        typeof pronouns !== "string"
      ) {
        return json({ error: `Invalid Form Data` }, { status: 400 })
      }

      const errors = {
        firstName: validateName(firstName),
        lastName: validateName(lastName),
        currentLocation: validateName(currentLocation),
        occupation: validateName(occupation),
        pronouns: validateName(pronouns),
      }

      if (Object.values(errors).some(Boolean))
        return json(
          {
            errors,
            fields: {
              firstName,
              lastName,
              occupation,
              currentLocation,
              pronouns,
            },
          },
          { status: 400 }
        )

      await updateUser(userId, {
        firstName,
        lastName,
        birthDay,
        currentLocation,
        occupation,
        pronouns: pronouns as Pronouns,
      }
      )
      return redirect("/")
    case "delete":
      await deleteUser(userId)
      return logout(request)
    default:
      return json({ error: `Invalid Form Data` }, { status: 400 })
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)
  return json({ user })
}

export default function ProfileSettings () {
  const { user } = useLoaderData()
  const actionData = useActionData()

  const [formError, setFormError] = useState(actionData?.error || "")

  const firstLoad = useRef(true)

  const [formData, setFormData] = useState({
    firstName: actionData?.fields?.firstName || user?.profile?.firstName,
    lastName: actionData?.fields?.lastName || user?.profile?.lastName,
    birthDay: actionData?.fields?.birthDay || user?.profile?.birthDay,
    currentLocation:
      actionData?.fields?.currentLocation || user?.profile?.currentLocation,
    pronouns: actionData?.fields?.pronouns || (user?.profile?.pronouns || "THEY"),
    occupation: actionData?.fields?.occupation || user?.profile?.occupation,
    profilePicture: user?.profile?.profilePicture || '',
  })

  useEffect(() => {
    if (!firstLoad.current) {
      setFormError("")
    }
  }, [formData])

  useEffect(() => {
    firstLoad.current = false
  }, [])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({ ...form, [field]: event.target.value }))
  }

  const handleFileUpload = async (file: File) => {
    let inputFormData = new FormData()
    inputFormData.append("profile-pic", file)
    const response = await fetch("/avatar", {
      method: "POST",
      body: inputFormData,
    })
    const { imageUrl } = await response.json()

    setFormData({
      ...formData,
      profilePicture: imageUrl,
    })
  }

  return (
    <Modal isOpen={ true } className="w-1/3">
      <div className="p-3">
        <h2 className="text-4xl font-semibold text-blue-600 text-center mb-4">
          Your Profile
        </h2>
        <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full mb-2">
          { formError }
        </div>
        <div className="flex">
          <div className="w-1/3">
            <ImageUploader
              onChange={ handleFileUpload }
              imageUrl={ formData.profilePicture || '' }
            />
          </div>
          <div className="flex-1">
            <form
              method="post"
              onSubmit={ (e) =>
                !confirm("Are you sure?") ? e.preventDefault() : true
              }
            >
              <FormField
                className="border"
                htmlFor="firstName"
                label="FirstName"
                labelClass="text-2xl font-semibold my-2 px-2"
                value={ formData.firstName }
                onChange={ (event) => handleInputChange(event, "firstName") }
                error={ actionData?.errors?.firstName }
              />
              <FormField
                className="border"
                htmlFor="lastName"
                label="LastName"
                labelClass="text-2xl font-semibold my-2 px-2"
                value={ formData.lastName }
                onChange={ (event) => handleInputChange(event, "lastName") }
                error={ actionData?.errors?.lastName }
              />

              <FormField
                htmlFor="birthDay"
                label="Birthday"
                value={ format(new Date(formData.birthDay), "yyyy-MM-dd") }
                onChange={ (e: any) => handleInputChange(e, "birthDay") }
                error={ actionData?.errors?.birthDay }
              />
              <FormField
                htmlFor="currentLocation"
                label="Current Location"
                value={ formData.currentLocation }
                onChange={ (e) => handleInputChange(e, "currentLocation") }
                error={ actionData?.errors?.currentLocation }
              />
              <SelectBox
                className="w-full rounded-xl px-3 py-2 text-gray-400"
                id="pronouns"
                label="Pronouns"
                name="pronouns"
                options={ pronouns }
                value={ formData.pronouns }
                onChange={ (e) => handleInputChange(e, "pronouns") }
              />
              <FormField
                htmlFor="occupation"
                label="Occupation"
                value={ formData.occupation }
                onChange={ (e) => handleInputChange(e, "occupation") }
                error={ actionData?.errors?.occupation }
              />
              <button
                name="_action"
                value="delete"
                className="rounded-xl w-full bg-red-300 font-semibold text-white mt-4 px-16 py-2 transition duration-300 ease-in-out hover:bg-red-400 hover:-translate-y-1"
              >
                Delete Account
              </button>
              <div className="w-full text-right mt-4">
                <button
                  name="_action"
                  value="save"
                  className="rounded-xl bg-yellow-300 font-semibold text-blue-600 px-16 py-2 transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  )
}
