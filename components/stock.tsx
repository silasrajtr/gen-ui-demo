
/*
type StockProps = {
  price: number;
  symbol: string;
};

export const Stock = ({ price, symbol }: StockProps) => {
  return (
    <div>
      <h2>Stock Information</h2>
      <p>Symbol: {symbol}</p>
      <p>Price: ${price}</p>
    </div>
  );
};
*/

type StockProps = {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
};

export const Stock = ({ symbol, price, change, changePercent }: StockProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <h2 className="text-xl font-semibold">{symbol} Stock Price</h2>
      <div className="mt-2 space-y-1">
        <p>Price: ${price.toFixed(2)}</p>
        <p className={isPositive ? 'text-green-600' : 'text-red-600'}>
          Change: {change.toFixed(2)} ({changePercent.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};