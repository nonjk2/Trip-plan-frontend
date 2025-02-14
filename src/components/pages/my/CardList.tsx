import PlannerCard from '@/components/ui/card/PlannerCard';
import StorageCard from '@/components/ui/card/StorageCard';
import { TMypageCardList } from '@/types/card';

interface CardListProps {
  listItems: TMypageCardList[];
  storage?: boolean;
}

const CardList = ({ listItems, storage }: CardListProps) => {
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-y-[2.4rem]">
      {listItems.map((item) => {
        return (
          <div key={item.planId} className="flex justify-center">
            {!storage ? (
              <PlannerCard cardType="mypage" cardInfo={item} />
            ) : (
              <StorageCard cardType="mypage" cardInfo={item} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default CardList;
