const bookInfoModel = require('../models/book_infos.model');
const roleModel = require('../models/role.model');
const userModel = require('../models/user.model');
const bookTypesModel = require('../models/book_types.model');
const memberModel = require('../models/meeting_participant.model');
const moment = require('moment');

const filterMeetingByBookType = (meeting, timeSelected) => {
    let isInUntil = false;
    let untilMilisecond = moment(meeting.until).valueOf();
    let timeSelectedMilisecond = timeSelected.getTime();
    if (timeSelectedMilisecond <= untilMilisecond) {
        isInUntil = true;
    }
    if (isInUntil) {
        switch (meeting.book_type_id.name) {
            case 'daily':
                return isInUntil;
            case 'weekly':
                let dayOfWeek = moment(meeting.from).format('ddd');
                let curDayOfWeek = moment(timeSelected).format('ddd');
                if (dayOfWeek == curDayOfWeek) {
                    console.log('weekly: true');
                    return true;
                }
            case 'monthly':
                let dayOfMonth = moment(meeting.from).date();
                let curDayOfMonth = moment(timeSelected).date();
                if (dayOfMonth == curDayOfMonth) {
                    console.log('monthly: true');
                    return true;
                }
            case 'default': // for just 1 day user selected
                let day = moment(meeting.from).format('L');
                let curDay = moment(timeSelected).format('L');
                if (day == curDay) {
                    console.log('default: true');
                    return true;
                }
            default:
                break;
        };
    }
    
    return false;
};

module.exports = {
    /*comment by duongnt*/
    getHomeContent: async (req, res) => {
        //const userId = req.body.userId;
        //const timeSelected = req.body.timeSelected;

        // fake data req
        const userId = '5d4902f4df293ac6ec0b98bc';

        // testing dayly
        // const timeSelected = new Date('Tue Aug 20 2019 14:42:50 GMT+0700 (Indochina Time)');

        // testing weekly
        // const timeSelected = new Date('Mon Aug 19 2019 14:42:50 GMT+0700 (Indochina Time)');

        //testing monthly
        const timeSelected = new Date('Sun Aug 18 2019 14:42:50 GMT+0700 (Indochina Time)');

        let userInfo = await userModel.findById({_id: userId}).populate('role');
        let ownMeetingInTimeSelected = [];
        let intitedMeetingInTimeSelected = [];

        if (userInfo.role.name == 'CEO' || userInfo.role.name == 'Manager') {
             //filter own meeting
            let allOwnMeeting = await bookInfoModel.find({host_id: userId}).populate('book_type_id');
            // console.log(allMeetingJoined);
            ownMeetingInTimeSelected = allOwnMeeting.filter((meeting) => filterMeetingByBookType(meeting, timeSelected));
            // console.log(ownMeetingInTimeSelected);
        };

        //filter intited meeting
        let allInvitedMeeting = (await memberModel.find({user_id: userId}).populate({
            path: 'meeting_id',
            populate: {
                path: 'book_type_id',
                model: 'book_types'
            }
        })).map(meeting => meeting.meeting_id);
        console.log(allInvitedMeeting);

        intitedMeetingInTimeSelected = allInvitedMeeting.filter(meeting => filterMeetingByBookType(meeting, timeSelected));
        console.log(intitedMeetingInTimeSelected);
        res.json({
            ownMeetingInTimeSelected,
            intitedMeetingInTimeSelected
        })
    }
}