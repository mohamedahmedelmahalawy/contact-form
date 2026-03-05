import ContactsList from "@/components/contact-list";
import ContactStats from "@/components/contact-stats";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactsPage() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link href="/">
            <Button
              variant={"outline"}
              size={"sm"}
              className="mb-4 bg-transparent"
            >
              Back to form
            </Button>
          </Link>
        </div>
        <ContactStats />
        <ContactsList />
      </div>
    </main>
  );
}
