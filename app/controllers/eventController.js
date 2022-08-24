const eventMapper = require('../mappers/eventMapper');
const jsonwebtoken = require('jsonwebtoken');
const dayjs = require('dayjs');
// Pour les timezones
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
// On défini les locales
require('dayjs/locale/fr');
dayjs.locale('fr');

const eventController = {

    addEvent : async (req, res) => {
        try {

            if (!req.headers.authorization || !jsonwebtoken.decode(req.headers.authorization.substring(7))) {
            res.status(400).json({"message": `Un token doit être fourni.`});
            return;
        }
           
        const { userId : createdBy } = jsonwebtoken.decode(req.headers.authorization.substring(7));
 
        const event = req.body;
        event.createdBy = Number(createdBy);

        if (!event.name || !event.startDateTime || !event.endDateTime || !event.description) {
            res.status(400).json({"message": `Tous les champs obligatoires doivent être remplis.`});
            return;
        }

   
            const newEvent = await eventMapper.addEvent(event);
            res.status(200).json({"message": "L'évènement a bien été ajouté.", "event": newEvent})
        } catch(err) {
            res.status(400).json({"message": err.message});
        }
    }

};


module.exports = eventController