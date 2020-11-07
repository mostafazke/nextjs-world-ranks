import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Country } from '../../interfaces/country.interface';
import CountriesTable from '../components/CountriesTable/CountriesTable';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import styles from '../styles/Home.module.css';

type Props = {
  countries: Country[];
};

export default function Home({ countries }: Props) {
  const [keyword, setKeyword] = useState<string>('');
  const filterdCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword) ||
      country.region.toLowerCase().includes(keyword) ||
      country.subregion.toLowerCase().includes(keyword)
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.input_container}>
        <div className={styles.count}>Found {countries.length} countries</div>
        <div className={styles.input}>
        <SearchInput
          placeholder='Search by Name, Region or Sub Region.'
          onChange={onInputChange}
        />
        </div>
      </div>
      <CountriesTable countries={filterdCountries} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.eu/rest/v2/all');
  const countries: Country[] = await res.json();
  return {
    props: {
      countries,
    },
  };
};
