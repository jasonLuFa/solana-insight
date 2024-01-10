import HistoryTransaction from "@/components/profile/HistoryTransaction";
import ProfileHeader from "@/components/profile/ProfileHeader";


async function Page() {
//   const router = useRouter();
  
  return (
    <section>
      <ProfileHeader/>
      <HistoryTransaction/>
    </section>
  )
}

export default Page;