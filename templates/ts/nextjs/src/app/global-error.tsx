'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import { useEffect } from 'react';

export default function GlobalError(props: {
  error: Error & { digest?: string; };
  params: { locale: string; };
}) {
  useEffect(() => {
    console.log('Error captured:', props.error);
    Sentry.captureException(props.error);
  }, [props.error]);

  return (
    <html lang={props.params.locale}>
      <body>
        {/* use props.error */}
        <Error statusCode={undefined as any} />
      </body>
    </html>
  );
}
