import jwtDecode from "jwt-decode";

function checkIfTokenIsValid(localToken) {
    const decodedToken = jwtDecode(localToken);

    const expirationTimestamp = `${decodedToken.exp}`;
    const date = new Date();
    const currentTimestamp  = date.getTime();

    if (expirationTimestamp <= currentTimestamp) {
        return true;
    }
    else {
        return false;
    }
}

export default checkIfTokenIsValid;