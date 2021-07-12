import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { RiCalendarLine, RiClockwiseLine, RiUserLine } from 'react-icons/ri';
import Image from 'next/image';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../utils/date-format';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.banner}>
          <img src="/banner.png" alt="Banner" />
        </div>
        <div className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.infos}>
            <div className={styles.info}>
              <RiCalendarLine size={20} />
              <span>{formatDate(post.first_publication_date)}</span>
            </div>
            <div>
              <RiUserLine size={20} />
              <span>{post.data.author}</span>
            </div>
            <div>
              <RiClockwiseLine size={20} />
              <span>4 min</span>
            </div>
          </div>
          <div>{post.data.content.map(item => RichText.asHtml(item))}</div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { pageSize: 1 }
  );
  const paths = postsResponse.results.map(item => ({
    params: { slug: item.uid },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  console.log(response);
  return {
    props: {
      post: response,
    },
  };
};

export default Post;
