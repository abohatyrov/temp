import { redirect } from "next/navigation";

export default function NotFoundError({ error, reset }) {
  // const [isMobileView, setIsMobileView] = useState(false);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  //   setIsMobileView(window.innerWidth <= 750);
  // });

  // const classes = useStyles();
  redirect("/");
  // return (
  //   <div className={classes.contentCenter}>
  //     <Grid сontainer>
  //       <Grid item md={12}>
  //         <Typography variant="h1">404</Typography>
  //         <Typography variant="h2">Сторінку не знайдено :(</Typography>
  //         <Typography variant="h4">Ууууупс! Здається ви загубились.</Typography>
  //       </Grid>
  //     </Grid>
  //   </div>
  // );
}
