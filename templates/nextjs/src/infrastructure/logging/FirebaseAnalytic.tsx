import firebase, { FirebaseOptions } from '@firebase/app';
import { logEvent } from 'firebase/analytics';

export interface EventLogInteraction {
  eventName: string;
  eventData: {
    [key: string]: any;
  };
}

export interface UpdateEventLogFirebase {
  execute: (
    logData: EventLogInteraction,
  ) => void;
}

export const FirebaseImpl = ({firebaseOptions}: {firebaseOptions: FirebaseOptions}): UpdateEventLogFirebase => {
  const app = firebase.initializeApp(firebaseOptions);
  return {
    execute: (logData) => logEvent({ app }, logData.eventName, logData.eventData),
  }
};
