import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Alert, AlertDescription } from '../components/ui/alert';
import { LogIn, AlertCircle } from 'lucide-react';
import DiaryEntryForm from '../components/DiaryEntryForm';
import DiaryEntryList from '../components/DiaryEntryList';

export default function DiaryPage() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  if (!isAuthenticated) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-foreground mb-3">
            Mindfulness Diary
          </h1>
          <p className="text-lg text-muted-foreground">
            Track your emotional journey
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please login to access your personal diary. Your entries are private and securely stored.
              </AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <Button 
                onClick={login} 
                disabled={isLoggingIn}
                size="lg"
                className="gap-2"
              >
                <LogIn className="w-5 h-5" />
                {isLoggingIn ? 'Connecting...' : 'Login with Internet Identity'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-display font-bold text-foreground mb-3">
          Mindfulness Diary
        </h1>
        <p className="text-lg text-muted-foreground">
          Record your thoughts and track your emotional journey
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>New Entry</CardTitle>
              <CardDescription>
                How are you feeling today?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiaryEntryForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Your Entries</CardTitle>
              <CardDescription>
                Your personal reflection history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DiaryEntryList />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
