import OfferItem from '../offer-item/offer-item';
import { OfferPreview } from '../../types/offer';

type OffersListProps = {
  offers: OfferPreview[];
  onHover?: (id: string | null) => void;
};

function OffersList({ offers, onHover }: OffersListProps): JSX.Element {
  return (
    <>
      {offers.map((offer) => (
        <OfferItem
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onHover?.(offer.id)}
          onMouseLeave={() => onHover?.(null)}
        />
      ))}
    </>
  );
}

export default OffersList;
