"use server";

import CardsList from "./operator-cards";

const CardsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Operators</h1>
      <CardsList />
    </div>
  );
}

export default CardsPage;