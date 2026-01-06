// Save this file in: Client/src/pages/SignupPage.tsx

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../lib/apiClient'; // <-- Import our new API client!
import { useToast } from '../components/ui/use-toast'; // <-- For showing success/error messages

import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'; // <-- Import Select components

export default function SignupPage() {
  // --- State variables to hold the form data ---
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState(''); // <-- ADDED: State for gender
  const [error, setError] = useState(''); // To hold any error messages from the backend

  // --- Hooks for navigation and showing toasts ---
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- This function runs when the user clicks the "Create an account" button ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    setError(''); // Clear previous errors

    try {
      // Use our apiClient to send a POST request to the backend
      await apiClient.post('/auth/register', {
        username,
        email,
        password,
        gender, // <-- ADDED: Include gender in the request
      });

      // If the request is successful, show a success toast
      toast({
        title: 'Success!',
        description: 'Your account has been created. Please log in.',
      });

      // And navigate the user to the login page
      navigate('/login');

    } catch (err: any) {
      // If the backend returns an error (like "user already exists")
      console.error('Registration failed:', err);
      // Set the error message to display it on the form
      setError(err.response?.data || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* We bind the onSubmit event of the form to our handleSubmit function */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              {/* The onChange event updates our state variables as the user types */}
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* ADDED: Gender Select Dropdown */}
            <div className="grid gap-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={setGender} value={gender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select a gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>
                  <SelectItem value="FEMALE">Female</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                  <SelectItem value="PREFER_NOT_TO_SAY">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Display the error message if one exists */}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}