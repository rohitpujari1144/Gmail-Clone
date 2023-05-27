import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login/LoginPage';
import ForgotEmail from './components/Forgot email/ForgotEmail';
import Signup from './components/Signup/Signup';
import LoginPassword from './components/Login/LoginPassword';
import ForgotEmailNameDetails from './components/Forgot email/ForgotEmailNameDetails';
import ForgotEmailSendCode from './components/Forgot email/ForgotEmailSendCode';
import SignupPhoneNumber from './components/Signup/SignupPhoneNumber';
import SignupBasicInfo from './components/Signup/SignupBasicInfo';
import SignupPrivacyTerms from './components/Signup/SignupPrivacyTerms';
import ForgotEmailError from './components/Forgot email/ForgotEmailError';
import ChooseAccount from './components/Forgot email/ChooseAccount';
import StarredEmails from './components/Home/StarredEmails';
import ImportantEmails from './components/Home/ImportantEmails';
import SentEmails from './components/Home/SentEmails';
import DraftEmails from './components/Home/DraftEmails';
import TrashEmails from './components/Home/TrashEmails';
import SpamEmails from './components/Home/SpamEmails';
import NewHome from './components/Home/NewHome';
import NewPassword from './components/ForgotPassword/NewPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<LoginPage />} />

        {/* Home */}
        <Route path='/new-home' element={<NewHome />} />
        <Route path='/new-home/starred-emails' element={<StarredEmails />} />
        <Route path='/new-home/important-emails' element={<ImportantEmails />} />
        <Route path='/new-home/sent-emails' element={<SentEmails />} />
        <Route path='/new-home/draft-emails' element={<DraftEmails />} />
        <Route path='/new-home/trash-emails' element={<TrashEmails />} />
        <Route path='/new-home/spam-emails' element={<SpamEmails />} />

        {/* signup */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/phone-number' element={<SignupPhoneNumber />} />
        <Route path='/basic-information' element={<SignupBasicInfo />} />
        <Route path='/privacy-terms' element={<SignupPrivacyTerms />} />

        {/* login */}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/login-password' element={<LoginPassword />} />

        {/* forgot email */}
        <Route path='/forgot-email' element={<ForgotEmail />} />
        <Route path='/forgot-email-details' element={<ForgotEmailNameDetails />} />
        <Route path='/forgot-email-error' element={<ForgotEmailError />} />
        <Route path='/forgot-email-send-code' element={<ForgotEmailSendCode />} />
        <Route path='/choose-account' element={<ChooseAccount />} />

        {/* forgot password */}
        <Route path='/new-password' element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
