import pkg from 'jsonwebtoken';

const { sign, verify } = pkg;

export const GenerateToken = ({ data, expiresIn }) => {
    // Ensure to use a strong, secret key

    // console.log(process.env.JWT_SECRET_KEY) helloworld
    return sign({ result: data }, process.env.JWT_SECRET_KEY, {
        expiresIn: expiresIn,
    });
};

export const VerifyToken = (token) => {
    return verify(token, process.env.JWT_SECRET_KEY);
};
