export enum AppRoute {
  Login = '/login',
  Main = '/',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum PageTitle {
  Login = '6 cities. Sign in',
  Main = '6 cities',
  Favorites = '6 cities. Saved listing',
  Offer = '6 cities. ',
  NotFound = '6 cities. Page not found',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price low to high',
  PriceHighToLow = 'Price high to low',
  TopRated = 'Top rated',
}

export const sortTypeLabels: Record<SortType, string> = {
  [SortType.Popular]: 'Popular',
  [SortType.PriceLowToHigh]: 'Price: low to high',
  [SortType.PriceHighToLow]: 'Price: high to low',
  [SortType.TopRated]: 'Top rated first'
};

export enum APIRoute {
  Offers = '/offers',
}
