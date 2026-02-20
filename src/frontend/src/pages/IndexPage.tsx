import { Sparkles, Rocket, Code } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function IndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          Welcome to Your Starter App
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your application template is ready. Start building amazing features on the Internet Computer.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Ready to Deploy</CardTitle>
            <CardDescription>
              Built on the Internet Computer with React, TypeScript, and Tailwind CSS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Your frontend and backend are connected and ready. Start adding your features and deploy to production.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Code className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Modern Stack</CardTitle>
            <CardDescription>
              Powered by React Query, shadcn/ui, and Internet Identity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Authentication, state management, and beautiful UI components are already configured for you.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Getting Started Section */}
      <div className="bg-muted/50 rounded-lg p-8 text-center space-y-4">
        <h2 className="text-2xl font-semibold text-foreground">
          Ready to Get Started?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          This is your blank canvas. Customize this page, add new routes, connect to your backend, and build something amazing.
        </p>
      </div>
    </div>
  );
}
