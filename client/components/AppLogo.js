import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function AppLogo(props) {
  return <FormatListBulletedIcon {...{
    fontSize: 'large',
    ...props,
    sx: {
      verticalAlign: 'sub',
      mr: 1,
      ...props.sx,
    },
  }}/>
}
