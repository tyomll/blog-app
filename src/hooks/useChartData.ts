import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const useChartData = (setData: any) => {

  async function getPostsData() {
    const ref = collection(db, 'posts');
    const docs: any = await getDocs(ref);
    const dataa = docs.docs.map((doc: any) => ({ ...(doc.data() as Record<string, unknown>) }));
    let postsPerDay: any = {};

    dataa.forEach((doc: any) => {
      const postDate = new Date(doc.date);
      const date = postDate.toISOString().slice(0, 10);

      if (postsPerDay[date]) {
        postsPerDay[date] += 1;
      } else {
        postsPerDay[date] = 1;
      }
    });
    if (dataa.length !== 0) {
      setData((prevState: any) => [
        ...prevState,
        {
          id: 'Total Posts',
          color: 'hsl(5, 70%, 50%)',
          data: Object.entries(postsPerDay).map(([x, y]) => ({ x, y })),
        },
      ]);
    }

  }

  async function getUsersData() {
    const ref = collection(db, 'users');
    const docs: any = await getDocs(ref);
    const dataa = docs.docs.map((doc: any) => ({ ...(doc.data() as Record<string, unknown>) }));
    let usersPerDay: any = {};

    dataa.forEach((doc: any) => {
      const userDate = new Date(Number(doc.createdAt));
      const date = userDate.toISOString().slice(0, 10);
      if (usersPerDay[date]) {
        usersPerDay[date] += 1;
      } else {
        usersPerDay[date] = 1;
      }
    });
    if (dataa.length !== 0) {
      setData((prevState: any) => [
        ...prevState,
        {
          id: 'Total Users',
          color: 'hsl(5, 70%, 50%)',
          data: Object.entries(usersPerDay).map(([x, y]) => ({ x, y })),
        },
      ]);
    }
  }
  return { getPostsData, getUsersData }
}
export default useChartData