import { makeStyles, createStyles, Theme, } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';

import SideBarComponent from '../side-bar-component'
import { useGlobalStore } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';

const useStyles = makeStyles((theme: Theme) => createStyles({
  drawerList: {
		width: 250,
		[theme.breakpoints.up('md')]: {
			width: 400,
		},   
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: '20%',
		},
    height: '100vh',
    maxHeight: '100vh',
	},
}))

const SideBar = () => {
  const { state: { themeColor, openDrawer }, dispatch} = useGlobalStore()
  const cs = useStyles(themeColor);
  return (
    <nav data-testid="nav-id" className={cs.drawer} aria-label="sidebar">
			<Hidden smDown implementation="js">
				{/* hide when its sm to xs */}
				<SideBarComponent modal={false} />
			</Hidden>
			<Hidden mdUp implementation="js">
				<Drawer
					open={openDrawer}
					onClose={() => dispatch(actionCreator(ActionTypes.CLOSE))}
					PaperProps={{ className: cs.drawerList }}
				>
					<SideBarComponent modal={true} />
				</Drawer>
			</Hidden>
		</nav>
  )
}

export default SideBar
