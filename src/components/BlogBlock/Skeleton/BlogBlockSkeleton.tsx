import ContentLoader from 'react-content-loader';
import styles from './BlogBlockSkeleton.module.scss';

const BlogBlockSkeleton = () => (
  <ContentLoader
    className={styles.skeleton}
    speed={2}
    width={330}
    height={540}
    viewBox="0 0 330 540"
    backgroundColor="#d3d3d3"
    foregroundColor="#ecebeb">
    <rect x="188" y="338" rx="0" ry="0" width="1" height="0" />
    <rect x="1" y="35" rx="25" ry="25" width="330" height="181" />
    <rect x="7" y="339" rx="10" ry="10" width="330" height="50" />
    <rect x="3" y="399" rx="25" ry="25" width="330" height="75" />
    <rect x="12" y="488" rx="20" ry="20" width="140" height="41" />
    <rect x="8" y="229" rx="10" ry="10" width="120" height="40" />
    <rect x="7" y="285" rx="10" ry="10" width="120" height="40" />
  </ContentLoader>
);

export default BlogBlockSkeleton;
