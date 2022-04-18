import HeadInfo from "../components/HeadInfo";
import Image from "next/image";
import photosStyles from "../styles/Photos.module.css";

const photos = ({ photos }) => {
  return (
    <div>
      <HeadInfo title="My Blog Pohtos" />
      <h1>My Photos</h1>
      <ul className={photosStyles.photos}>
        {photos.map((photo) => (
          <li key={photo.id}>
            <Image
              src={photo.thumbnailUrl}
              width={100}
              height={100}
              alt={photo.title}
            />
            <span>{photo.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// photo.thumbnailUrl은 외부 Url이 들어있는데 이를 사용하기위해서는 next.config.js에서 설정해야함

export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const photos = await res.json();

  return {
    props: {
      photos,
    },
  };
};

export default photos;
