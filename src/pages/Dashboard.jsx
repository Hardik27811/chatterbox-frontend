import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';

const Dashboard = () => {

  return (
    <div className='flex flex-col '>
      <Sidebar />
      <div className="w-full flex-1 mt-15 md:mt-5 lg:mt-5">
        <div className="max-w-[100%]  max-h-[100%] mx-auto lg:pr-55">
          <Feed />
        </div>
      </div>
    </div>


  )
}

export default Dashboard