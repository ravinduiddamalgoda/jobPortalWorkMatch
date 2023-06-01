import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './screens/LoginPage'
import { RegisterUser } from './screens/RegisterPage'
import { MainPageUser } from './screens/userPage'
import { AuthGuard, GuestGuard } from './component/AuthGuard'
import { CvGenerationPage } from './screens/CvGeneration'
import { JobReMain } from './screens/JobRecruiterMain'
// import Home from './screens/Home.jsx'
import Payment from './component/Payment'
// import Contact from './screens/contactus'
// import About from './screens/about'


import { CV_data } from './component/CV'
import { HomePage } from './screens/Home'
import { Contactus } from './screens/contactus'
import { About } from './screens/about'
import { AddJob } from './screens/addJobRe'
import { RecruiterLoginPage } from './screens/JobReLogin'
import { LoginPageAdmin } from './screens/adminLogin'
import { AdminMain } from './screens/adminMain'
import { RegisterJobRe } from './screens/jobRegister'
import { MainLoginPage } from './screens/newLogin'
import { UserDataShow } from './screens/userDataShow'
import { UserDataShowAdmin } from './screens/userDataShowAdmin'
import { AddJobAdmin } from './screens/addJobAdmin'
import { UpdateProfile } from './screens/updateProfile'

function ProtectedRoutes() {
  console.log("in protected route");
  return (
    <AuthGuard>
      <Routes>
        <Route path="cv/payment" element={<Payment />} />
        <Route path="cv/link" element={<CV_data/>} />
        <Route path="cv" element={<CvGenerationPage/>} />
        <Route path="" element={<MainPageUser />} />
        {/* <Route path="jobmain" element = {<JobReMain />} /> */}
        <Route path="addjob" element = {<AddJob />} />
        {/* <Route path="" element={<JobReMain />} /> */}
        <Route path="update" element={<UpdateProfile />} />
      </Routes>
    </AuthGuard>
  );
}

function ProtectedRoutesJob() {
  return (
    <AuthGuard>
      <Routes>
        <Route path="" element={<JobReMain />} />
        {/* <Route path="jobre" element = {<JobReMain />} /> */}
        <Route path="addjob" element = {<AddJob />} />
        <Route path= "job/getuserdata/:email" element = {<UserDataShow/>} />
        <Route path="adminmain" element = {<AdminMain/>} />

      </Routes>
    </AuthGuard>
  );

}

function ProtectedRoutesAdmin() {
  return (
    <AuthGuard>
      <Routes>
        <Route path="" element={<AdminMain />} />
        {/* <Route path="jobre" element = {<JobReMain />} /> */}
        <Route path="addjob" element = {<AddJobAdmin />} />
        <Route path= "admin/getuserdata/:email" element = {<UserDataShowAdmin/>} />
        <Route path="adminmain" element = {<AdminMain/>} />

      </Routes>
    </AuthGuard>
  );

}

function GuestRoutes() {
  console.log("in guest route");
  return (
    <GuestGuard>
      <Routes>
        <Route path="login" element={<MainLoginPage />} />
        <Route path="rlogin" element={<RecruiterLoginPage />} />
        <Route path="jobregister" element={<RegisterJobRe />} />
        <Route path="adminlogin" element={<LoginPageAdmin />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="home" element={<HomePage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="contact" element={<Contactus/>} />
        <Route path="about" element={<About/>} />
      </Routes>
    </GuestGuard>
  );
}



function App() {

  return (

    <>
    
    <Routes>
      {/* <Route path="app/" element={<ProtectedRoutes />} /> */}
      <Route path="app/*" element={<ProtectedRoutes />} />
      <Route path="job/*" element={<ProtectedRoutesJob />} />
      <Route path="admin/*" element={<ProtectedRoutesAdmin />} />
      <Route path="*" element={<GuestRoutes />} />
      {/* <Route path="home" element={<HomePage/>} /> */}
     
    </Routes>
    </>
    
  )
}

export default App
