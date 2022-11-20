import { createSlice } from "@reduxjs/toolkit";


export interface UserInterface {
    userProfile?: {
        userId?: string,
        fullName?: string,
        profileImage?: string,
    },
    userCodePhotos?: Array<PhotosInterface>
}

export interface PhotosInterface {
  userId?: string,
  postId?: string,
  codeUrl?: string,
  createdAt?: Date,
  photoUrl?: string,
  programmingLanguage?: string,
  snippetName?: string,
  updatedAt?: Date,
}

const initialState: UserInterface = {
  userProfile: null,
  userCodePhotos: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteUser() {
        // when logout or token expires
        return initialState;
    },
    updateUserProfile(state, action){
        state.userProfile = action.payload.userProfile;
    },
    updateUserPhotos(state, action) {
      state.userCodePhotos = action.payload.userCodePhotos;
    },
    addPhoto(state, action) {
      const add= action.payload;
      state.userCodePhotos.push(add.photo);
    }
  },
});

export const {
    deleteUser, 
    updateUserProfile,
    updateUserPhotos,
    addPhoto,
} = userSlice.actions;

export default userSlice.reducer;
