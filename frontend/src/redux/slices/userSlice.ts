import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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
    updateUserProfile(state, action: PayloadAction<UserInterface>){
        state.userProfile = action.payload.userProfile;
        console.log(action.payload.userProfile, "UPDATE USER PROFILE");
        
    },
    updateUserPhotos(state, action: PayloadAction<Array<PhotosInterface>>) {
      state.userCodePhotos = action.payload;
      console.log(action.payload, "UPDATE USER PHOTOS");
      
    },
    addPhoto(state, action: PayloadAction<PhotosInterface>) {
      const add= action.payload;
      state.userCodePhotos.push(add);
      console.log(add, "ADD USER PHOTOS");
      
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
