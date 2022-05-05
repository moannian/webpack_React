const devBaseURL = 'http://localhost:9000/';
const proBaseURL = '开发地址'

// 判断是否为开发环境
export const Base_URL = process.env.NODE_ENV === 'development' ? devBaseURL : proBaseURL;

export const timeOUT = 50000