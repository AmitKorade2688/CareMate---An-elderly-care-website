import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ContactUs from './components/ContactUs';
import MainPage1 from './components/MainPage1';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Careers from './components/Careers';
import GetAppointment from './components/GetAppointment';
import VideoCall from './components/VideoCall';
import InfoSubmission from './components/InfoSubmission';
import ReadOnlyInfoDisplay from './components/ReadOnlyInfoDisplay';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<MainPage1 />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/getappointment" element={<GetAppointment />} />
                <Route path="/video-call" element={<VideoCall />} />
                <Route path="/info-submission" element={<InfoSubmission />} />
                <Route path="/read-only-info" element={<ReadOnlyInfoDisplay />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
