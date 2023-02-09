import React from 'react';
import { Link } from 'react-router-dom';
import { UserDTO } from '../dtos/UserDTO';
import styles from './ArticleOpenAI.module.css';
import { Avatar } from './Avatar';

interface ArticleTitleProps {
  title: string;
}

const ArticleTitle: React.FC<ArticleTitleProps> = ({ title }) => (
  <h2 className={styles.title}>{title}</h2>
);

interface AuthorProps {
  avatarUrl: string;
  name: string;
}

const Author: React.FC<UserDTO> = (user :UserDTO) => (
  <div className={styles.author}>
    <img src={user.avatar} alt={`${user.name}'s avatar`} className={styles.avatar} />
    <p>{user.name}</p>
  </div>
);

interface ArticleAbstractProps {
  abstract: string;
}

const ArticleAbstract: React.FC<ArticleAbstractProps> = ({ abstract }) => (
  <p className={styles.abstract}>{abstract}</p>
);

interface ArticleKeywordsProps {
  keywords: string[];
}

const ArticleKeywords: React.FC<ArticleKeywordsProps> = ({ keywords }) => (
  <ul className={styles.keywords}>
    {keywords.map((keyword, index) => (
      <li key={index} className={styles.keyword}>{keyword}</li>
    ))}
  </ul>
);

interface ArticlePreviewProps {
  title: string;
  abstract: string;
  keywords: string[];
  user: UserDTO;
  articleId: string;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ title, abstract, keywords, user, articleId }) => (
  <div  className={styles.previewdiv}>
    <div className={styles.preview}>
      <div className={styles.author}>
        <Avatar
          src={user.avatar}
          alt={`${user.name}'s avatar`}
        /> 
        <div>
          <ArticleTitle title={title} />
          <ArticleKeywords keywords={keywords} />
        </div>
      </div>
      <ArticleAbstract abstract={abstract} />
    </div>
  </div>
);
