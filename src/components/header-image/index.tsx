import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '45%',
    height: '10rem',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    }
  },
}));

const HeaderImage = () => {
  const cs = useStyles();
  const src = 'https://res.cloudinary.com/thronetechnologies/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1622188602/Iphones/ios-dark-mock_lmfoha.jpg'
  return (
    <Typography component='div' className={cs.root}>
      <img src={src} width='100%' height='100%' alt='Iphone_Groups' />
    </Typography>
  )
}

export default HeaderImage