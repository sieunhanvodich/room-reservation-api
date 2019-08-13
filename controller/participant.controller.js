const participant = require('../models/meeting_participant.model');

module.exports = {
    deleteMember: (req, res) => {
        let memberId = req.body.memberId;
        console.log(memberId);
        participant.findOneAndRemove({_id: memberId}, (err, member) => {
            if (err) res.json({ status: 'delete not done' });

            // participant.remove(member);
            res.json({ status: 'delete done' });
        })
    },

    addMember: (req, res) => {
        let memberId = req.body.memberId;
        let meeting_id = req.body.meeting_id;
        console.log(memberId, meeting_id);
        let member = new participant({
            user_id: memberId,
            meeting_id: meeting_id,
            created_at: new Date()
        })
        member.save(err => {
            if (err) return res.json({status: 'err add'});
            return res.json({status: 'add done'})
        })
    }
}