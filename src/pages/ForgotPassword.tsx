import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: resetError } = await resetPassword(email);
    
    if (resetError) {
      setError(resetError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-32 px-4 bg-muted">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-large p-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Reset Password
              </h1>
              <p className="text-muted-foreground">
                {sent 
                  ? "Check your email for the reset link" 
                  : "Enter your email to receive a reset link"
                }
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            {sent ? (
              <div className="text-center">
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600">
                  Password reset email sent! Check your inbox.
                </div>
                <Link to="/login">
                  <Button className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-smooth">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 rounded-lg border-border focus:border-primary"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium transition-smooth"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </Button>

                <p className="text-center text-muted-foreground">
                  Remember your password?{" "}
                  <Link 
                    to="/login" 
                    className="text-primary hover:text-primary/80 font-medium transition-smooth"
                  >
                    Sign In
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
