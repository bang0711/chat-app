import AuthForm from "@/components/auth";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { TOOLS_INTRODUCTION } from "@/lib/constants";

import { getSession } from "@/lib/session";

import { Hero } from "@/modules/home";

async function Homepage() {
  const session = await getSession();
  if (!session) {
    return (
      <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <AuthForm />
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6 p-3">
      <Hero />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TOOLS_INTRODUCTION.map((tool, i) => (
          <Card
            key={i}
            className="hover:shadow-muted cursor-pointer transition-all duration-300 hover:shadow-md"
          >
            <CardHeader className="flex items-center gap-2 font-bold">
              <tool.icon className="size-6" />
              {tool.title}
            </CardHeader>
            <CardDescription className="px-6">
              {tool.description}
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
