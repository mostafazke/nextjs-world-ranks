import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Link from 'next/link';
import { useState } from 'react';
import { Country } from '../../../interfaces/country.interface';
import styles from './CountriesTable.module.css';
import { sortMethod } from '../../utils/sortBy';
interface CountriesTableProps {
  countries: Country[];
}
const CountriesTable: React.FC<CountriesTableProps> = ({ countries }) => {
  const [sortBy, setsortBy] = useState<string>('name');
  const [order, setOrder] = useState<boolean>(true);
  const sortedCountries = sortMethod(countries, sortBy, order);

  const reSortCountries = (newSortBy: string) => {
    if (newSortBy === sortBy) {
      setOrder((oldValue) => !oldValue);
    } else {
      setsortBy(newSortBy);
      setOrder(true);
    }
  };

  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_flag}>
          <div></div>
        </button>
        <button
          className={styles.heading_name}
          onClick={() => reSortCountries('name')}
        >
          <div>Name</div>
          {sortBy === 'name' && <SortIcon order={order} />}
        </button>
        <button
          className={styles.heading_population}
          onClick={() => reSortCountries('population')}
        >
          <div>Population</div>
          {sortBy === 'population' && <SortIcon order={order} />}
        </button>
        <button
          className={styles.heading_area}
          onClick={() => reSortCountries('area')}
        >
          <div>
            Area (km <sup style={{ fontSize: '0.5rem' }}>2</sup>)
          </div>
          {sortBy === 'area' && <SortIcon order={order} />}
        </button>
        <button
          className={styles.heading_gini}
          onClick={() => reSortCountries('gini')}
        >
          <div>Gini</div>
          {sortBy === 'gini' && <SortIcon order={order} />}
        </button>
      </div>
      {sortedCountries.map((country) => (
        <Link href={`/country/${country.alpha3Code}`} key={country.alpha3Code}>
          <a>
            <div className={styles.row}>
              <div className={styles.flag}>
                <img src={country.flag} alt={country.name} />
              </div>
              <div className={styles.name}>{country.name}</div>
              <div className={styles.population}>{country.population}</div>
              <div className={styles.area}>{country.area || 0}</div>
              <div className={styles.gini}>{country.gini || 0} %</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

const SortIcon = ({ order }) => {
  return <div>{order ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}</div>;
};
export default CountriesTable;
