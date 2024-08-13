import model from "./model.js";

// export const createUser = (user) => {
//     delete user._id
//     return model.create(user);
//   }
   //model.create(user); // implemented later

export const createUser = (user) => model.create(user);
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) => model.findOne({ username: username });
export const findUserByLogin = (username, password) => model.findOne({ username: username, password: password });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i");
    // 'i' makes it case-insensitive
    return model.find({
      $or: [{ firstName: { $regex: regex } },
            { lastName:  { $regex: regex } }],
    });
  };
  
export const findUsersByRole = (role) => model.find({ role });
export const updateUser = (userId, user) => model.findOne({ _id : userId }, {$set: user});
export const deleteUser = (userId) => model.deleteOne({ _id: userId });