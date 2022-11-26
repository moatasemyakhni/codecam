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
  _id?: string,
  codeUrl?: string,
  createdAt?: string,
  photoUrl?: string,
  programmingLanguage?: string,
  snippetName?: string,
  updatedAt?: string,
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
    },
    updateUserPhotos(state, action: PayloadAction<Array<PhotosInterface>>) {
      state.userCodePhotos = action.payload;
      
    },
  },
});

export const {
    deleteUser, 
    updateUserProfile,
    updateUserPhotos,
} = userSlice.actions;

export default userSlice.reducer;
