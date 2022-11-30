import { React } from 'react';
import TopSidebar from './components/TopSidebar';
import ChanelList from './components/ChanelList';

function Sidebar() {
  return (
    <div className="col-4 col-md-2 pt-4 px-0 black">
      <TopSidebar />
      <ChanelList />
    </div>
  );
}

export default Sidebar;
