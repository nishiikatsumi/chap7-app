import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDateString } from '../../utils/getDateString.js';

import classes from './Article.module.css';
import DOMPurify from 'dompurify';
import type { Post } from '../../types/Post';

export default function Article() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // APIでpostを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const res = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await res.json();
      setPost(data.post);
      setIsLoading(false);
    }

    fetcher();
  }, [id])

  if (isLoading) {
    return <div>読み込み中...</div>;
  }

  if (post == undefined) {
    return <div>記事が見つかりませんでした</div>;
  }

  return (
    <div>
      <main className={classes.main}>
        <article key={post.id} className={classes.card}>
          <div>
            <img src={post.thumbnailUrl} />
          </div>
          <div className={classes.header}>
            <span className={classes.date}>{getDateString(post.createdAt)}</span>
            <div className={classes.tags}>
              {post.categories && post.categories.map((tag) => (
                <span key={tag} className={classes.tag}>{tag}</span>
              ))}
            </div>
          </div>
          <h2 className={classes.title}>{post.title}</h2>
          <p
            className={classes.content}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
        </article>
      </main>
    </div>
  );
}



