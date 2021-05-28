import { FC } from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Colors, useGlobalStore } from '../../util/store';
import { useHistory } from 'react-router';

type SideBarProps = {
  modal: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
  list: {},
  header: {
    color: (prop: Colors) => prop.cardFontColor
  },
  listCategory: {
    paddingLeft: theme.spacing(4)
  },
  listText: {
    fontSize: '0.7rem'
  }
}))

const SideBarComponent: FC<SideBarProps> = ({modal}) => {
  const { state: { themeColor, categoryTags }} = useGlobalStore()
  const cs = useStyles(themeColor);
  const history = useHistory()

  const changeLoc = (item: string) => {
    history.push(`/category/${item.toLowerCase()}`);
  }
  return (
    <Typography component='div' className={cs.root}>
      <List
				className={cs.list}
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader
						className={cs.header}
						component="div"
						id="nested-list-subheader"
					>
						Category
					</ListSubheader>
				}
			>
        {
          categoryTags.map((item, i) => (
            <ListItem button className={cs.listCategory} key={i} onClick={() => changeLoc(item)}>
              <ListItemText className={cs.listText}>{item}</ListItemText>
            </ListItem>
          ))
        }
      </List>
    </Typography>
  )
}

export default SideBarComponent
