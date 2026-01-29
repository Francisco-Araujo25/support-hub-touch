import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const INACTIVITY_TIMEOUT = 2 * 60 * 1000; // 2 minutes
const WARNING_THRESHOLD = 30 * 1000; // 30 seconds before timeout

export const useInactivityTimeout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showWarning, setShowWarning] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const resetTimer = useCallback(() => {
    setShowWarning(false);
    setCountdown(30);
  }, []);

  useEffect(() => {
    // Don't run timeout on home page
    if (location.pathname === '/') {
      setShowWarning(false);
      return;
    }

    let inactivityTimer: NodeJS.Timeout;
    let countdownInterval: NodeJS.Timeout;

    const startTimer = () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownInterval);
      setShowWarning(false);
      setCountdown(30);

      // Start warning at 1:30
      inactivityTimer = setTimeout(() => {
        setShowWarning(true);
        setCountdown(30);
        
        countdownInterval = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              navigate('/');
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }, INACTIVITY_TIMEOUT - WARNING_THRESHOLD);
    };

    const handleActivity = () => {
      startTimer();
    };

    // Start timer
    startTimer();

    // Listen for user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('touchstart', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(countdownInterval);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [location.pathname, navigate]);

  return { showWarning, countdown, resetTimer };
};
