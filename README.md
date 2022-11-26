<img src="./readme/title1.svg"/>

<div align="center">

> CodeCam allows users to take picture of their, typed or handwritten, code and run it on the app at anytime.  

**[PROJECT PHILOSOPHY](https://github.com/moatasemyakhni/codecam#-project-philosophy) • [WIREFRAMES](https://github.com/moatasemyakhni/codecam#-wireframes) • [TECH STACK](https://github.com/moatasemyakhni/codecam#-tech-stack) • [IMPLEMENTATION](https://github.com/moatasemyakhni/codecam#-impplementation) • [HOW TO RUN?](https://github.com/moatasemyakhni/codecam#-how-to-run)**

</div>

<br><br>


<img src="./readme/title2.svg"/>

> CodeCam is a mobile app that allows users to take a photo of their code. They have the option to run the code and edit it anytime. Photos taken are easily accessed through the history tab in which picture, picture content, date and title name are represented and sorted
> 
> It supports more than 5 programming languages such as Javascript, Java and Python

### User Stories
- As a teacher, I want to know if my student's code output is correct
- As an intellectual coder, I want to easily test my hypothesis 
- As a developer, I want to discover new ways to code

<br><br>

<img src="./readme/title3.svg"/>

> This design was planned before on paper, then moved to Figma app for the fine details.
Note that i didn't use any styling library or theme, all from scratch and using pure css modules


| Landing WireFrame | Home Mockup |
| -----------------| -----|
| <img src="./readme/Landing_Page_WireFrame.jpg" height="350" width="175" alt="Landing" />| <img src="./readme/Landing_Page.jpg" height="350" width="175" alt="Landing" />|

| Home WireFrame | Home Mockup |
| -----------------| -----|
| <img src="./readme/Home_Page_WireFrame.jpg" height="350" width="175" alt="Landing" />| <img src="./readme/Home_Page.jpg" height="350" width="175" alt="Landing" />|

| Run Code WireFrame | Run Code Mockup |
| -----------------| -----|
| <img src="./readme/Run_Code_Page_WireFrame.jpg" height="350" width="175" alt="Run Code" />| <img src="./readme/Run_Code_Page.jpg" height="350" width="175" alt="Run Code" />|

| History WireFrame | History Mockup |
| -----------------| -----|
| <img src="./readme/History_Page_WireFrame.jpg" height="350" width="175" alt="History" />| <img src="./readme/History_Page.jpg" height="350" width="175" alt="History" />|

| Setting WireFrame | Setting Mockup |
| -----------------| -----|
| <img src="./readme/Setting_Page_WireFrame.jpg" height="350" width="175" alt="Setting" />| <img src="./readme/Setting_Page.jpg" height="350" width="175" alt="Setting" />|


| Edit WireFrame | Edit Mockup |
| -----------------| -----|
| <img src="./readme/Edit_Profile_Page_WireFrame.jpg" height="350" width="175" alt="Edit" />| <img src="./readme/Edit_Profile_Page.jpg" height="350" width="175" alt="Edit" />|

| Sign up WireFrame | Sign up Mockup |
| -----------------| -----|
| <img src="./readme/Signup_Page_WireFrame.jpg" height="350" width="175" alt="Edit" />| <img src="./readme/Signup_Page.jpg" height="350" width="175" alt="Edit" />|

| Forgot Password WireFrame | Forgot Password Mockup |
| -----------------| -----|
| <img src="./readme/Forgot_Password_Wireframe.jpg" height="350" width="175" alt="Forgot Password" />| <img src="./readme/Forgot_Password.jpg" height="350" width="175" alt="Forgot Password" />|

<br><br>

<img src="./readme/title4.svg"/>

Here's a brief high-level overview of the tech stack the CodeCam app uses:

- This project uses the [React Native app development framework](https://reactnative.dev/). React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces..
- For persistent storage (database), the app uses [Mongoose](https://mongoosejs.com/) library which allows the app to create a straight-forward, schema-based solution to model the application data.

- The app uses the font ["Roboto"](https://fonts.google.com/specimen/Roboto) as its main font for Android, and it uses ["san Francisco"](https://www.dafontfree.io/san-francisco-font-free) as its main font for IOS.



<br><br>
<img src="./readme/title5.svg"/>

> Using the above mentioned tech stacks and the wireframes build with figma from the user stories we have, the implementation of the app is shown as below, these are screenshots from the real app

| Landing | Landing |
| -----------------| -----|
| <img src="./readme/implementation/dark/Login.png" height="350" width="175" alt="Landing" />| <img src="./readme/implementation/light/Login.png" height="350" width="175" alt="Landing" />

| Home | Home |
| -----------------| -----|
| <img src="./readme/implementation/dark/Home.gif" height="350" width="175" alt="Home" />| <img src="./readme/implementation/light/Home.png" height="350" width="175" alt="Home" />|

| Run Code | Run Code |
| -----------------| -----|
| <img src="./readme/implementation/dark/RunCode.png" height="350" width="175" alt="RunCode" />| <img src="./readme/implementation/light/RunCode.gif" height="350" width="175" alt="RunCode" />|

| History | History |
| -----------------| -----|
| <img src="./readme/implementation/dark/History.gif" height="350" width="175" alt="History" />| <img src="./readme/implementation/light/History.png" height="350" width="175" alt="History" />|

| Setting | Setting |
| -----------------| -----|
| <img src="./readme/implementation/dark/Setting.png" height="350" width="175" alt="Setting" />| <img src="./readme/implementation/light/Setting.png" height="350" width="175" alt="Setting" />|

| Edit Profile | Edit Profile |
| -----------------| -----|
| <img src="./readme/implementation/dark/EditProfile.png" height="350" width="175" alt="EditProfile" />| <img src="./readme/implementation/light/EditProfile.png" height="350" width="175" alt="EditProfile" />|

| Sign up | Sign up |
| -----------------| -----|
| <img src="./readme/implementation/dark/Signup.png" height="350" width="175" alt="Signup" />| <img src="./readme/implementation/light/Signup.png" height="350" width="175" alt="Signup" />|

| Forgot Password | Forgot Password |
| -----------------| -----|
| <img src="./readme/implementation/dark/ForgotPassword.png" height="350" width="175" alt="ForgotPassword" />| <img src="./readme/implementation/light/ForgotPassword.png" height="350" width="175" alt="ForgotPassword" />|




<br><br>
<img src="./readme/title6.svg"/>


> Make sure to have these packages installed before running the application.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* expo CLI
   ```sh
   npm install -g expo-cli
   ```

### Installation

1. create service account at [console google cloud](https://console.cloud.google.com/getting-started) after creating a project on google
2. Get a free API Key at [hacker earth](https://www.hackerearth.com/docs/wiki/developers/v4/)
3. generate 'App Pass' for your gmail account following these [steps](https://support.google.com/mail/answer/185833?hl=en)
4. Clone the repo
   ```sh
   git clone https://github.com/moatasemyakhni/codecam.git
   ```
5. Install NPM packages
   ```sh
   npm install
   ```


