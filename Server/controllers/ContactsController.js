const User = require('../models/User'); 
const validator = require('validator');

const searchContacts = async (request, response, next) => {
    try {
        const { searchTerm } = request.body;

        if (!searchTerm) {
            return response.status(400).json({ success: false, message: "Search term is required" });
        }
        const sanitizedSearchTerm = validator.escape(searchTerm);
        const contacts = await User.find({
            $or: [
                { firstName: { $regex: sanitizedSearchTerm, $options: 'i' /*to make the search not be case sensitive*/  } },
                { lastName: { $regex: sanitizedSearchTerm, $options: 'i' } },
                { phoneNumber: { $regex: sanitizedSearchTerm, $options: 'i' } },
                {profileImage: { $regex: sanitizedSearchTerm, $options: 'i' } }
            ]
        });  
        return response.status(200).json({ success: true, contacts });
    } catch (error) {
        console.error('Error searching contacts:', error);
        return response.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
module.exports={searchContacts}
