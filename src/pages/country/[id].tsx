import { styled } from '@material-ui/core';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Country as ICountry } from '../../../interfaces/country.interface';
import Layout from '../../components/Layout/Layout';
import styles from './country.module.css';

const getCountry = async (code: string): Promise<ICountry> => {
  const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${code}`);
  return res.json();
};

interface CountryProps {
  country: ICountry;
}

const Country: React.FC<CountryProps> = ({ country }) => {
  const [neighbors, setneighbors] = useState<ICountry[]>([]);

  const getneighbors = async () => {
    const neighbors = await Promise.all(
      country.borders.map((border) => getCountry(border))
    );
    setneighbors(neighbors);
  };

  useEffect(() => {
    getneighbors();
  }, [country]);
  return (
    <Layout title={`${country.name} |  World Rank`}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.alpha2Code} />
            <h1>{country.name}</h1>
            <p className={styles.overview_region}>{country.region}</p>

            <div className={styles.overview_records}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>{country.area}</div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Sub Region</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(', ')}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(', ')}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel_borders_label}>
                Neighbors
              </div>
              <div className={styles.details_panel_borders_container}>
                {neighbors.map(({ flag, name, alpha3Code }) => (
                  <Link href={`/country/${alpha3Code}`} key={alpha3Code}>
                    <a>
                      <div className={styles.details_panel_border}>
                        <img src={flag} alt={name} />
                        <div className={styles.details_panel_border_name}>
                          {name}
                        </div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const country = await getCountry(params.id as string);
  return {
    props: {
      country,
    },
  };
};

export default Country;
