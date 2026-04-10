import { createReducer } from '@reduxjs/toolkit';
import { setCity } from './action';
import { OfferPreview, Offer } from '../types/offer';
import { fetchOffers } from './api-actions';
import { fetchOffer } from './api-actions';
import { AuthorizationStatus } from '../const';
import { requireAuthorization } from './action';
import { login, logout, checkAuth } from './api-actions';

export type State = {
  city: string;
  offers: OfferPreview[];
  currentOffer: Offer | null;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export const initialState: State = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  isOffersLoading: true,
  isOfferLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fetchOffers.pending, (state) => {
      state.isOffersLoading = true;
    })
    .addCase(fetchOffers.fulfilled, (state, action) => {
      state.offers = action.payload;
      state.isOffersLoading = false;
    })
    .addCase(fetchOffers.rejected, (state) => {
      state.isOffersLoading = false;
    })
    .addCase(fetchOffer.pending, (state) => {
      state.isOfferLoading = true;
      state.currentOffer = null;
    })
    .addCase(fetchOffer.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.isOfferLoading = false;
    })
    .addCase(fetchOffer.rejected, (state) => {
      state.isOfferLoading = false;
      state.currentOffer = null;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = action.payload.email;
    })
    .addCase(logout.fulfilled, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.userEmail = null;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.authorizationStatus = AuthorizationStatus.Auth;
      state.userEmail = action.payload.email;
    })
    .addCase(checkAuth.rejected, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
