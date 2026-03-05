import ContactForm from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 ">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Server Actions Demo</h1>
          <p className="text-xl text-gray-600 max-2xl mx-auto">
            Contact form with MongoDb and revalidation
          </p>
        </div>
        <ContactForm />
        <div className="w-full max-w-2xl mx-auto my-8">
          <Link href="/contacts">
            <Button
              variant={"outline"}
              size={"sm"}
              className="mb-4 bg-transparent w-full"
            >
              Go to List
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
