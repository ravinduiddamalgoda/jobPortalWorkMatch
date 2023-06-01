import { Card, Container } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export function StarRating(props){
    const totalStars = 5;
    const activeStars = props.star;

    return(<>
        <Container sx ={{flex: 1 , }}>

        {[...new Array(totalStars)].map((arr, index) => {
        return index < activeStars ? <StarIcon color="red"/> : <StarBorderIcon />;
      })}

        </Container>

    
    </>);
}