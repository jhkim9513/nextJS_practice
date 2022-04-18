import HeadInfo from "../components/HeadInfo";

export default function Home({ posts }) {
  return (
    <div>
      <HeadInfo />
      <h1>Welcome to My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
/* // ( SSR )
// 해당 페이지에 들어올 때 마다 서버에 요청하여 데이터를 받아옴
// 서버에서 만든 html파일을 그 때 그 때 보여주는것
// 서버에서 데이터 변경이 있을 때 바로 적용됨
export const getServerSideProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
    // `http://localhost:8080/api/posts`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};
 */

// ( SSG )
// build할 때 fetch등 미리 데이터를 받아와서 적용하기 때문에 서버에서 값이 변경되어도 바로 적용되지 않음
// 그 때 그 때 조회하는것이 아닌 이미 조회했던 것을 보여주는 방식
// 위 문제는 revalidate 옵션을 사용하여 해결
// revalidate에 설정된 시간(초)이 지난 시점부터 접속이 일어나면 파일을 새롭게 생성하는 명령 옵션
// SSG는 첫 렌더시 이미 요청에의한 값을 들고있기 때문에 빠른 렌더가 가능하고 revalidate에 의해서 변경된 값에 반응도 할 수 있다.
export const getStaticProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
    // `http://localhost:8080/api/posts`
  );
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 20,
  };
};
