import { FC } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type Prop = {
  height?: string,
  width?: string,
  title?: string
}

const useStyles = makeStyles(() => createStyles({
	root: {
		width: (prop: Prop) => prop.width || '100vw',
		height: (prop: Prop) => prop.height || '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	loading: {
		color: '#007ee5',
		paddingRight: '2rem'
	},
}));

const LoadingComponent: FC<Prop> = (prop) => {
	const cs = useStyles(prop);
  const { title } = prop;
	return (
		<div className={cs.root}>
			<span>
				<CircularProgress className={cs.loading} /> 
        {title === undefined ? 'Loading ...' : title}
			</span>
		</div>
	);
};

export default LoadingComponent;