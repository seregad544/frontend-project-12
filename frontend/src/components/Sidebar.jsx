import { TopSidebar } from "./TopSidebar";
import { ChanelList } from "./ChanelList";

const Sidebar = (props) => {
	return (
        <div className="col-4 col-md-2 pt-4 px-0 black">
			<TopSidebar></TopSidebar>
			<ChanelList></ChanelList>
		</div>
	);
};

export { Sidebar };
