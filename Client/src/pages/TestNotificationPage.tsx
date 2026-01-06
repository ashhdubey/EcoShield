// Path: Client/src/pages/TestNotificationPage.tsx

import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TestNotificationPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // --- SENIOR FIX: Helper to format phone numbers automatically ---
  const formatPhoneNumber = (input: string) => {
    // 1. Remove all non-numeric characters except the '+' sign
    let cleaned = input.replace(/[^\d+]/g, '');

    // 2. If it's a 10-digit number without a country code, prepend +91
    if (cleaned.length === 10 && !cleaned.startsWith('+')) {
      return `+91${cleaned}`;
    }

    // 3. If they wrote '91' but forgot the '+', add it
    if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned}`;
    }

    // 4. If it doesn't start with +, add it (default safety)
    if (cleaned.length > 0 && !cleaned.startsWith('+')) {
      return `+${cleaned}`;
    }

    return cleaned;
  };

  const handleSendTest = async () => {
    if (!phoneNumber || !city) {
      toast.warning('Please enter both a phone number and a city.');
      return;
    }

    setLoading(true);
    setResponseMessage(null);

    // Apply the formatting before sending to API
    const formattedNumber = formatPhoneNumber(phoneNumber);

    try {
      const response = await apiClient.post('/notifications/send-test', {
        phoneNumber: formattedNumber,
        city: city,
      });

      setResponseMessage({ type: 'success', message: response.data });
      toast.success('Alert sent! Note: The recipient must have joined your Twilio Sandbox.');
    } catch (err: any) {
      const errorMessage = err.response?.data || 'An unknown error occurred.';
      setResponseMessage({ type: 'error', message: errorMessage });
      toast.error('Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-12 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send />
            Send Test WhatsApp Alert
          </CardTitle>
          <CardDescription>
            Enter a city and phone number. We'll automatically add the country code if you forget it!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Recipient's Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="e.g., 9876543210"
            />
            <p className="text-xs text-muted-foreground">
              Tip: You can just enter the 10-digit mobile number.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City Name</Label>
            <Input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., Mumbai"
            />
          </div>
          <Button onClick={handleSendTest} disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Test Message'}
          </Button>

          {responseMessage && (
            <Alert variant={responseMessage.type === 'error' ? 'destructive' : 'default'} className="mt-4">
              {responseMessage.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              <AlertTitle>{responseMessage.type === 'success' ? 'Status' : 'Error'}</AlertTitle>
              <AlertDescription className="whitespace-pre-line">
                {responseMessage.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}