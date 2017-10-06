import Color from 'color';
import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from '../colors';
import spacing from '../spacing';
import typography from '../typography';
//Cyan theme colors
export default {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
        // main theme colors
        primaryColor: cyan500,
        accentColor: pinkA200,
        // text color palette
        primaryTextColor: darkBlack,
        alternateTextColor: white,
        // backgournds and borders
        canvasColor: white,
        borderColor: grey300,
        disabledColor: Color(darkBlack).alpha(.3).toString(),
        pickerHeaderColor: cyan500,
        clockCircleColor: Color(darkBlack).alpha(.7).toString(),
        shadowColor: fullBlack,
    },
};

