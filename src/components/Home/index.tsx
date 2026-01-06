import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getDateString } from '../../utils/getDateString.js';

import classes from './Home.module.css';
import DOMPurify from 'dompurify';
import type { Post } from '../../types/Post';

export default function Home() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const res = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
      const data = await res.json();
      setPosts(data.posts);
      setIsLoading(false);
    }

    fetcher()
  }, []);

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (posts.length === 0) {
    return <div>記事がまだありません</div>;
  }

  return (
    <div>
      <main className={classes.main}>
        {posts.map(article => (
          <Link
            key={article.id}
            to={`/articles/${article.id}`}
            className={classes.cardLink}
          >
            <article className={classes.card}>
              <div className={classes.header}>
                <span className={classes.date}>{getDateString(article.createdAt)}</span>
                <div className={classes.tags}>
                  {article.categories && article.categories.map((tag) => (
                    <span key={tag} className={classes.tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <h2 className={classes.title}>{article.title}</h2>
              <p
                className={classes.excerpt}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}
              />
            </article>
          </Link>
        ))};
      </main>
    </div>
  );
}




