import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/explore', // redirect to /explore
      permanent: false,
    },
  };
};

const Home = () => {
  return null;
};

export default Home;