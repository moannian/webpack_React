import dayjs from "dayjs";

export const getCurrentTime = () => {
    return dayjs().format("YYYY年MM月DD日 HH时mm分ss秒");
}