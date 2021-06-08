import { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';

import HeaderBar from '../header-bar';
import { useGlobalStore } from '../../util/store';
import { Colors } from '../../util/store';
import { actionCreator, ActionTypes } from '../../util/action';
import isJson from '../../util/is-json';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		height: '100%',
		width: '100vw',
		backgroundColor: (prop: Colors) => prop.backgroundColor,
		overflowY: 'scroll',
	},
	flexContainer: {
		display: 'flex',
		height: 'calc(100vh - 10rem)',
		paddingTop: '2rem',
		width: '100%',
		justifyContent: 'space-between',
		backgroundColor: (prop: Colors) => prop.backgroundColor,
    [theme.breakpoints.down('md')]: {
      paddingTop: '1rem'
    }
	},
	loading: {
		width: '100vw',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: (props: Colors) => props.color
	},
}));

const Basic: FC = ({ children }) => {
	const { state: { themeColor} } = useGlobalStore()
	const cs = useStyles(themeColor);
	
	return (
		<Typography component="div" className={cs.root}>
			<CssBaseline />
			<HeaderBar />
			<Typography 
				component="div" 
				className={cs.flexContainer}
			>
				{children}
			</Typography>
		</Typography>
	);
};

const IndexHome: FC<{side: JSX.Element, right: JSX.Element}> = 
({side, right}) => {
	const { state: { themeColor}, dispatch } = useGlobalStore()
	const cs = useStyles(themeColor);

	const { isLoading, isError, data } = useQuery('getAllrecord', () => {
		return fetch(`${process.env.REACT_APP_URL}/sync-data`)
			.then((res) => res.json())
	}, 
	{
		onSuccess: (data: any) => {
			if(data.error) return;
			let arr: string[] = [];
			const buyReq = isJson(data.buyReq);
			buyReq.forEach((item: any) => {
				arr = [...arr, item.phone_name]
			})
			dispatch(actionCreator(ActionTypes.CATEGORY_TAGS, arr))
		}
	});

	console.log(isError, data);

	if (isLoading) {
		return (
			<Basic>
				<Typography className={cs.loading}>Loading Data</Typography>
			</Basic>
		);
	}
	if (isError) {
		return (
			<Basic>
				<Typography className={cs.loading}>
					An error has occurred
				</Typography>
			</Basic>
		);
	}
	return (
		<Basic>
			<>
				{side}
				{right}
			</>
		</Basic>
	);

};

export default IndexHome;