import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { RootState } from '../../store';
import { PageTitle, SortType } from '../../const';
import OffersList from '../../components/offers-list/offers-list';
import CitiesList from '../../components/cities-list/cities-list';
import Map from '../../components/map/map';
import Sorting from '../../components/sorting/sorting';
import Header from '../../components/header/header';
import EmptyPlaces from '../../components/empty-places/empty-places';

function MainPage(): JSX.Element {
  const [sortType, setSortType] = useState<SortType>(SortType.Popular);
  const { city, offers } = useSelector((state: RootState) => state);
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  const filteredOffers = offers.filter((offer) => offer.city.name === city);

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    switch (sortType) {
      case SortType.PriceLowToHigh:
        return a.price - b.price;
      case SortType.PriceHighToLow:
        return b.price - a.price;
      case SortType.TopRated:
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const isEmpty = filteredOffers.length === 0;

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>{PageTitle.Main}</title>
      </Helmet>
      <Header />
      <main className={`page__main page__main--index ${isEmpty ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {isEmpty ? (
            <EmptyPlaces city={city} />
          ) : (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filteredOffers.length} place{filteredOffers.length !== 1 ? 's' : ''} to stay in {city}
                </b>
                <Sorting onChange={setSortType} />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList offers={sortedOffers} onHover={setActiveOfferId} />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={sortedOffers} activeOfferId={activeOfferId} />
                </section>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
