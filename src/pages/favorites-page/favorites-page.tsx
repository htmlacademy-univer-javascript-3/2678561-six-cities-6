import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { PageTitle } from '../../const';
import Header from '../../components/header/header';
import OffersList from '../../components/offers-list/offers-list';
import { OfferPreview } from '../../types/offer';

type State = {
  city: string;
  offers: OfferPreview[];
};

function FavoritesPage(): JSX.Element {
  const offers = useSelector((state: State) => state.offers);
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);
  const isEmpty = favoriteOffers.length === 0;

  if (isEmpty) {
    return (
      <div className="page page--favorites-empty">
        <Helmet>
          <title>{PageTitle.Favorites}</title>
        </Helmet>
        <Header />
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer">
          <a className="footer__logo-link" href="main.html">
            <img
              className="footer__logo"
              src="img/logo.svg"
              alt="6 cities logo"
              width={64}
              height={33}
            />
          </a>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>{PageTitle.Favorites}</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <OffersList offers={favoriteOffers} />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </a>
      </footer>
    </div>
  );
}

export default FavoritesPage;
