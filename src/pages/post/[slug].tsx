import { GetStaticPaths, GetStaticProps } from 'next';

import { RiCalendarLine, RiTimeLine, RiUserLine } from 'react-icons/ri';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import { getPrismicClient } from '../../services/prismic';
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
  const router = useRouter();

  post.data.content.forEach(item => {
    const heading = item.heading.split(' ').length;
    const body = RichText.asHtml(item.body)
      .replace(/(<([^\s>]+)>)/gi, ' ')
      .trim()
      .split(/\s+/).length;
    console.log(`Size body ${body}`);
  });
  if (router.isFallback) {
    return <div>Carregando...</div>;
  }
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
              <RiTimeLine size={20} />
              <span>
                {`${Math.ceil(
                  post.data.content.reduce((total, item) => {
                    const heading = item.heading.split(' ').length;
                    const body = RichText.asHtml(item.body).split(' ').length;
                    return total + heading + body;
                  }, 0) / 200
                )} min`}
              </span>
            </div>
          </div>
          <div className={styles.dataContent}>
            {post.data.content.map(item => (
              <div key={item.heading}>
                <h2>{item.heading}</h2>
                <div
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: RichText.asHtml(item.body),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.predicates.at('document.type', 'posts')],
    { pageSize: 10 }
  );
  const paths = postsResponse.results.map(item => ({
    params: { slug: item.uid },
  }));
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: response,
    },
  };
};

export default Post;
