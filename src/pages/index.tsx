import { GetStaticProps } from 'next';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';
import { getPrismicClient } from '../services/prismic';
import Header from '../components/Header';
import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.postContainer}>
        <div className={styles.post}>
          <h2>Como utilizar hoocks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <RiCalendarLine size={20} />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <RiUserLine size={20} />
              <span>Felipe Souza Santana</span>
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <h2>Como utilizar hoocks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <RiCalendarLine size={20} />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <RiUserLine size={20} />
              <span>Felipe Souza Santana</span>
            </div>
          </div>
        </div>
        <div className={styles.post}>
          <h2>Como utilizar hoocks</h2>
          <p>Pensando em sincronização em vez de ciclos de vida.</p>
          <div className={styles.infoContainer}>
            <div className={styles.info}>
              <RiCalendarLine size={20} />
              <span>15 Mar 2021</span>
            </div>
            <div>
              <RiUserLine size={20} />
              <span>Felipe Souza Santana</span>
            </div>
          </div>
        </div>

        <button type="button">Carregar mais posts</button>
      </div>
    </>
  );
};

/* export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query('');
  return {
    props: {},
  };
}; */

export default Home;
