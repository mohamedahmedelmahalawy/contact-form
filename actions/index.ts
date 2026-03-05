"use server";

import dbConnect from "@/lib/db";
import Contact, { ContactType } from "@/models/Contact";
import { revalidatePath, unstable_cache } from "next/cache";

export async function createContact(formData: FormData) {
  try {
    await dbConnect();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });
    revalidatePath("/contacts");
    return {
      success: true,
      message: "Message sent successfully",
      contactId: contact._id.toString(),
    };
  } catch (error) {
    console.error("Error creating contact", error);

    return {
      success: false,
      error: "Something went wrong, please try again.",
    };
  }
}

export async function getContacts() {
  try {
    await dbConnect();
    const contacts = await Contact.find({}).sort({ createdAt: -1 }).lean();

    return contacts.map((contact: ContactType) => ({
      ...contact,
      _id: contact._id.toString(),
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
    }));
  } catch (error) {
    console.error("Error fetching ContactsList", error);
    return [];
  }
}

export async function updateContacts(contactId: string, status: string) {
  try {
    await dbConnect();
    await Contact.findByIdAndUpdate(contactId, { status });
    console.log(status);
    revalidatePath("/contacts");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact", error);
    return { success: false, error: "Failed to update Status" };
  }
}

export async function getContactStats() {
  const getCachedStats = unstable_cache(
    async () => {
      await dbConnect();

      const total = await Contact.countDocuments();
      const newCount = await Contact.countDocuments({ status: "new" });
      const readCount = await Contact.countDocuments({ status: "read" });
      const repliedCount = await Contact.countDocuments({ status: "replied" });
      return { total, newCount, readCount, repliedCount };
    },
    ["contact-stats"],
    { tags: ["contact-stats"] },
  );
  return getCachedStats();
}
