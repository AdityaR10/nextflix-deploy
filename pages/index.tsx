import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/navbar";
import InfoModal from "@/components/InfoModal";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
export default function Home() { 
  const {data:movie}=useMovieList();
  const {data:favourites=[]}=useFavorites();
  const { isOpen ,closeModal } = useInfoModal();
  return (
     <>
     <InfoModal visible={isOpen} onClose={closeModal}/>
        <Navbar/>
        <Billboard/>
        <div>
          <MovieList title="Trending Now" data={movie}/>
          <MovieList title="My List" data={favourites}/>
        </div>
     </>
  )
}
