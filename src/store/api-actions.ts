import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { requireAuthorization } from './action';
import { AuthorizationStatus } from '../const';
import { saveToken, dropToken } from '../services/token';
import { OfferPreview, Offer } from '../types/offer';
import { AuthData, AuthResponse } from '../types/auth';
import { APIRoute } from '../const';

export const checkAuth = createAsyncThunk<
  AuthResponse,
  undefined,
  { extra: AxiosInstance }
>(
  'user/checkAuth',
  async (_, { extra: api }) => {
    const { data } = await api.get<AuthResponse>('/login');
    return data;
  }
);

export const login = createAsyncThunk<
  AuthResponse,
  AuthData,
  { extra: AxiosInstance }
>(
  'user/login',
  async ({ email, password }, { extra: api }) => {
    const { data } = await api.post<AuthResponse>('/login', {
      email,
      password
    });

    saveToken(data.token);

    return data;
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  { extra: AxiosInstance }
>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  }
);

export const fetchOffers = createAsyncThunk<
  OfferPreview[],
  undefined,
  { extra: AxiosInstance }
>('data/fetchOffers', async (_, { extra: api }) => {
  const { data } = await api.get<OfferPreview[]>(APIRoute.Offers);
  return data;
});

export const fetchOffer = createAsyncThunk<
  Offer,
  string,
  { extra: AxiosInstance }
>('data/fetchOffer', async (offerId, { extra: api }) => {
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
  return data;
});
