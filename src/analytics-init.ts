import ReactGA from 'react-ga4';
import { clarity } from 'react-microsoft-clarity';

function initGoogleAnalytics() {
  const trackingId = process.env.REACT_APP_GOOGLE_TRACKING_ID;

  if (trackingId) {
    ReactGA.initialize(trackingId);
  }
}

function initClarity() {
  const clarityId = process.env.REACT_APP_CLARITY_ID;

  if (clarityId) {
    clarity.init(clarityId);
  }
}

export function analyticsInit() {
    initGoogleAnalytics();
    initClarity();
}
