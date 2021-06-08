import { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Colors, useGlobalStore } from '../../util/store';

type Prop = {
  height?: string,
  width?: string,
  title?: string
	start?: boolean
}

interface AllProp extends Prop, Colors {
	
}

const useStyles = makeStyles(() => createStyles({
	root: {
		width: (prop: AllProp) => prop.width || '100vw',
		height: (prop: AllProp) => prop.height || '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: (prop: AllProp) => prop.backgroundColor,
		color: (prop: AllProp) => prop.color,
		'& span': {
			fontWeight: 'bold',
		}
	},
	start: {
		width: '100vw',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: (prop: AllProp) => prop.backgroundColor,
		color: (prop: AllProp) => prop.color,
		position: 'absolute',
		top: 0,
		left: 0,
		'& span': {
			fontWeight: 'bold',
		}
	},
	loading: {
		color: '#007ee5',
		paddingRight: '2rem'
	},
}));

const LoadingComponent: FC<Prop> = (prop) => {
	const { state: { themeColor }} = useGlobalStore()
	const cs = useStyles({...prop, ...themeColor});
  const { title, start = false } = prop;
	return (
		<div className={start ? cs.start : cs.root}>
			<span>
				<CircularProgress className={cs.loading} /> 
        {title === undefined ? 'Loading ...' : title}
			</span>
		</div>
	);
};

export default LoadingComponent;