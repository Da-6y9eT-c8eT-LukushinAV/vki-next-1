'use client';

import { hydrate, QueryClientProvider, type DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HydrationBoundary } from '@tanstack/react-query';

import queryClient from '@/api/reactQueryClient';

interface Props {
  state: DehydratedState;
  children: React.ReactNode;
}

const TanStackQuery = ({ state, children }: Props): React.ReactElement => {
<<<<<<< HEAD
  hydrate(queryClient, state)
=======

  hydrate(queryClient, state)

>>>>>>> 53fad53d2a244e059e618f1814e3675be23e0926
  return (
  <QueryClientProvider client={queryClient}>
    {/* <HydrationBoundary
      state={state}
      queryClient={queryClient}
    > */}
      {children}
    {/* </HydrationBoundary> */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
}

export default TanStackQuery;
