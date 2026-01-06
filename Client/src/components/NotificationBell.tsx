import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';

export function NotificationBell() {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = () => {
    if (!('Notification' in window)) {
      toast.error('This browser does not support desktop notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      toast.success('You are already subscribed to notifications!');
      // Optional: Show a test notification
      new Notification('EcoShield', {
        body: 'You are all set to receive updates!',
        icon: '/icons/icon-192x192.svg',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((perm) => {
        setPermission(perm);
        if (perm === 'granted') {
          toast.success('Thanks for subscribing to notifications!');
        } else {
          toast.info('You have blocked notifications.');
        }
      });
    } else {
      toast.warning(
        'Notifications are blocked. Please enable them in your browser settings.'
      );
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={requestPermission}
      className="rounded-full"
      aria-label="Toggle notifications"
    >
      <Bell className={`h-5 w-5 ${permission === 'granted' ? 'text-ecoshield-sky-blue' : ''}`} />
    </Button>
  );
}