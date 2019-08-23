const bookInfoModel = require('../models/book_infos.model');
const roleModel = require('../models/role.model');
const roomModel = require('../models/room.model');
const userModel = require('../models/user.model');
const bookTypesModel = require('../models/book_types.model');
const memberModel = require('../models/meeting_participant.model');
const moment = require('moment');

const filterMeetingByBookType = (meeting, timeSelected) => {
    // let isInUntil = false;
    // let untilMilisecond = moment(meeting.until).valueOf();
    // let timeSelectedMilisecond = timeSelected.getTime();
    // if (timeSelectedMilisecond <= untilMilisecond) {
    //     isInUntil = true;
    // }
    // if (isInUntil) {
        switch (meeting.book_type_id.name) {
            case 'daily':
                return true;
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
    // }
    
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
        const timeSelected = '2019-08-18T07:42:50.000Z';

        let userInfo = await userModel.findById({_id: userId}).populate('role');
        // console.log(userInfo);
        let ownMeetingInTimeSelected = [];
        let intitedMeetingInTimeSelected = [];

        if (userInfo.role.name == 'CEO' || userInfo.role.name == 'Manager') {
             //filter own meeting
            console.log(timeSelected);
            let allOwnMeeting = await bookInfoModel.find({
                host_id: userId,
                until: { $gte: timeSelected},
            }).populate([
                {
                    path: 'book_type_id',
                    model: 'book_types'
                },
                {
                    path: 'host_id',
                    model: 'User',
                    select: ['_id', 'name', 'email']
                },
                {
                    path: 'room_id',
                    model: 'room',
                    select: ['_id', 'name', 'capacity']
                },
                {
                    path: 'invited',
                    populate: {
                        path: 'user',
                        model: 'meeting_participant',
                    },
                    populate: {
                        path: 'user_id',
                        model: 'User',
                        select: ['name', 'email', 'phone']
                    }
                }
            ])
            // .populate({
            //     path: 'book_type_id',
            //     model: 'book_types',
            //     match: {
            //         name: {
            //             $cond: {if: }
            //         }
            //     }
            // })
            // console.log(allOwnMeeting);
            ownMeetingInTimeSelected = allOwnMeeting.filter((meeting) => filterMeetingByBookType(meeting, timeSelected));
            console.log(ownMeetingInTimeSelected);
        };

        //filter intited meeting
        let allInvitedMeeting = (await memberModel.find({user_id: userId}).populate({
            path: 'meeting_id',
            model: 'book_infos',
            populate: [
                {
                    path: 'room_id',
                    model: 'room',
                    select: ['_id', 'name', 'capacity']
                },
                {
                    path: 'host_id',
                    model: 'User',
                    select: ['_id', 'name', 'email']
                },
                {
                    path: 'book_type_id',
                    model: 'book_types',
                },
            ],
            select: ['_id', 'room_id', 'book_type_id', 'host_id', 'until', 'requirement', 'description', 'from', 'to', 'name']
        }).select(['_id', 'meeting_id'])).map(meeting => meeting.meeting_id);
        console.log(allInvitedMeeting);

        intitedMeetingInTimeSelected = allInvitedMeeting.filter(meeting => filterMeetingByBookType(meeting, timeSelected));
        // console.log(intitedMeetingInTimeSelected);
        res.json({
            // allInvitedMeeting,
            ownMeetingInTimeSelected,
            intitedMeetingInTimeSelected
        })
    }
}