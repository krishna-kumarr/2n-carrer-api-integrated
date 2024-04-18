import Login from "./views/common/Login";
import ResetPassword from "./views/common/ResetPassword";
import ChangePassword from "./views/common/ChangePassword";
import RoleSelection from "./views/common/RoleSelection";
import { Route, Routes } from "react-router-dom";
import Home from "./views/professional/Home";
import ProfessionalSignUpForm from "./components/Forms/ProfessionalSignUpForm";
import ProfessionalManualSignup from "./views/professional/ProfessionalManualSignup";
import ProfessionalSocialMediaSignup from "./views/professional/ProfessionalSocialMediaSignup";
import LearningPage from "./views/professional/LearningPage";
import CommunityPage from "./views/professional/CommunityPage";
import Profile from "./layouts/Profile";
import HomeAll from "./views/professional/HomeOptionsLayout/HomeAll";
import HomeRecommended from "./views/professional/HomeOptionsLayout/HomeRecommended";
import HomeApplied from "./views/professional/HomeOptionsLayout/HomeApplied";
import HomeSaved from "./views/professional/HomeOptionsLayout/HomeSaved";

import { Toaster } from "react-hot-toast";
import ProfessionalGoogleSignUp from "./views/professional/ProfessionalGoogleSignUp";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ChangePassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/role-selector" element={<RoleSelection />} />
        <Route path="/role-selector/professional">
          <Route index element={<ProfessionalManualSignup />} />
          <Route
            path="google-signup"
            element={<ProfessionalGoogleSignUp />}
          />
          <Route
            path="linkedIn-signup"
            element={<ProfessionalSocialMediaSignup />}
          />
          <Route
            path="apple-signup"
            element={<ProfessionalSocialMediaSignup />}
          />
        </Route>

        <Route path="home" element={<Home />} />

        <Route path="home" element={<Home />}>
          <Route path="all" element={<HomeAll />} />
          <Route path="recommended" element={<HomeRecommended />} />
          <Route path="applied" element={<HomeApplied />} />
          <Route path="saved" element={<HomeSaved />} />
        </Route>

        <Route path="/home/all/profile" element={<Profile />} />

        <Route path="/learning" element={<LearningPage />} />
        <Route path="/community" element={<CommunityPage />} />
      </Routes>
    </>
  );
}

export default App;