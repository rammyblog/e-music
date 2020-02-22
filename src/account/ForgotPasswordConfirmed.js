import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  
});

export default function ForgotPasswordConfirmed(props) {
    console.log();
    
  const classes = useStyles();  

        return (

            <Card className={classes.card}>
            <CardContent>
                
                <Typography variant="h5" component="h2">
                Password Reset Confirmation
                </Typography>
            
                <Typography variant="body2" component="p">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder.
                </Typography>
            </CardContent>
            <CardActions>
                <Button color="primary">
                    <Link href="/login/" variant="body2">
                        {"Return to log in"}
                    </Link>
                    </Button>
            </CardActions>
            </Card>

            

        )

}