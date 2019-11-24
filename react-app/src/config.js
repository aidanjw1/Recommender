export const TMDB_KEY = '7cc441d4c80dc500e03786e94fd81402';
export const API_URL = process.env.NODE_ENV == 'production'? 'http://ec2-18-222-129-147.us-east-2.compute.amazonaws.com' : 'http://localhost';

export default {
    TMDB_KEY,
    API_URL
};