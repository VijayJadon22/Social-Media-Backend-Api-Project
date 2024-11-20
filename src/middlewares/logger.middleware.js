import fs from 'fs';
import util from 'util';

const appendFile = util.promisify(fs.appendFile);
export const logger = async (req, res, next) => {
    const log = `${req.url} - ${JSON.stringify(req.body)} - ${new Date().toISOString()}\n`;
    try {
        await appendFile('./log.txt', log);
    } catch (error) {
        console.log(error);
        next(error);
    }
    next();
}