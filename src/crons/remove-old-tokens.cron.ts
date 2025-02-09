import {CronJob} from "cron";
import {configure} from "../configs/configure";
import {timeHelper} from "../helpers/time.helper";
import {tokenRepository} from "../repositories/token.repository";

const handler = async () => {
    try{
const string = configure.jwtRefreshExpiresIn;
const {value,unit} = timeHelper.parceConfigString(string);
const date = timeHelper.subtractCurrentByParams(value, unit);
console.log("date", date);
const count = await tokenRepository.deleteBeforeDate(date);
console.log(`deleted ${count} old tokens`);
    }catch(e){
        console.error(e.message);
    }
}
export const removeOldTokens = new CronJob("*/10 * * * * *", handler)