import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Competition } from '@wca/helpers';
import { RootState } from '../';

interface SimpleCompetition {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  competitior_limit: number;
  cancelled_at: string | null;
  event_ids: string[];
  country_iso2: string;
}

interface MeResponse {
  me: {
    country_iso2: string;
    email: string;
    id: number;
    name: string;
    wca_id: string;
  };
}

const WCA_URL = 'https://staging.worldcubeassociation.org/';

const baseQuery = fetchBaseQuery({
  baseUrl: WCA_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (build) => ({
    getMe: build.query<MeResponse, void>({
      query: () => 'api/v0/me',
    }),
    getWcif: build.query<Competition, void>({
      query: (competitionId) => `api/v0/competitions/${competitionId}/wcif`,
    }),
    getCompetitions: build.query<SimpleCompetition[], void>({
      query: () => {
        const params = new URLSearchParams({ managed_by_me: 'true' });

        return `/competitions?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMeQuery, useGetWcifQuery, useGetCompetitionsQuery } = api;
