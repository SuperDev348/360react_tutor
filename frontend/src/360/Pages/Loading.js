import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    color: "#0ca8fd",
    backgroundColor: "#0ca8fd",
    colorPrimary: "#0ca8fd",
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <LinearProgress
        style={{ backgroundColor: "#0ca8fd", color: "#0ca8fd" }}
      />
    </div>
  );
}

// import React from "react";
// import PropTypes from "prop-types";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";

// function CircularProgressWithLabel(props) {
//   return (
//     <Box position="relative" display="inline-flex">
//       <CircularProgress variant="static" {...props} />
//       <Box
//         top={0}
//         left={0}
//         bottom={0}
//         right={0}
//         position="absolute"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//       >
//         <Typography
//           variant="caption"
//           component="div"
//           color="textSecondary"
//         >{`${Math.round(props.value)}%`}</Typography>
//       </Box>
//     </Box>
//   );
// }

// CircularProgressWithLabel.propTypes = {
//   /**
//    * The value of the progress indicator for the determinate and static variants.
//    * Value between 0 and 100.
//    */
//   value: PropTypes.number.isRequired,
// };

// export default function CircularStatic() {
//   const [progress, setProgress] = React.useState(10);

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((prevProgress) =>
//         prevProgress >= 100 ? 10 : prevProgress + 10
//       );
//     }, 800);
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return <CircularProgressWithLabel value={progress} />;
// }
