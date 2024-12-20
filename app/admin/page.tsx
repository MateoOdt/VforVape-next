import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectionForm } from "@/components/admin/connection-form";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-muted/50 p-4">
      <div className="max-w-7xl mx-auto">
        <Link href="/" className="inline-block mb-8">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
              Retourner à l'accueil
          </Button>
        </Link>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <ConnectionForm />
          </div>
        </div>
      </div>
    </div>
  );
}